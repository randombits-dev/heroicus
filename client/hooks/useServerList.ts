import {useContractReads} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {SERVER_LIST} from '../utils/templates';
import {ServerInfo} from '../utils/definitions';

let cache: ServerInfo[];
export const useServerList = (): ServerInfo[] => {
  let readParams = SERVER_LIST.map(({id}) => ({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'serverConfigs',
    args: [formatBytes32String(id)],
    enabled: !cache
  }));

  const {data, isSuccess, isFetching} = useContractReads({
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
      price: item.result[0],
      cpus: item.result[1]
    }));
    return cache;
  } else {
    return [];
  }
};
