'use client'

import {useState} from 'react'
import {useAccount, useBalance} from 'wagmi'
import {useGiveMeUSDC} from "../hooks/useGiveMeUSDC";
import {USDCAddress} from "../utils/addresses";

export function USDCBalance() {
  const {address} = useAccount()

  const [amount, setAmount] = useState("100");
  const {data, refetch} = useBalance({address, token: USDCAddress});
  const {execute} = useGiveMeUSDC(amount);

  const give = () => {
    if (execute) {
      execute();
    }
  };

  return (
    <div>


      {data && (
        <div>
          {data?.formatted} {data.symbol}
        </div>
      )}
      {/*{isLoading && <div>Fetching token...</div>}*/}
      {/*{isError && <div>Error: {error?.message}</div>}*/}

      <div>
        <input
          onChange={(e) => setAmount(String(e.target.value))}
          type="number"
          value={amount}
        />
        <button onClick={give}>give</button>

      </div>
    </div>
  )
}
