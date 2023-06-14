import {usePrepareContractWrite} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {useAllowance} from './useAllowance';
import {useEffect} from 'react';
import {useContractWriteStatus} from './useContractWriteStatus';

export const useExtendRental = (tokenId: number, amount: bigint) => {
  const {enough, execute: executeAllowance, status: statusAllowance, statusMsg: statusMsgAllowance, refetch} = useAllowance(amount);

  useEffect(() => {
    if (statusAllowance === 'success') {
      void refetch();
    }
  }, [statusAllowance]);

  const {config, error: prepareError} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'extendRental',
    args: [BigInt(tokenId), amount],
    enabled: enough
  });
  const {execute, receipt, status, statusMsg} = useContractWriteStatus(config);

  return {execute, status, statusMsg, enough, statusAllowance, statusMsgAllowance, executeAllowance, prepareError};
};
