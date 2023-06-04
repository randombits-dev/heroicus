import {useContractRead} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';

export const useCPUUsage = ({template, regionId}) => {

  let config = {};
  if (template) {
    const functionName = template.serverId[0] === 't' ? 'tUsage' : 'gUsage';
    config = {
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName,
      args: [regionId]
    };
  }

  const {data} = useContractRead(config);

  return {data};
};
