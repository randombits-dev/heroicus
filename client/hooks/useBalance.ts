import {Address, erc20ABI, useAccount, useContractRead} from 'wagmi';
import {USDCAddress} from '../utils/network';

export const useBalance = () => {
  const {address} = useAccount();
  const {data} = useContractRead({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as Address]
  });
  return {balance: data || 0};
};
