import {useContractWrite, usePrepareContractWrite} from 'wagmi';
import {parseEther} from 'viem';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';

export const useRent = (amount: string) => {
  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'rent',
    args: [formatBytes32String('template1'), parseEther(amount), parseEther('0')]
  });
  const {data, isLoading, isSuccess, write} = useContractWrite(config);

  return {execute: write, isSuccess, isLoading, data};
};
