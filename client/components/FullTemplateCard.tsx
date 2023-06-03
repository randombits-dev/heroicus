import React, {useState} from 'react';
import {useTemplateInfo} from "../hooks/useTemplateInfo";
import {useEstimatePrice} from "../hooks/useEstimatePrice";
import {useRent} from "../hooks/useRent";
import {TEMPLATE_LIST} from "../utils/templates";
import ContractWriteStatus from "./common/ContractWriteStatus";

interface Props {
  templateId: string;
}

const FullTemplateCard = ({templateId}: Props) => {
  const [hours, setHours] = useState(2);
  const templateInfo = useTemplateInfo({templateId});
  const {price, amount} = useEstimatePrice(templateInfo, hours);
  const {execute, status, statusMsg} = useRent(templateInfo?.name, amount);

  const writeContents = () => {
    if (status) {
      return <ContractWriteStatus status={status} statusMsg={statusMsg}/>
    } else if (templateInfo) {
      const templateDetails = TEMPLATE_LIST.find(t => t.id === templateInfo.name);
      return <div className="">
        <div className="text-2xl mb-4">{templateDetails.name}</div>
        <div className="text-md">{templateDetails.cpu} CPUS</div>
        <div className="text-md">{templateDetails.ram} GB RAM</div>
        <div className="text-md">{templateDetails.gpu}</div>
        <div>{templateDetails.notes}</div>
        <div>{templateInfo.price} USDC / hr</div>
        <input className="bg-neutral-900 w-20 px-1 outline-0"
               onChange={(e) => setHours(e.target.value)}
               type="number"
               value={hours}
        /> hours
        <div>Total Price: {price}</div>

        <div className="text-center mt-10">
          <button className="bg-blue-900 px-10 py-3 w-full" onClick={execute}>Submit</button>
        </div>

      </div>
    }
  };

  return <div className="flex justify-center">
    <div className="bg-zinc-950 rounded-lg m-10 px-10 py-5 w-96">
      {writeContents()}
    </div>
  </div>;
}

export default FullTemplateCard
