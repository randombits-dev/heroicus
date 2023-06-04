import {usePrepareContractWrite} from 'wagmi';
import {decodeEventLog} from 'viem';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {useRouter} from 'next/router';
import {useContractWriteStatus} from './useContractWriteStatus';
import {useEffect} from 'react';
import {useAllowance} from './useAllowance';

export const useRent = (template: string, amount: bigint) => {
  const {push} = useRouter();

  const {enough, execute: executeAllowance, status: statusAllowance, statusMsg: statusMsgAllowance, refetch} = useAllowance(amount);

  useEffect(() => {
    if (statusAllowance === 'success') {
      refetch();
    }
  }, [statusAllowance]);

  let contractDetails = {};
  if (template && enough) {
    contractDetails = {
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'rent',
      args: [formatBytes32String(template), 1, amount]
    };
  }

  const {config, error} = usePrepareContractWrite(contractDetails);

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

  return {execute, executeAllowance, enough, status, statusMsg, statusAllowance, statusMsgAllowance, prepareError: error};
};
