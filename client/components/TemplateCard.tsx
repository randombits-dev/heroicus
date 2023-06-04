import {TEMPLATE_LIST} from "../utils/templates";
import {useRouter} from "next/router";
import TemplateSpec from "./TemplateSpec";
import React from "react";
import {formatEther} from "viem";

const TemplateCard = ({templateInfo}: any) => {
  const {push} = useRouter();
  const templateDetails = TEMPLATE_LIST.find(t => t.id === templateInfo.name);

  const details = () => {
    void push('/template/' + templateInfo.name);
  };

  return <div className="bg-zinc-950 rounded-lg m-10 px-10 py-5 w-96 flex flex-col">
    <div className="flex-1">
      <div className="text-2xl mb-4">{templateDetails.name}</div>
      <div className="text-sm py-5">{templateDetails.notes}</div>
      <div>
        <TemplateSpec name="CPU">{templateDetails.cpu + 'x CPUS'}</TemplateSpec>
        <TemplateSpec name="RAM">{templateDetails.ram + ' GB RAM'}</TemplateSpec>
        <TemplateSpec name="GPU">{templateDetails.gpu}</TemplateSpec>
        <TemplateSpec name="USAGE">{templateInfo.cpus}</TemplateSpec>
        {/*<TemplateSpec name="OTHER" value={templateDetails.notes}/>*/}
        {/*<TemplateSpec name="PRICE" value={templateInfo.price + ' USDC / hr'}/>*/}
      </div>

    </div>
    <div className="pt-5">
      <span className="text-xl font-bold mr-2">{formatEther(templateInfo.price)}</span>
      <span className="text-sm">USDC per hour</span>
    </div>
    <button className="w-full mt-5 bg-blue-900 px-10 py-3" onClick={details}>Choose</button>
  </div>;

};

export default TemplateCard;
