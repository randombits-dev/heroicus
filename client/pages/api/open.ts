import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client} from '@aws-sdk/client-ec2';
import {createPublicClient, hashMessage, http, verifyMessage} from 'viem';
import {hardhat} from 'viem/chains';
import {GPURentalAddress} from '../../utils/addresses';
import {gpuRentalABI} from '../../generated';
import {withErrorHandler} from '../../errorHandler';
import {getClientToken} from '../../utils/aws';
import {UserInfo} from '../../utils/definitions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401).end();
  }
  const {token, s} = JSON.parse(req.body);
  const tokenId = Number(token);
  const hash = hashMessage(token as string);

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
  const expired = userInfo[1];
  const userStruct = userInfo[0] as UserInfo;
  const signatureValid = await verifyMessage({
    address: userStruct.user,
    message: 'Sign in with ID: ' + hash,
    signature: s
  });
  if (!signatureValid) {
    throw 'Not owner';
  }

  if (expired) {
    throw 'Expired rental';
  }

  const ec2 = new EC2Client({region: 'us-east-2'});
  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations.length !== 1) {
    throw 'Instance not found: ' + token;
  }
  const ip = Reservations[0].Instances[0].PublicIpAddress;
  res.json({ip});
};

export default withErrorHandler(handler);
