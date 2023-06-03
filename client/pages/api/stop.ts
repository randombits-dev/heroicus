import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client, TerminateInstancesCommand} from '@aws-sdk/client-ec2';
import {withErrorHandler} from '../../errorHandler';
import {getClientToken} from '../../utils/aws';
import {createPublicClient, http} from 'viem';
import {hardhat} from 'viem/chains';
import {GPURentalAddress} from '../../utils/addresses';
import {gpuRentalABI} from '../../generated';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401).end();
  }
  const {token} = JSON.parse(req.body);

  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const userInfo = await client.readContract({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [BigInt(token)]
  });
  const expired = userInfo[1];
  if (!expired) {
    throw 'Not expired';
  }

  const ec2 = new EC2Client({region: 'us-east-2'});

  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations.length === 0 || Reservations[0].Instances.length === 0) {
    throw 'Server does not exist';
  }
  const Instance = Reservations[0].Instances[0];

  const cmd = new TerminateInstancesCommand({
    InstanceIds: [Instance.InstanceId]
  });
  await ec2.send(cmd);
  res.json({success: true});
};

export default withErrorHandler(handler);
