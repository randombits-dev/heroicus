import {usePrepareContractWrite} from 'wagmi';
import {decodeEventLog} from 'viem';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {useRouter} from 'next/router';
import {useContractWriteStatus} from './useContractWriteStatus';
import {useEffect} from 'react';

export const useRent = (template: string, amount: bigint) => {
  const {push} = useRouter();
  // useContractEvent({
  //   address: GPURentalAddress,
  //   abi: gpuRentalABI,
  //   eventName: 'Rent',
  //   listener(log) {
  //     console.log(log);
  //   }
  // });

  let contractDetails = {};
  if (template) {
    contractDetails = {
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'rent',
      args: [formatBytes32String(template), 1, amount]
    };
  }

  const {config} = usePrepareContractWrite(contractDetails);

  const {execute, receipt, status, statusMsg} = useContractWriteStatus(config);

  useEffect(() => {
    if (status === 'success') {
      const lastLog = receipt.logs.pop();
      const rentEvent = decodeEventLog({
        abi: gpuRentalABI,
        data: lastLog.data,
        topics: lastLog.topics
      });
      const tokenId = Number(rentEvent.args.tokenId);
      fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({token: tokenId})
      }).then(() => {
        void push('/auto/' + tokenId);
      });
    }
  }, [status]);

  // const {data, write, isLoading} = useContractWrite(config);
  //
  // const {
  //   data: receipt,
  //   status,
  //   isSuccess,
  //   isFetching,
  //   error
  // } = useWaitForTransaction({
  //   hash: data?.hash
  // });

  return {execute, status, statusMsg};
};
