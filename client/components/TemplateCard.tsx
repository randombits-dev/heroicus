import {TEMPLATE_LIST} from "../utils/templates";
import {useRouter} from "next/router";

const TemplateCard = ({templateInfo}: any) => {
  const {push} = useRouter();
  // const {address} = useAccount();
  // const [hours, setHours] = useState(2);
  // const {price} = useEstimatePrice(templateInfo, hours);
  // const {execute, receipt, status} = useRent(templateInfo.name, String(hours));

  const details = () => {
    void push('/template/' + templateInfo.name);
  };

  const writeContents = () => {
    if (status === 'error') {
      return <div className="">
        <div>An Error Occurred</div>
      </div>;
    } else if (status === 'loading') {
      return <div className="spinner"></div>;
    } else {
      const templateDetails = TEMPLATE_LIST.find(t => t.id === templateInfo.name);
      return <div className="">
        <div className="text-2xl mb-4">{templateDetails.name}</div>
        <div className="text-md">{templateDetails.cpu} CPUS</div>
        <div className="text-md">{templateDetails.ram} GB RAM</div>
        <div className="text-md">{templateDetails.gpu}</div>
        <div>{templateDetails.notes}</div>
        <div>{templateInfo.price} USDC / hr</div>
        {/*<input className="bg-neutral-900 w-20 px-1 outline-0"*/}
        {/*       onChange={(e) => setHours(e.target.value)}*/}
        {/*       type="number"*/}
        {/*       value={hours}*/}
        {/*/> hours*/}
        {/*<div>Total Price: {price}</div>*/}

        {/*<button className="bg-blue-900 px-10 py-3" onClick={execute}>Rent this server</button>*/}
        <button className="bg-blue-900 px-10 py-3" onClick={details}>Rent</button>
      </div>
    }
  };

  return <div className="bg-zinc-950 rounded-lg m-10 px-10 py-5 w-96">
    {writeContents()}
  </div>;

};

export default TemplateCard;
