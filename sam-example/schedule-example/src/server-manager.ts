import {DescribeInstancesCommand, EC2Client, Instance, TerminateInstancesCommand} from '@aws-sdk/client-ec2';
import {createPublicClient, http} from 'viem';
import {GPURentalAddress} from './addresses';
import {gpuRentalABI} from './generated';
import {hardhat} from './utils';

export const checkRunning = async (): Promise<void> => {
  const ec2 = new EC2Client({region: 'us-east-2'});
  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'tag-key', Values: [GPURentalAddress]}]
  });
  const {Reservations} = await ec2.send(command);

  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  for await (const Reservation of Reservations) {
    for await (const Instance of Reservation.Instances) {
      try {
        await checkServer(client, ec2, Instance);
      } catch (e) {
        console.error(e);
      }
    }
  }
  console.log('completed');
};

const checkServer = async (client, ec2, instance: Instance) => {
  if (instance.State.Name === 'terminated') {
    return;
  }
  const tokenId = instance.Tags.find(tag => tag.Key === GPURentalAddress)?.Value;
  if (!tokenId) {
    throw 'No tokenId found from tag';
  }
  const userInfo = await client.readContract({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [BigInt(tokenId)]
  });
  const expired = userInfo[1];
  if (expired) {
    console.log(`terminating: ${tokenId} (${instance.InstanceId})`);
    const cmd = new TerminateInstancesCommand({
      InstanceIds: [instance.InstanceId]
    });
    await ec2.send(cmd);
  }
};

// const getClientToken = (tokenId: number) => {
//   return GPUAddress + '_5_' + tokenId;
//   // return 'test';
// };

