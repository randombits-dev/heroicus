import {useContractReads} from 'wagmi';
import {heroicusABI} from '../generated';
import {SERVER_LIST} from '../utils/templates';
import {ServerInfo} from '../utils/definitions';
import {HeroicusAddress} from '../utils/network';
import {encodeBytes32String} from "ethers";

let cache: ServerInfo[];
export const useServerList = (): ServerInfo[] => {

  let readParams = SERVER_LIST.map(({id}) => ({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'serverConfigs',
    args: [encodeBytes32String(id)],
    enabled: !cache
  }));

  const {data, isSuccess} = useContractReads({
    contracts: readParams
  });

  if (cache) {
    return cache;
  } else if (isSuccess) {
    if (data!.find(item => item.status === 'failure')) {
      return [];
    }
    cache = data!.map((item: any, i) => ({
      id: SERVER_LIST[i].id,
      cpus: item.result[0]
    }));
    return cache;
  } else {
    return [];
  }
};
