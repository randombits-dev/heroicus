import {useContractWrite, useWaitForTransaction} from 'wagmi';
import {ContractWriteStatus} from '../utils/definitions';
import {useEffect} from 'react';

const getStatus = ({isLoading, isSuccess, isFetching, isError, error, statusOverrides}: any): [ContractWriteStatus, string] => {
  if (isError) {
    return ['error', statusOverrides.error || 'Error: ' + error.message];
  } else if (isSuccess) {
    return ['success', statusOverrides.success || 'Success'];
  } else if (isFetching) {
    return ['pending', statusOverrides.pending || 'Waiting for transaction confirmation'];
  } else if (isLoading) {
    return ['loading', statusOverrides.loading || 'Confirm transaction in wallet'];
  } else {
    return [undefined, ''];
  }
};

export const useContractWriteStatus = (config: any, statusOverrides = {}) => {
  const {data, write, isLoading} = useContractWrite(config);
  const {data: receipt, isSuccess, error, isError, isFetching, refetch} = useWaitForTransaction({
    hash: data?.hash
  });
  const [status, statusMsg] = getStatus({isLoading, isSuccess, isError, error, isFetching, statusOverrides});
  useEffect(() => {
    if (isError) {
      void refetch();
    }
  }, [isError]);
  return {execute: write, receipt, status, statusMsg};
};
