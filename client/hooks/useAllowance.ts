import {Address, erc20ABI, useAccount, useContractRead, usePrepareContractWrite} from 'wagmi';
import {useContractWriteStatus} from './useContractWriteStatus';
import {HeroicusAddress, USDCAddress} from '../utils/network';

export const useAllowance = (amount: bigint) => {
  const {address} = useAccount();
  const {data, isFetched, refetch} = useContractRead({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, HeroicusAddress]
  });
  const enough = (data || 0) >= amount;

  const {config} = usePrepareContractWrite({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [HeroicusAddress, amount],
    enabled: !enough
  });

  const {execute, status, statusMsg} = useContractWriteStatus(config);

  return {allowance: data, enough, refetch, execute, status, statusMsg};
};
