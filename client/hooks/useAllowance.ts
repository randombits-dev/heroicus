import {Address, erc20ABI, useAccount, useContractRead, usePrepareContractWrite} from 'wagmi';
import {useContractWriteStatus} from './useContractWriteStatus';
import {GPURentalAddress, USDCAddress} from '../utils/addresses';

export const useAllowance = (amount: bigint) => {
  const {address} = useAccount();
  const {data, isFetched, refetch} = useContractRead({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, GPURentalAddress]
  });
  const enough = data >= amount;

  const {config} = usePrepareContractWrite({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [GPURentalAddress, amount],
    enabled: !enough
  });

  const {execute, status, statusMsg} = useContractWriteStatus(config);

  return {allowance: data, enough, refetch, execute, status, statusMsg};
};
