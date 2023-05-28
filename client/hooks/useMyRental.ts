import {useAccount, useContractRead} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {parseBytes32String} from 'ethers/lib/utils';

export const useMyRental = ({token}) => {
  const {address} = useAccount();

  const {data} = useContractRead({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [token]
  });
  const userStruct = data?.[0] as any;

  const formatted = data && {
    token: Number(token),
    user: userStruct.user,
    expires: new Date(Number(userStruct.expires) * 1000),
    template: parseBytes32String(userStruct.templateId),
    expired: data[1]
  };
  return {myRental: formatted};
};
