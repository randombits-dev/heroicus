import RentalFrame from "./RentalFrame";
import RentalHeader from "./RentalHeader";
import {useLoginToServer} from "../../hooks/useLoginToServer";
import {TEMPLATE_LIST} from "../../utils/templates";
import {useWaitForServer} from "../../hooks/useWaitForServer";

export function RentalContainer({rental}) {
  const {signMessage, ip, error, hasSigned} = useLoginToServer({token: rental.token});
  const template = TEMPLATE_LIST.find(t => t.id === rental.template);
  const url = ip ? template.url(ip) : '';
  const {ready, retry} = useWaitForServer(url);
  return (
    <div className="flex flex-col h-full flex-1">
      <div className="py-5 px-10 border-b">
        <RentalHeader rental={rental} ready={ready} handleRestart={retry} hasSigned={hasSigned}/>
      </div>
      <div className="flex-1 flex items-center mx-auto">
        <RentalFrame ready={ready} url={url} error={error} signMessage={signMessage}/>
      </div>
    </div>
  );
}

export default RentalContainer
