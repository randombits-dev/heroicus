import {useContractWrite, usePrepareContractWrite} from 'wagmi';

import {parseEther} from 'viem';
import {USDCAddress} from '../utils/addresses';
import {testTokenABI} from '../generated';

export const useGiveMeUSDC = (amount: string) => {
  const {config} = usePrepareContractWrite({
    address: USDCAddress,
    abi: testTokenABI,
    functionName: 'giveMe',
    args: [parseEther(amount)]
  });
  const {data, isLoading, isSuccess, write} = useContractWrite(config);

  return {execute: write};
};
