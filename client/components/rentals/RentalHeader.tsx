import Timer from "../common/Timer";
import {styled} from "goober";
import ExtendButton from "../modals/ExtendButton";
import StopButton from "../modals/StopButton";
import {formatExpires} from "../../utils/dates";
import TemplateSpec from "../TemplateSpec";
import {useRouter} from "next/router";
import RestartButton from "../modals/RestartButton";
import {UserInfo} from "../../utils/definitions";
import {useMyRental} from "../../hooks/useMyRental";

const Container = styled('div')`
  display: flex;
  align-items: center;
`;

interface Props {
  rental: UserInfo;
  hasSigned: boolean;
}

export function RentalHeader({rental, hasSigned}: Props) {
  const {myRental, refetch} = useMyRental({token: rental.token});
  rental = myRental || rental;

  const {reload} = useRouter();

  return (
    <Container>
      <TemplateSpec name="EXPIRE DATE">{formatExpires(new Date(rental.expires))}</TemplateSpec>
      <TemplateSpec name="EXPIRE TIME"><Timer end={rental.expires} expired={reload}/></TemplateSpec>
      {hasSigned && <div className="ml-5">
        <ExtendButton rental={rental} onExtended={() => refetch()}/>
        <StopButton rental={rental}/>
        <RestartButton rental={rental}/>
      </div>}
    </Container>
  );
}

export default RentalHeader
