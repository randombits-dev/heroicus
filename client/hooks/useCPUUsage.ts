import {useContractRead} from 'wagmi';
import {HeroicusAddress} from '../utils/addresses';
import {heroicusABI} from '../generated';
import {TemplateInfo} from '../utils/definitions';

export const useCPUUsage = ({template, regionId}: { template: TemplateInfo | undefined, regionId: number }) => {

  let config = {};
  if (template) {
    const functionName = template.serverId[0] === 't' ? 'tUsage' : 'gUsage';
    config = {
      address: HeroicusAddress,
      abi: heroicusABI,
      functionName,
      args: [regionId]
    };
  }

  const {data} = useContractRead(config);

  return {data};
};
