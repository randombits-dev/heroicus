import {usePrepareContractWrite} from 'wagmi';
import {decodeEventLog} from 'viem';
import {heroicusABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';
import {useRouter} from 'next/router';
import {useContractWriteStatus} from './useContractWriteStatus';
import {useEffect, useState} from 'react';
import {useAllowance} from './useAllowance';
import {HeroicusAddress} from '../utils/network';

export const useRent = (template: string | undefined, metadata: string | undefined, region: number, amount: bigint) => {

  const {push} = useRouter();
  const [awsError, setAwsError] = useState(false);
  const [unknownError, setUnknownError] = useState(false);

  const {enough, execute: executeAllowance, status: statusAllowance, statusMsg: statusMsgAllowance, refetch} = useAllowance(amount);

  useEffect(() => {
    if (statusAllowance === 'success') {
      void refetch();
    }
  }, [statusAllowance]);

  let contractDetails = {};
  if (template && enough) {
    contractDetails = {
      address: HeroicusAddress,
      abi: heroicusABI,
      functionName: 'rent',
      args: [metadata, formatBytes32String(template), region, amount]
    };
  }

  const {config, error} = usePrepareContractWrite(contractDetails);

  const {execute, receipt, status, statusMsg} = useContractWriteStatus(config, {success: 'Reserving Server'});

  useEffect(() => {
    if (status === 'success') {
      const lastLog = receipt!.logs.pop();
      const rentEvent = decodeEventLog({
        abi: heroicusABI,
        data: lastLog!.data,
        topics: lastLog!.topics
      });
      const tokenId = Number((rentEvent.args as any).tokenId);
      fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({token: tokenId})
      }).then((res) => {
        if (res.ok) {
          res.json().then(data => {
            if (data.success) {
              void push('/rental/' + tokenId);
            } else {
              setAwsError(true);
            }
          });
        } else {
          setUnknownError(true);
        }
      });
    }
  }, [status]);

  return {
    execute,
    executeAllowance,
    enough,
    status,
    statusMsg,
    statusAllowance,
    statusMsgAllowance,
    prepareError: error,
    awsError,
    unknownError
  };
};
