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

  const {config} = usePrepareContractWrite({
    address: GPURentalAddress,
    abi: gpuRentalABI,
    functionName: 'rent',
    args: [formatBytes32String(template), parseEther(amount), parseEther('0')]
  });
  const {data, write} = useContractWrite(config);

  const {
    data: receipt,
    status,

  } = useWaitForTransaction({
    hash: data?.hash
  });

  if (receipt) {
    console.log(receipt);
    const lastLog = receipt.logs.pop();
    const rentEvent = decodeEventLog({
      abi: gpuRentalABI,
      data: lastLog.data,
      topics: lastLog.topics
    });
    const tokenId = Number(rentEvent.args.tokenId);
    // const decodedLogs = receipt.logs.map(log => {
    //   try {
    //     return decodeEventLog({
    //       abi: gpuRentalABI,
    //       data: log.data,
    //       topics: log.topics
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     return null;
    //   }
    //
    // });
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
