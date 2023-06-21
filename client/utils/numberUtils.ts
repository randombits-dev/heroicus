import {formatUnits} from 'viem';

export const formatUSDC = (value: bigint) => {
  return formatUnits(value, 6);
};
