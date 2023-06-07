import {usePrepareContractWrite} from 'wagmi';
import {decodeEventLog} from 'viem';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {useRouter} from 'next/router';
import {useContractWriteStatus} from './useContractWriteStatus';
import {useEffect, useState} from 'react';
import {useAllowance} from './useAllowance';

export const useRent = (template: string, region: number, amount: bigint) => {
  const {push} = useRouter();
  const [awsError, setAwsError] = useState(false);

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
      args: [formatBytes32String(template), region, amount]
    };
  }

  const {config, error} = usePrepareContractWrite(contractDetails);

  const {execute, receipt, status, statusMsg} = useContractWriteStatus(config, {success: 'Reserving Server'});

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
      }).then((res) => {
        if (res.ok) {
          res.json().then(data => {
            if (data.success) {
              void push('/auto/' + tokenId);
            } else {
              setAwsError(true);
            }
          });
        }
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

  return {execute, executeAllowance, enough, status, statusMsg, statusAllowance, statusMsgAllowance, prepareError: error, awsError};
};
