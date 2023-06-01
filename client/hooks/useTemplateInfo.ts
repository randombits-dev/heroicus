import {useContractRead} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String, parseBytes32String} from 'ethers/lib/utils';
import {formatEther} from 'viem';
import {TemplateInfo} from '../utils/templates';

export const useTemplateInfo = ({templateId}): TemplateInfo => {
  let contractData = {};
  if (templateId) {
    contractData = {
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'templateInfo',
      args: [formatBytes32String(templateId)]
    };
  }
  const {data} = useContractRead(contractData);

  if (data) {
    return {
      name: parseBytes32String(data[0]),
      serverId: data[1],
      price: Number(formatEther(data[2]))
    };
  }
  return null;
};
