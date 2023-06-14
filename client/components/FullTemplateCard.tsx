import React, {useState} from 'react';
import {useTemplateInfo} from "../hooks/useTemplateInfo";
import {useEstimatePrice} from "../hooks/useEstimatePrice";
import {useRent} from "../hooks/useRent";
import {TEMPLATE_LIST} from "../utils/templates";
import ContractWriteStatus from "./common/ContractWriteStatus";
import TemplateSpec from "./TemplateSpec";
import {formatEther} from "viem";
import RegionSelect from "./RegionSelect";
import {useCPUUsage} from "../hooks/useCPUUsage";
import {useRouter} from "next/router";
import ActionButton from "./common/ActionButton";

interface Props {
  templateId: string;
}

const THIRTY_DAYS = 30 * 24;

const FullTemplateCard = ({templateId}: Props) => {
  const {reload} = useRouter();
  const [hours, setHours] = useState(2);
  const [region, setRegion] = useState(1);
  const [error, setError] = useState('');
  const templateInfo = useTemplateInfo({templateId});
  const {price, amount} = useEstimatePrice(templateInfo, hours);
  const {
    execute,
    enough,
    executeAllowance,
    statusAllowance,
    statusMsgAllowance,
    status,
    statusMsg,
    prepareError,
    awsError,
    unknownError
  } = useRent(templateInfo?.name, region, amount);
  const {data: cpuUsage} = useCPUUsage({template: templateInfo, regionId: region})

  const writeButton = () => {
    if (prepareError) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">Not enough resources available to rent this server</button>;
    } else if (hours > 0 && !error) {
      if (enough) {
        return <button className="bg-blue-900 px-10 py-3 w-full mt-5" onClick={execute}>Pay {price} USDC</button>;
      } else {
        return <button className="bg-blue-900 px-10 py-3 w-full mt-5" onClick={executeAllowance}>Approve {price} USDC</button>;
      }
    } else {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">{error}</button>;
    }
  };

  const onRegionChange = (id) => {
    setRegion(id);
  };

  const updateHours = (e) => {
    // if (e.charCode >= 48 && e.charCode <= 57) {
    //   setHours(e.target.value);
    // }
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setHours(value);

      if (!value) {
        setError('Minimum rental time is 1 hour');
      } else if (value > THIRTY_DAYS) {
        setError('Maximum rental time is 30 days')
      } else {
        setError('');
      }
    }
  };

  const writeContents = () => {
    if (unknownError) {
      return <div>An unknown error has occurred. Please stop your server for a refund.</div>
    } else if (awsError) {
      return <div>
        <div>Insufficient resources available to create server. A full refund was issued.</div>
        <br/>
        <div>You can try a different region, or wait a few hours and try again.</div>
        <br/>
        <TemplateSpec name="REFUND">{price} USDC</TemplateSpec>
        <br/>
        <ActionButton handleClick={() => reload()}>Go Back</ActionButton>
      </div>
    } else if (status) {
      return <ContractWriteStatus status={status} statusMsg={statusMsg}/>
    } else if (!enough && statusAllowance) {
      return <ContractWriteStatus status={statusAllowance} statusMsg={statusMsgAllowance}/>
    } else if (templateInfo) {
      const templateDetails = TEMPLATE_LIST.find(t => t.id === templateInfo.name);

      return <>
        <div className="flex-1">
          <div className="text-2xl mb-4">{templateDetails.name}</div>
          <div className="text-sm mb-5">{templateDetails.notes}</div>
          <div>
            <TemplateSpec name="CPU">{templateDetails.cpu + 'x CPUS'}</TemplateSpec>
            <TemplateSpec name="RAM">{templateDetails.ram + ' GB RAM'}</TemplateSpec>
            <TemplateSpec name="GPU">{templateDetails.gpu}</TemplateSpec>

            <br/>

            <TemplateSpec name="REGION">
              <RegionSelect regionChanged={onRegionChange}/>
            </TemplateSpec>
            <TemplateSpec name="CPU USAGE">{cpuUsage}</TemplateSpec>
            <br/>

            <TemplateSpec name="PRICE"><span className="text-xl font-bold mr-2">{formatEther(templateInfo.price)}</span>
              <span className="text-sm">USDC per hour</span></TemplateSpec>

            <TemplateSpec name="HOURS"><input className="bg-neutral-900 w-20 px-5 py-1 outline-0"
                                              onChange={updateHours}
                                              type="text"
              // pattern="[0-9]*"
                                              value={hours}
            /></TemplateSpec>
            <TemplateSpec name="TOTAL">{price} USDC</TemplateSpec>

          </div>

        </div>

        {/*<div>*/}
        {/*  {error}*/}
        {/*</div>*/}

        {/*<div className="pt-5">*/}
        {/*  <span className="text-xl font-bold mr-2">{templateInfo.price}</span>*/}
        {/*  <span className="text-sm">USDC per hour</span>*/}
        {/*</div>*/}
        {/*<div>x</div>*/}
        {/*<div>*/}
        {/*  <input className="bg-neutral-900 w-20 px-5 py-1 outline-0"*/}
        {/*         onChange={(e) => setHours(e.target.value)}*/}
        {/*         type="number"*/}
        {/*         value={hours}*/}
        {/*  /> hours*/}
        {/*</div>*/}
        {/*<div>=</div>*/}
        {/*<div>{price} TOTAL</div>*/}

        {
          writeButton()
        }
      </>
    }
  };

  return <div className="flex justify-center text-center">
    <div className="bg-zinc-950 rounded-lg m-10 px-10 py-5 w-96 flex flex-col">
      {writeContents()}
    </div>
  </div>;
}

export default FullTemplateCard
