import {useContractReads} from 'wagmi';
import {heroicusABI} from '../generated';
import {formatBytes32String, parseBytes32String} from 'ethers/lib/utils';
import {TEMPLATE_LIST} from '../utils/templates';
import {TemplateInfo} from '../utils/definitions';
import {useServerList} from './useServerList';
import {HeroicusAddress} from '../utils/network';

let cache: TemplateInfo[];
export const useTemplateList = (): TemplateInfo[] => {
  const serverData = useServerList();

  const readParams = cache ? [] : TEMPLATE_LIST.map(({id}) => ({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'templateInfo',
    args: [formatBytes32String(id)]
  }));

  const {data, isSuccess} = useContractReads({
    contracts: readParams
  });

  let isAllSuccess = false;
  if (isSuccess) {
    if (!data!.find(item => item.status === 'failure')) {
      isAllSuccess = true;
    }
  }

  if (cache) {
    return cache;
  } else if (isAllSuccess && serverData.length > 0) {
    cache = data!.map((item: any, i) => {
      const serverId = parseBytes32String(item.result[0]);
      const server = serverData.find(s => s.id === serverId);
      return {
        name: TEMPLATE_LIST[i].id,
        serverId,
        price: item.result[1],
        cpus: server!.cpus
      };
    });
    return cache;
  } else {
    return [];
  }
};
