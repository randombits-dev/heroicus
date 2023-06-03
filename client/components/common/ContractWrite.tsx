import React, {useEffect} from 'react';
import {useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";

interface Props {
  key: string;
}

const ContractWrite = ({address, abi, functionName, args}) => {
  const {config} = usePrepareContractWrite({
    address, abi, functionName, args
  });
  const {data, write, isLoading} = useContractWrite(config);
  const {status, isSuccess, error} = useWaitForTransaction({
    hash: data?.hash
  });

  useEffect(() => {
    write();
  }, []);


  if (isLoading) {
    return (
      <div>Confirm tx in wallet</div>
    );
  } else if (isSuccess) {
    return <div>Success</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <div>Working....</div>;
    );
  }

}

export default ContractWrite
