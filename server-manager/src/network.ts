import {createPublicClient, http} from 'viem';
import {fantom, fantomTestnet, hardhat} from 'viem/chains';

const CHAINS: { [key: string]: any } = {
  'hardhat': hardhat,
  'fantom': fantom,
  'fantom-testnet': fantomTestnet
};

const HEROICUS_ADDRESSES: { [key: string]: `0x${string}` } = {
  hardhat: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  'fantom-testnet': '0x0b0d47cf4839F118D19E4AB65ddFdDdD93E824Fc',
  fantom: '0xC6537b534dEe49ff94A3193A65101f367c1C566A'
};

const CHAIN_ID = process.env.CHAIN as string;
export const CURRENT_CHAIN = CHAINS[CHAIN_ID];
export const HeroicusAddress = HEROICUS_ADDRESSES[CHAIN_ID];
export const createViemClient = () => {
  return createPublicClient({
    chain: CURRENT_CHAIN,
    transport: http(),
  });
};
