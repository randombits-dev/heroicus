import {useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String, parseBytes32String} from 'ethers/lib/utils';
import {TEMPLATE_LIST} from '../utils/templates';
import {TemplateInfo} from '../utils/definitions';
import {useServerList} from './useServerList';

let cache;
export const useTemplateList = (): TemplateInfo[] => {
  const serverData = useServerList();

  let readParams = [];
  if (!cache) {
    readParams = TEMPLATE_LIST.map(({id}) => ({
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'templateInfo',
      args: [formatBytes32String(id)]
    }));
  }

  const {data, isSuccess} = useContractReads({
    contracts: readParams
  });

  let isAllSuccess = false;
  if (isSuccess) {
    if (!data.find(item => item.status === 'failure')) {
      isAllSuccess = true;
    }
  }

  if (cache) {
    return cache;
  } else if (isAllSuccess && serverData.length > 0) {
    cache = data.map((item: any, i) => {
      const serverId = parseBytes32String(item.result[0]);
      const server = serverData.find(s => s.id === serverId);
      return {
        name: TEMPLATE_LIST[i].id,
        serverId,
        price: item.result[1],
        cpus: server?.cpus
      };
    });
    return cache;
  } else {
    return [];
  }
};
