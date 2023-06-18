import {createPublicClient, createWalletClient, Hex, http, PrivateKeyAccount, WalletClient} from 'viem';
import {fantom, fantomTestnet, hardhat} from 'viem/chains';
import {privateKeyToAccount} from 'viem/accounts';

const CHAINS: { [key: string]: any } = {
  'hardhat': hardhat,
  'fantom': fantom,
  'fantom-testnet': fantomTestnet
};

const HEROICUS_ADDRESSES: { [key: string]: `0x${string}` } = {
  hardhat: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  'fantom-testnet': '0x0b0d47cf4839F118D19E4AB65ddFdDdD93E824Fc',
  fantom: '0x'
};

const USDC_ADDRESSES: { [key: string]: `0x${string}` } = {
  hardhat: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  'fantom-testnet': '0xB537afeA2B022111e677E26AD4190C546C65CccD',
  fantom: '0x'
};
export const CURRENT_CHAIN = CHAINS[process.env.NEXT_PUBLIC_CHAIN as string];
export const HeroicusAddress = HEROICUS_ADDRESSES[process.env.NEXT_PUBLIC_CHAIN as string];
export const USDCAddress = USDC_ADDRESSES[process.env.NEXT_PUBLIC_CHAIN as string];

export const createViemClient = () => {
  return createPublicClient({
    chain: CURRENT_CHAIN,
    transport: http(),
  });
};

export const getOwnerAccount = (): PrivateKeyAccount => {
  return privateKeyToAccount(process.env.OWNER_PRIVATE_KEY as Hex);
};

export const createViemWallet = (): WalletClient => {
  return createWalletClient({
    account: getOwnerAccount(),
    chain: CURRENT_CHAIN,
    transport: http(),
  });
};
