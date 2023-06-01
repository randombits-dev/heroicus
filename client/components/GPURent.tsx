'use client'

import {useAccount, useBalance} from 'wagmi'
import {USDCAddress} from "../utils/addresses";
import {useTemplateList} from "../hooks/useTemplateList";
import TemplateCard from "./TemplateCard";

export function GPURent() {
  const {address} = useAccount()

  const {data, refetch} = useBalance({address, token: USDCAddress});
  const templateInfo = useTemplateList();
  // const {allowance, execute: approveUSDC, approveStatus} = useAllowance(USDCAddress, GPURentalAddress, "10");
  // const nftList = useNftList();

  return (
    <div className="text-center m-10">
      <div className="text-3xl">Available Rentals</div>
      <div className="flex justify-center">
        {
          templateInfo.map(template => {
            return <TemplateCard key={template.name} templateInfo={template}/>;
          })}
      </div>
    </div>
  )
}
