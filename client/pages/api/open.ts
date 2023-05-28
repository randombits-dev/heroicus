import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client} from '@aws-sdk/client-ec2';
import {createPublicClient, hashMessage, http, verifyMessage} from 'viem';
import {hardhat} from 'viem/chains';
import {GPURentalAddress} from '../../utils/addresses';
import {gpuRentalABI} from '../../generated';
import {UserInfo} from '../../utils/templates';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401).end();
  }
  const {token, s} = JSON.parse(req.body);
  const tokenId = Number(token);
  const hash = hashMessage(token as string);
  // verifyMessage()
  // const address = await recoverMessageAddress({
  //   message: 'Sign in with ID: ' + hash,
  //   signature: s
  // });
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
    res.status(401).json({error: 'Not owner of NFT'});
  }

  if (expired) {
    res.status(401).json({error: 'Expired rental'});
    return;
  }

  try {
    const ec2 = new EC2Client({region: 'us-east-2'});
    const command = new DescribeInstancesCommand({
      Filters: [{Name: 'client-token', Values: [token as string]}]
    });
    const {Reservations} = await ec2.send(command);
    if (Reservations.length !== 1) {
      throw 'Instance not found: ' + token;
    }
    const ip = Reservations[0].Instances[0].PublicIpAddress;
    res.json({
      ip: `http://${ip}:7860/`
    });
  } catch (e) {
    console.error(e);
    res.status(401).json({
      error: 'Nope!'
    });
  }
};

export default handler;
