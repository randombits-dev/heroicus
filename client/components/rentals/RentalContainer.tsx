import {useLoginToServer} from "../../hooks/useLoginToServer";
import {TEMPLATE_LIST} from "../../utils/templates";
import {useWaitForServer} from "../../hooks/useWaitForServer";
import {UserInfo} from "../../utils/definitions";
import TemplateSpec from "../TemplateSpec";
import {formatExpires} from "../../utils/dates";
import Timer from "../common/Timer";
import ActionButton from "../common/ActionButton";
import ExtendButton from "../modals/ExtendButton";
import RestartButton from "../modals/RestartButton";
import StopButton from "../modals/StopButton";
import image1 from '../../public/images/tmp5szz2naz.png';
import image2 from '../../public/images/tmpbw4bcxkf.png';
import Image from "next/image";


interface Props {
  rental: UserInfo;
  refetch: () => void;
}

export function RentalContainer({rental, refetch: refetchRental}: Props) {
  const {signMessage, ip, error, hasSigned} = useLoginToServer({token: rental.token});
  const template = TEMPLATE_LIST.find(t => t.id === rental.templateId);
  const url = ip ? template!.url(ip) : '';
  const {ready} = useWaitForServer(rental.templateId, ip);

  const use = () => {
    window.open(url, '_blank');
  };

  const renderBottom = () => {
    if (ready) {
      return <div>
        <ActionButton additionalClasses="bg-green-900 mt-10 hover:bg-green-800" handleClick={use}>Launch Server</ActionButton>
        <ExtendButton rental={rental} onExtended={() => refetchRental()}/>
        <RestartButton rental={rental}/>
        <StopButton rental={rental}/>
      </div>;
    } else if (url) {
      const message = rental.templateId.startsWith('diffusion') ? 'Stable Diffusion servers can take up to 10 minutes to start' : 'Docker servers usually take 45 seconds to start';

      return <div className="text-center mt-10">
        <div className="spinner"></div>
        <div>Starting server...</div>
        <div className="mt-5">{message}</div>
      </div>
    } else if (error) {
      return <div className="text-center mt-10">
        <div>An error occurred. Please stop server to get a refund.</div>
      </div>;
    } else {
      return <div className="text-center mt-10">
        <button className="bg-blue-900 px-20 py-5" onClick={() => signMessage()}>Sign into server</button>
      </div>;
    }
  };

  const image = rental.templateId.startsWith('diffusion') ? image1 : image2;

  return <div className="flex justify-center text-center">
    <div className="bg-neutral-950 rounded-lg m-1 lg:m-10 w-96 overflow-hidden">
      <Image src={image} alt="NFT Image" width="400" height="300"
             style={{height: '300px', width: '100%', 'objectFit': 'cover', 'objectPosition': '50% 50%', overflow: 'none'}}/>
      <div className="px-5 py-5">
        <TemplateSpec name="ID">{rental.token}</TemplateSpec>
        <TemplateSpec name="TYPE">{template?.name}</TemplateSpec>
        <TemplateSpec name="EXPIRES">{formatExpires(new Date(rental.expires))}</TemplateSpec>
        <TemplateSpec name="TIME LEFT"><Timer end={rental.expires}/></TemplateSpec>
        {renderBottom()}
      </div>
    </div>
  </div>;
}

export default RentalContainer
