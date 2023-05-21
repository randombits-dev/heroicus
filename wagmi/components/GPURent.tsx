'use client'

import {useState} from 'react'
import {useAccount, useBalance} from 'wagmi'
import {USDCAddress} from "../utils/addresses";
import {useRent} from "../hooks/useRent";

export function GPURent() {
  const {address} = useAccount()

  const [hours, setHours] = useState("2");
  const {data, refetch} = useBalance({address, token: USDCAddress});
  const {execute} = useRent(hours);

  const rent = () => {
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
          onChange={(e) => setHours(String(e.target.value))}
          type="number"
          value={hours}
        />
        <button onClick={rent}>rent</button>

      </div>
    </div>
  )
}
