'use client'

import {useAccount, useBalance} from 'wagmi'
import {USDCAddress} from "../utils/addresses";
import {useTemplateList} from "../hooks/useTemplateList";
import TemplateCard from "./TemplateCard";
import Allowance from "./Allowance";

export function GPURent() {
  const {address} = useAccount()

  const {data, refetch} = useBalance({address, token: USDCAddress});
  const templateInfo = useTemplateList();
  // const {allowance, execute: approveUSDC, approveStatus} = useAllowance(USDCAddress, GPURentalAddress, "10");
  // const nftList = useNftList();

  return (
    <div>


      {data && (
        <div>
          {data?.formatted} {data.symbol}
        </div>
      )}
      {/*{isLoading && <div>Fetching token...</div>}*/}
      {/*{isError && <div>Error: {error?.message}</div>}*/}

      <Allowance/>
      <hr/>

      <div>
        {
          templateInfo.map(template => {
            return <TemplateCard key={template.name} templateInfo={template}/>;
          })}
      </div>
    </div>
  )
}
