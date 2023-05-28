import {Address, erc20ABI, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction} from "wagmi";
import {formatEther, parseEther} from "viem";
import {GPURentalAddress, USDCAddress} from "../utils/addresses";
import {useState} from "react";

const Allowance = () => {
  const [amount, setAmount] = useState('');


  const {address} = useAccount();
  const {data: currentAllowance, refetch} = useContractRead({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address as Address, GPURentalAddress]
  });

  const {config} = usePrepareContractWrite({
    address: USDCAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [GPURentalAddress, parseEther(amount)]
  });

  const {write, data: writeData} = useContractWrite(config);

  const {
    data: receipt,
    status
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: () => {
      refetch();
    }
  });

  return <div>

    <div>Current allowance {currentAllowance && formatEther(currentAllowance)}</div>

    <input
      onChange={(e) => setAmount(e.target.value)}
      type="number"
      value={amount}
    />
    <button onClick={write}>Approve</button>

    <div>Status is {status}</div>
  </div>;

};

export default Allowance;
