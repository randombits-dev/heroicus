import Timer from "../common/Timer";
import {styled} from "goober";
import ExtendButton from "../modals/ExtendButton";
import StopButton from "../modals/StopButton";

const Container = styled('div')`
  display: flex;
`;

const formatExpires = (expires: Date) => {
  return Intl.DateTimeFormat(undefined, {dateStyle: 'short', timeStyle: 'short'}).format(expires);
}

export function AutoHeader({rental}) {
  // const {execute: stopRental} = usePauseRental(rental.token);
  // const {execute: extendRental} = useExtendRental(rental.token, 1);

  return (
    <Container>
      <div>
        <div>Rental Ends at {formatExpires(rental.expires)}</div>
        <div><Timer end={rental.expires.getTime()}/></div>
      </div>
      <StopButton rental={rental}/>
      <ExtendButton rental={rental}/>
    </Container>
  );
}

export default AutoHeader
