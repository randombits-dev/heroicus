'use client'

import {useState} from 'react'
import {useAccount, useBalance} from 'wagmi'
import {USDCAddress} from "../utils/addresses";
import {useTemplateList} from "../hooks/useTemplateList";

export function GPUAdmin() {
  const {address} = useAccount()

  const [hours, setHours] = useState("2");
  const {data, refetch} = useBalance({address, token: USDCAddress});
  const {templateInfo} = useTemplateList();

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
        {templateInfo}
      </div>
    </div>
  )
}
