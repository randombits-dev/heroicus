import {Address, erc20ABI, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi';
import {formatEther, parseEther} from 'viem';

export const useAllowance = (coin: Address, spender: Address, amount: string) => {
  const {address} = useAccount();
  const {data} = useContractRead({
    address: coin,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, spender]
  });

  const {config} = usePrepareContractWrite({
    address: coin,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender, parseEther(amount)]
  });

  const {write, data: writeData} = useContractWrite(config);

  const {
    data: receipt,
    status
  } = useWaitForTransaction({hash: writeData?.hash});

  return {allowance: data ? formatEther(data) : '', execute: write, approveStatus: status};
};
