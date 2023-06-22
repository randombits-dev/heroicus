import {useAccount, useContractRead, useContractReads} from 'wagmi';
import {heroicusABI} from '../generated';
import {parseBytes32String} from 'ethers/lib/utils';
import {UserInfo} from '../utils/definitions';
import {HeroicusAddress} from '../utils/network';

export const useMyRentals = (): { myRentals: UserInfo[] } => {
  const {address} = useAccount();

  // const {data: rentalBalance} = useBalance(GPURentalAddress);
  const {data: rentalBalance} = useContractRead({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'balanceOf',
    args: [address!]
  });

  const {data: results, status} = useContractReads({
    contracts: [...Array(Number(rentalBalance || 0))].map((_, i) => ({
      address: HeroicusAddress,
      abi: heroicusABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address!, BigInt(i)]
    }))
  });

  const {data: myRentals, isSuccess} = useContractReads({
    contracts: results?.filter(result => !result.error).map(result => ({
      address: HeroicusAddress,
      abi: heroicusABI,
      functionName: 'userInfo',
      args: [result.result as unknown as bigint]
    }))
  });

  if (isSuccess) {
    const myRentalsFormatted = myRentals!.map((item: any, i) => ({
      token: Number(results![i].result),
      user: item.result[0].user,
      expires: Number(item.result[0].expires) * 1000,
      templateId: parseBytes32String(item.result[0].templateId),
      region: Number(item.result[0].region),
      expired: item.result[1]
    })).filter(item => !item.expired);
    return {myRentals: myRentalsFormatted};
  } else {
    return {myRentals: []};
  }
};
