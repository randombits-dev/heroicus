import RentalFrame from "./RentalFrame";
import {styled} from "goober";
import RentalHeader from "./RentalHeader";
import {useLoginToServer} from "../../hooks/useLoginToServer";
import {TEMPLATE_LIST} from "../../utils/templates";
import {useWaitForServer} from "../../hooks/useWaitForServer";

const Container = styled('div')`
  display: flex;
  height: 100%;
  flex-direction: column;
`;
const Header = styled('div')`
  flex: 0 0 auto;
  padding: 10px 20px;
  border-bottom: 1px solid black;
`;
const Content = styled('div')`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export function RentalContainer({rental}) {
  const {signMessage, ip, error, hasSigned} = useLoginToServer({token: rental.token});
  const template = TEMPLATE_LIST.find(t => t.id === rental.template);
  const url = ip ? template.url(ip) : '';
  const {ready, retry} = useWaitForServer(url);
  return (
    <Container>
      <Header>
        <RentalHeader rental={rental} ready={ready} handleRestart={retry} hasSigned={hasSigned}/>
      </Header>
      <Content>
        <RentalFrame ready={ready} url={url} error={error} signMessage={signMessage}/>
      </Content>
    </Container>
  );
}

export default RentalContainer
