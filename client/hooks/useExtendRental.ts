import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {parseEther} from 'viem';

export const useExtendRental = (tokenId: number, amount: number) => {
  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'extendRental',
    args: [BigInt(tokenId), parseEther(amount)]
  });
  const {data, write} = useContractWrite(config);
  const {status} = useWaitForTransaction({
    hash: data?.hash
  });

  return {execute: write};
};
