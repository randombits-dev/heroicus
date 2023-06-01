import {useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String, parseBytes32String} from 'ethers/lib/utils';
import {formatEther} from 'viem';
import {TEMPLATE_LIST, TemplateInfo} from '../utils/templates';

export const useTemplateList = (): TemplateInfo[] => {
  const readParams = TEMPLATE_LIST.map(({id}) => ({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'templateInfo',
    args: [formatBytes32String(id)]
  }));
  const {data} = useContractReads({
    contracts: readParams
  });

  if (data) {
    return data.map((item: any) => ({
      name: parseBytes32String(item.result[0]),
      serverId: item.result[1],
      price: Number(formatEther(item.result[2]))
    }));
  } else {
    return [];
  }
};
