import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client, RunInstancesCommand} from '@aws-sdk/client-ec2';
import {createPublicClient, http} from 'viem';
import {hardhat} from 'viem/chains';
import {parseBytes32String} from 'ethers/lib/utils';
import {GPURentalAddress} from '../../utils/addresses';
import {gpuRentalABI} from '../../generated';
import {withErrorHandler} from '../../errorHandler';
import {getClientToken} from '../../utils/aws';

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
  const templateId = parseBytes32String((userInfo[0] as any).templateId);
  const expired = userInfo[1];

  if (expired) {
    throw 'Expired Rental';
  }

  const ec2 = new EC2Client({region: 'us-east-2'});

  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations.length > 0) {
    throw 'Server already exists';
  }

  const cmd = new RunInstancesCommand({
    LaunchTemplate: {LaunchTemplateName: templateId},
    MinCount: 1,
    MaxCount: 1,
    ClientToken: getClientToken(token)
  });
  await ec2.send(cmd);
  res.json({success: true});
  // await waitUntilInstanceStatusOk(
  //   {client: ec2, maxWaitTime: 240},
  //   {InstanceIds: [Instances[0].InstanceId]}
  // );
};

export default withErrorHandler(handler);
