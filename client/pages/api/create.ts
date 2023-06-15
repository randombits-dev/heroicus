import {NextApiRequest, NextApiResponse} from 'next';
import {createPublicClient, http} from 'viem';
import {hardhat} from 'viem/chains';
import {parseBytes32String} from 'ethers/lib/utils';
import {HeroicusAddress} from '../../utils/addresses';
import {heroicusABI} from '../../generated';
import {withErrorHandler} from '../../errorHandler';
import {startServer} from '../../utils/aws';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    throw 'Not POST';
  }
  const {token} = JSON.parse(req.body);

  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });

  const userInfo = await client.readContract({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'userInfo',
    args: [BigInt(token)]
  });
  const templateId = parseBytes32String((userInfo[0] as any).templateId);
  const region = (userInfo[0] as any).region;
  const expired = userInfo[1];

  if (expired) {
    throw 'Expired Rental';
  }

  const result = await startServer(templateId, token, region);
  res.json(result);
};

export default withErrorHandler(handler);
