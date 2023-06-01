import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from 'wagmi';
import {decodeEventLog, parseEther} from 'viem';
import {GPURentalAddress} from '../utils/addresses';
import {gpuRentalABI} from '../generated';
import {formatBytes32String} from 'ethers/lib/utils';

export const useRent = (template: string, amount: string) => {
  // useContractEvent({
  //   address: GPURentalAddress,
  //   abi: gpuRentalABI,
  //   eventName: 'Rent',
  //   listener(log) {
  //     console.log(log);
  //   }
  // });

  let contractDetails = {};
  if (template) {
    contractDetails = {
      address: GPURentalAddress,
      abi: gpuRentalABI,
      functionName: 'rent',
      args: [formatBytes32String(template), 1, parseEther(amount)]
    };
  }

  const {config} = usePrepareContractWrite(contractDetails);
  const {data, write} = useContractWrite(config);

  const {
    data: receipt,
    status,

  } = useWaitForTransaction({
    hash: data?.hash
  });

  if (receipt) {
    const lastLog = receipt.logs.pop();
    const rentEvent = decodeEventLog({
      abi: gpuRentalABI,
      data: lastLog.data,
      topics: lastLog.topics
    });
    const tokenId = Number(rentEvent.args.tokenId);
    fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({token: tokenId})
    }).then(() => {
      window.location.href = '/auto/' + tokenId;
    });
    console.log('New tokenId: ' + tokenId);
  }

  return {execute: write, status, receipt};
};
