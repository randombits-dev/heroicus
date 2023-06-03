import AutoFrame from "../../components/rentals/AutoFrame";
import {useRouter} from "next/router";
import {useMyRental} from "../../hooks/useMyRental";
import {styled} from "goober";
import {useAccount} from "wagmi";
import AutoHeader from "../../components/rentals/AutoHeader";

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Header = styled('div')`
  flex: 0 0 auto;
  padding: 40px 20px;
  border-bottom: 1px solid black;
`;
const Content = styled('div')`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export function Auto() {
  const {address} = useAccount();
  const router = useRouter();
  const token = router.query.token as string;

  const {myRental} = useMyRental({token});

  if (!myRental) {
    return <div>Loading rental...</div>;
  }

  if (myRental.user !== address) {
    return <div>You do not own this rental</div>;
  }

  if (myRental.expired) {
    return <div>Rental is expired</div>;
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
