import {useContractWrite, useWaitForTransaction} from 'wagmi';
import {ContractWriteStatus} from '../utils/definitions';

const getStatus = ({isLoading, isSuccess, isFetching, isError, error}): [ContractWriteStatus, string] => {
  if (isError) {
    return ['error', 'Error: ' + error.message];
  } else if (isSuccess) {
    return ['success', 'Success'];
  } else if (isFetching) {
    return ['pending', 'Pending'];
  } else if (isLoading) {
    return ['loading', 'Confirm transaction in wallet'];
  } else {
    return [undefined, ''];
  }
};

export const useContractWriteStatus = (config) => {
  const {data, write, isLoading} = useContractWrite(config);
  const {data: receipt, isSuccess, error, isError, isFetching} = useWaitForTransaction({
    hash: data?.hash
  });
  const [status, statusMsg] = getStatus({isLoading, isSuccess, isError, error, isFetching});
  return {execute: write, receipt, status, statusMsg};
};
