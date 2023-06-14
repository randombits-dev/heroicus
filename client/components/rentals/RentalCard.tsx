import {useRouter} from "next/router";
import TemplateSpec from "../TemplateSpec";
import {TEMPLATE_LIST} from "../../utils/templates";
import {formatExpires} from "../../utils/dates";
import Timer from "../common/Timer";
import ActionButton from "../common/ActionButton";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
}

const RentalCard = ({rental}: Props) => {
  const {push} = useRouter();
  const timeLeft = (rental.expires - new Date().getTime()) / 1000 / 60;
  const templateDetails = TEMPLATE_LIST.find(t => t.id === rental.templateId);

  // const hash = hashMessage(rental.token as string);

  const launch = () => {
    void push(`/rental/${rental.token}`);
  };

  return <div className="bg-neutral-950 rounded-lg m-1 lg:m-10 px-10 py-5 w-96">
    <TemplateSpec name="ID">{rental.token}</TemplateSpec>
    <TemplateSpec name="TYPE">{templateDetails?.name}</TemplateSpec>
    <TemplateSpec name="EXPIRES">{formatExpires(new Date(rental.expires))}</TemplateSpec>
    <TemplateSpec name="TIME LEFT"><Timer end={rental.expires}/></TemplateSpec>
    <br/>
    <ActionButton handleClick={launch}>View</ActionButton>
  </div>;
};

export default RentalCard;
