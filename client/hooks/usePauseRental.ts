import {usePrepareContractWrite} from 'wagmi';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {useContractWriteStatus} from './useContractWriteStatus';

export const usePauseRental = (tokenId: number) => {
  // const [executing, setExecuting] = useState(false);
  const {push} = useRouter();
  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'stopRental',
    args: [BigInt(tokenId)]
  });

  const {execute, status, statusMsg} = useContractWriteStatus(config);

  useEffect(() => {
    if (status === 'success') {
      fetch('/api/stop', {
        method: 'POST',
        body: JSON.stringify({token: tokenId})
      }).then(() => {
        void push('/portal');
      });
    }
  }, [status]);

  return {execute, status, statusMsg};
};
