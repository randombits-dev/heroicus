import {useAccount, useContractRead, useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {parseBytes32String} from 'ethers/lib/utils';

export const useMyRentals = () => {
  const {address} = useAccount();

  // const {data: rentalBalance} = useBalance(GPURentalAddress);
  const {data: rentalBalance} = useContractRead({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'balanceOf',
    args: [address]
  });

  const indexRequests = [];
  for (let i = 0; i < Number(rentalBalance); i++) {
    indexRequests.push({
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, BigInt(i)]
    });
  }

  const {data: results, status} = useContractReads({
    contracts: indexRequests
  });

  const userInfoRequest = results?.filter(result => !result.error).map(result => ({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'userInfo',
    args: [result.result]
  }));

  const {data: myRentals, isSuccess} = useContractReads({
    contracts: userInfoRequest
  });

  if (isSuccess) {
    const myRentalsFormatted = myRentals.map((item: any, i) => ({
      token: Number(results[i].result),
      user: item.result[0].user,
      expires: new Date(Number(item.result[0].expires) * 1000),
      template: parseBytes32String(item.result[0].templateId),
      expired: item.result[1]
    })).filter(item => !item.expired);
    return {myRentals: myRentalsFormatted};
  } else {
    return {myRentals: []};
  }
};
