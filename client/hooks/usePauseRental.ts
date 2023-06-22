import {usePrepareContractWrite} from 'wagmi';
import {heroicusABI} from '../generated';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useContractWriteStatus} from './useContractWriteStatus';
import {HeroicusAddress} from '../utils/network';

export const usePauseRental = (tokenId: number, region: number) => {

  // const [executing, setExecuting] = useState(false);
  const {push} = useRouter();
  const {config} = usePrepareContractWrite({
    address: HeroicusAddress,
    abi: heroicusABI,
    functionName: 'stopRental',
    args: [BigInt(tokenId)]
  });

  const {execute, status, statusMsg} = useContractWriteStatus(config);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      fetch('/api/stop', {
        method: 'POST',
        body: JSON.stringify({token: tokenId, region})
      }).then(() => {
        void push('/portal');
      });
    }
  }, [status]);

  return {execute, status, statusMsg};
};
