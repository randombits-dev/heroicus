import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';

export const useExtendRental = (tokenId: number, amount: bigint) => {
  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'extendRental',
    args: [BigInt(tokenId), amount]
  });
  const {data, write} = useContractWrite(config);
  const {status} = useWaitForTransaction({
    hash: data?.hash
  });

  return {execute: write};
};
