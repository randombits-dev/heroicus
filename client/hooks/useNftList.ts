import {useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {UserInfo} from '../utils/templates';

export const useNftList = (): UserInfo[] => {
  const readParams = [];
  for (let i = 0; i < 10; i++) {
    readParams.push({
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'userInfo',
      args: [i]
    });
  }
  const {data} = useContractReads({
    contracts: readParams
  });

  if (data) {
    return data.map((item: any) => ({
      user: item.results?.[0],
      expires: Number(item.result?.[1]),
      template: item.result?.[2]
    }));
  } else {
    return [];
  }
};
