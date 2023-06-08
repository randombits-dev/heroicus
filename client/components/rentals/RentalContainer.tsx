import AutoFrame from "../../components/rentals/AutoFrame";
import {styled} from "goober";
import AutoHeader from "../../components/rentals/AutoHeader";
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
  const {signMessage, ip, error} = useLoginToServer({token: rental.token});
  const template = TEMPLATE_LIST.find(t => t.id === rental.template);
  const url = template.url(ip);
  const {ready, retry} = useWaitForServer(url);
  return (
    <Container>
      <Header>
        <AutoHeader rental={rental} ready={ready} handleRestart={retry}/>
      </Header>
      <Content>
        <AutoFrame ready={ready} url={url} error={error} signMessage={signMessage}/>
      </Content>
    </Container>
  );
}

export default RentalContainer
