import {ContractFunctionExecutionError, ContractFunctionRevertedError} from 'viem';

export const getCustomError = (e) => {
  if (e instanceof ContractFunctionExecutionError) {
    if (e.cause instanceof ContractFunctionRevertedError) {
      const cause: ContractFunctionRevertedError = e.cause;
      return cause.data?.errorName ?? '';
    }
  }
  return '';
};

export const CUSTOM_ERRORS = {
  NoCPUAvailable: 'NoCPUAvailable'
};
