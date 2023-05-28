import {NextApiRequest, NextApiResponse} from 'next';
import {DescribeInstancesCommand, EC2Client} from '@aws-sdk/client-ec2';
import {createPublicClient, http, recoverMessageAddress} from 'viem';
import {GPURentalAddress} from '../../../utils/addresses';
import {gpuRentalABI} from '../../../generated';
import {hardhat} from 'viem/chains';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url);
  const {searchParams} = new URL(req.url, 'http://localhost:8001');
  const {token} = req.query;
  const tokenId = Number(token);
  const hash = searchParams.get('h') as `0x${string}`;
  const signature = searchParams.get('s') as `0x${string}`;
  // const address = recoverAddress({hash, signature});
  const address = await recoverMessageAddress({
    message: 'Sign in with ID: ' + hash,
    signature
  });
  console.log('address: ' + address);
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

  if (expired) {
    res.json({error: 'Expired rental'});
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

    res.writeHead(301, {
      Location: `http://${ip}:7860/`
    }).end();
  } catch (e) {
    console.error(e);
    res.end('Error occurred');
  }

};

export default handler;
