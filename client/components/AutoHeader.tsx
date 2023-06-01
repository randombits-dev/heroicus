import Timer from "./Timer";
import {styled} from "goober";
import {usePauseRental} from "../hooks/usePauseRental";
import ExtendButton from "./ExtendButton";

const Container = styled('div')`
  display: flex;
`;

const formatExpires = (expires: Date) => {
  return Intl.DateTimeFormat(undefined, {dateStyle: 'short', timeStyle: 'short'}).format(expires);
}

export function AutoHeader({rental}) {
  const {execute: stopRental} = usePauseRental(rental.token);
  // const {execute: extendRental} = useExtendRental(rental.token, 1);

  return (
    <Container>
      <div>
        <div>Rental Ends at {formatExpires(rental.expires)}</div>
        <div><Timer end={rental.expires.getTime()}/></div>
      </div>
      <button className="bg-red-900 px-5 py-1 ml-5" onClick={() => {
        stopRental()
      }}>Stop Server
      </button>
      <ExtendButton tokenId={rental.token}/>
    </Container>
  );
}

export default AutoHeader
