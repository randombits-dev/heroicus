import React, {useState} from 'react';
import {useTemplateInfo} from "../hooks/useTemplateInfo";
import {useEstimatePrice} from "../hooks/useEstimatePrice";
import {useRent} from "../hooks/useRent";
import {TEMPLATE_LIST} from "../utils/templates";
import ContractWriteStatus from "./common/ContractWriteStatus";
import TemplateSpec from "./TemplateSpec";
import RegionSelect from "./RegionSelect";
import {useRouter} from "next/router";
import ActionButton from "./common/ActionButton";
import {formatUSDC} from "../utils/numberUtils";
import {useBalance} from "../hooks/useBalance";

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
  const templateDetails = TEMPLATE_LIST.find(t => t.id === templateId);
  const {price, amount} = useEstimatePrice(templateInfo, hours);
  const {balance} = useBalance();
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
  } = useRent(templateInfo?.name, templateDetails?.metadata, region, amount || BigInt(0));

  const writeButton = () => {
    if (error) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">{error}</button>;
    } else if (balance < (amount || 0)) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">USDC balance too low</button>;
    } else if (prepareError) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">Not enough resources available to rent this server</button>;
    } else {
      const approveText = enough ? 'USDC Approved' : `Allow Heroicus to spend USDC`;
      return <div className="mt-5">
        <ActionButton disabled={enough} handleClick={() => executeAllowance()}>{approveText}</ActionButton>
        <ActionButton additionalClasses="mt-3" disabled={!enough} handleClick={() => execute()}>Pay {price} USDC</ActionButton>
      </div>;
    }
  };

  const onRegionChange = (id: number) => {
    setRegion(id);
  };

  const updateHours = (e: any) => {
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
    } else if (!enough && statusAllowance && statusAllowance !== 'success') {
      return <ContractWriteStatus status={statusAllowance} statusMsg={statusMsgAllowance}/>
    } else if (templateInfo) {

      return <>
        <div className="flex-1">
          <div className="text-2xl mb-4">{templateDetails?.name}</div>
          <div className="text-sm mb-5">{templateDetails?.notes}</div>
          <div>
            <TemplateSpec name="CPU">{templateDetails?.cpu + 'x CPUS'}</TemplateSpec>
            <TemplateSpec name="RAM">{templateDetails?.ram + ' GB RAM'}</TemplateSpec>
            <TemplateSpec name="GPU">{templateDetails?.gpu}</TemplateSpec>

            <br/>

            <TemplateSpec name="REGION">
              <RegionSelect selectedRegion={region} regionChanged={onRegionChange}/>
            </TemplateSpec>
            {/*<TemplateSpec name="CPU USAGE">{cpuUsage}</TemplateSpec>*/}
            <br/>

            <TemplateSpec name="PRICE"><span className="text-xl font-bold mr-2">{formatUSDC(templateInfo.price)}</span>
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

        {
          writeButton()
        }

        <div className="mt-5 text-center">
          Payments are made with LayerZero USDC
          (<a className="text-sm" target="_blank"
              href="https://ftmscan.com/token/0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf">0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf</a>)
        </div>
      </>
    }
  };

  return <div className="flex justify-center text-center">
    <div className="bg-zinc-950 rounded-lg m-10 px-10 py-5 w-[450px] flex flex-col">
      {writeContents()}
    </div>
  </div>;
}

export default FullTemplateCard
