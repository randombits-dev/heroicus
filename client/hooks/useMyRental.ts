import {useContractRead} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {parseBytes32String} from 'ethers/lib/utils';
import {UserInfo} from '../utils/definitions';

interface Props {
  token: number;
}

export const useMyRental = ({token}: Props): { myRental: UserInfo | undefined, refetch: () => void } => {
  const {data, refetch} = useContractRead({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [BigInt(token)],
    enabled: !!token
  });

  const userStruct = data?.[0] as any;

  const formatted = data && {
    token: Number(token),
    user: userStruct.user,
    expires: Number(userStruct.expires) * 1000,
    templateId: parseBytes32String(userStruct.templateId),
    expired: data[1],
    region: userStruct.region
  };
  return {myRental: formatted, refetch};
};
