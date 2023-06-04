import {useRouter} from "next/router";
import TemplateSpec from "../TemplateSpec";
import {TEMPLATE_LIST} from "../../utils/templates";
import {formatExpires} from "../../utils/dates";
import Timer from "../common/Timer";

const RentalCard = ({rental}) => {
  const {push} = useRouter();
  const timeLeft = (rental.expires.getTime() - new Date().getTime()) / 1000 / 60;
  const templateDetails = TEMPLATE_LIST.find(t => t.id === rental.template);

  // const hash = hashMessage(rental.token as string);

  const launch = () => {
    void push(`/auto/${rental.token}`);
  };

  return <div className="bg-neutral-950 rounded-lg m-10 px-10 py-5">
    <TemplateSpec name="ID">{rental.token}</TemplateSpec>
    <TemplateSpec name="TYPE">{templateDetails.name}</TemplateSpec>
    <TemplateSpec name="EXPIRES">{formatExpires(rental.expires)}</TemplateSpec>
    <TemplateSpec name="TIME LEFT"><Timer end={rental.expires.getTime()}/></TemplateSpec>
    <button className="w-full mt-5 bg-blue-900 px-10 py-3" onClick={launch}>View</button>
  </div>;
};

export default RentalCard;
