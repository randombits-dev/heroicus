import {GPURentalAddress} from './addresses';

export const getClientToken = (tokenId): string => {
  return GPURentalAddress + '_2_' + tokenId;
};
