import {GPURentalAddress} from './addresses';

export const getClientToken = (tokenId): string => {
  return GPURentalAddress + '_3_' + tokenId;
};
