import {useContractRead} from 'wagmi';
import {heroicusABI} from '../generated';
import {decodeBytes32String} from "ethers";
import {UserInfo} from '../utils/definitions';
import {HeroicusAddress} from '../utils/network';

interface Props {
  token: number;
}

export const useMyRental = ({token}: Props): { myRental: UserInfo | undefined, refetch: () => void } => {

  const {data, refetch} = useContractRead({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'userInfo',
    args: [BigInt(token)],
    enabled: !!token
  });

  const userStruct = data?.[0] as any;

  const formatted = data && {
    token: Number(token),
    user: userStruct.user,
    expires: Number(userStruct.expires) * 1000,
    templateId: decodeBytes32String(userStruct.templateId),
    expired: data[1],
    region: Number(userStruct.region)
  };
  return {myRental: formatted, refetch};
};
