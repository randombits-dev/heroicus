import {useContractWrite, useWaitForTransaction} from 'wagmi';
import {ContractWriteStatus} from '../utils/definitions';

const getStatus = ({isLoading, isSuccess, isFetching, isError, error, statusOverrides}): [ContractWriteStatus, string] => {
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

export const useContractWriteStatus = (config, statusOverrides = {}) => {
  const {data, write, isLoading} = useContractWrite(config);
  const {data: receipt, isSuccess, error, isError, isFetching} = useWaitForTransaction({
    hash: data?.hash
  });
  const [status, statusMsg] = getStatus({isLoading, isSuccess, isError, error, isFetching, statusOverrides});
  return {execute: write, receipt, status, statusMsg};
};
