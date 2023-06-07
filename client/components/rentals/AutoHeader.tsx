import Timer from "../common/Timer";
import {styled} from "goober";
import ExtendButton from "../modals/ExtendButton";
import StopButton from "../modals/StopButton";
import {formatExpires} from "../../utils/dates";
import TemplateSpec from "../TemplateSpec";
import {useRouter} from "next/router";
import ActionButton from "../common/ActionButton";

const Container = styled('div')`
  display: flex;
  align-items: center;
`;

export function AutoHeader({rental}) {
  // const {execute: stopRental} = usePauseRental(rental.token);
  // const {execute: extendRental} = useExtendRental(rental.token, 1);

  const {reload} = useRouter();

  const restart = () => {
    fetch('/api/restart', {
      method: 'POST',
      body: JSON.stringify({token: tokenId})
    }).then(() => {
      void push('/');
    });
  };

  return (
    <Container>
      <TemplateSpec name="EXPIRE DATE">{formatExpires(rental.expires)}</TemplateSpec>
      <TemplateSpec name="EXPIRE TIME"><Timer end={rental.expires.getTime()} expired={reload}/></TemplateSpec>
      <div>
        <ExtendButton rental={rental}/>
        <StopButton rental={rental}/>
        <ActionButton handleClick={restart}>Restart Server</ActionButton>
      </div>
    </Container>
  );
}

export default AutoHeader
