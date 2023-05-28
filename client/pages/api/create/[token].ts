import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client, RunInstancesCommand} from '@aws-sdk/client-ec2';
import {createPublicClient, http} from 'viem';
import {hardhat} from 'viem/chains';
import {GPURentalAddress} from '../../../utils/addresses';
import {gpuRentalABI} from '../../../generated';
import {parseBytes32String} from 'ethers/lib/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401).end();
  }
  const {token} = JSON.parse(req.body);
  const tokenId = Number(token);

  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const userInfo = await client.readContract({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [BigInt(tokenId)]
  });
  const templateId = parseBytes32String((userInfo[0] as any).templateId);
  const expired = userInfo[1];

  if (expired) {
    res.json({error: 'Expired rental'});
    return;
  }

  const ec2 = new EC2Client({region: 'us-east-2'});

  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [token as string]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations.length > 0) {
    res.json({error: 'Server already exists'});
    return;
  }

  const cmd = new RunInstancesCommand({
    LaunchTemplate: {LaunchTemplateName: templateId},
    MinCount: 1,
    MaxCount: 1,
    ClientToken: String(tokenId)
  });
  const {Instances} = await ec2.send(cmd);
  res.json({success: true});
  // await waitUntilInstanceStatusOk(
  //   {client: ec2, maxWaitTime: 240},
  //   {InstanceIds: [Instances[0].InstanceId]}
  // );
};

export default handler;
