import {HeroicusAddress} from './addresses';
import {DescribeInstancesCommand, EC2Client, RunInstancesCommand} from '@aws-sdk/client-ec2';
import {REGIONS} from './templates';
import {privateKeyToAccount} from 'viem/accounts';
import {createPublicClient, createWalletClient, Hex, http} from 'viem';
import {hardhat} from 'viem/chains';
import {heroicusABI} from '../generated';

export const getClientToken = (tokenId: number): string => {
  // return HeroicusAddress + '_8_' + tokenId;
  return 'test';
};

export const startServer = async (templateId: string, token: number, region: number) => {
  const ec2 = new EC2Client({region: REGIONS[region][0]});

  const command = new DescribeInstancesCommand({
    Filters: [{Name: 'client-token', Values: [getClientToken(token)]}]
  });
  const {Reservations} = await ec2.send(command);
  if (Reservations!.length > 0) {
    throw 'Server already exists';
  }

  const cmd = new RunInstancesCommand({
    LaunchTemplate: {LaunchTemplateName: templateId},
    MinCount: 1,
    MaxCount: 1,
    ClientToken: getClientToken(token),
    TagSpecifications: [{ResourceType: 'instance', Tags: [{Key: HeroicusAddress, Value: String(token)}]}]
  });
  try {
    await ec2.send(cmd);
    return {success: true};
  } catch (e) {
    console.error(e);
    try {
      await refundServer(token);
      console.log('refund issued');
      return {success: false, refund: true};
    } catch (e2) {
      console.error('refund failed');
      console.error(e2);
      return {success: false, refund: false};
    }
  }
};

const refundServer = async (token: number) => {
  const account = privateKeyToAccount(process.env.OWNER_PRIVATE_KEY as Hex);
  const client = createPublicClient({
    chain: hardhat,
    transport: http(),
  });
  const wallet = createWalletClient({
    account,
    chain: hardhat,
    transport: http(),
  });

  // @ts-ignore
  const {request} = await client.simulateContract({
    // account,
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'provideRefund',
    args: [BigInt(token)]
  });
  await wallet.writeContract(request);
};
