import {useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {formatEther} from 'viem';
import {TEMPLATE_LIST, TemplateInfo} from '../utils/templates';

export const useTemplateList = (): TemplateInfo[] => {
  const readParams = TEMPLATE_LIST.map(({id}) => ({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'templateInfo',
    args: [formatBytes32String(id)]
  }));
  const {data, isSuccess} = useContractReads({
    contracts: readParams
  });
  console.log(isSuccess, data);
  if (isSuccess) {
    return data.map((item: any, i) => ({
      name: TEMPLATE_LIST[i].id,
      serverId: item.result[0],
      price: Number(formatEther(item.result[1]))
    }));
  } else {
    return [];
  }
};
