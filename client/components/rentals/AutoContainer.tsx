import AutoFrame from "../../components/rentals/AutoFrame";
import {useMyRental} from "../../hooks/useMyRental";
import {styled} from "goober";
import {useAccount} from "wagmi";
import AutoHeader from "../../components/rentals/AutoHeader";

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

export function Auto({token}) {
  const {address} = useAccount();

  const {myRental} = useMyRental({token});

  if (!myRental) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl">Rental is expired</div>
    </div>;
  }

  if (myRental.user !== address) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl">Rental is expired</div>
    </div>;
  }

  if (myRental.expired) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl">Rental is expired</div>
    </div>;
  }

  return (
    <Container>
      <Header>
        <AutoHeader rental={myRental}/>
      </Header>
      <Content> <AutoFrame token={token}/>
      </Content>
    </Container>
  );
}

export default Auto
