import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';

export const usePauseRental = (tokenId: number) => {
  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'pauseRental',
    args: [BigInt(tokenId)]
  });
  const {data, write} = useContractWrite(config);
  const {status} = useWaitForTransaction({
    hash: data?.hash
  });

  return {execute: write};
};
