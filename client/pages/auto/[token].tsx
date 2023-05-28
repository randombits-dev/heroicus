import {useState} from "react";
import AutoFrame from "../../components/AutoFrame";
import {useSignMessage} from "wagmi";
import {hashMessage} from "viem";
import {useRouter} from "next/router";
import {useMyRental} from "../../hooks/useMyRental";
import {styled} from "goober";
import Timer from "../../components/Timer";

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;
const Header = styled('div')`
  flex: 0 0 auto;
`;
const Content = styled('div')`
  flex: 1 1 auto;
`;

export function Auto() {
  const router = useRouter();
  const token = router.query.token as string;
  const hash = hashMessage(token);
  const [autoUrl, setAutoUrl] = useState('');
  const [error, setError] = useState(false);

  const {myRental} = useMyRental({token});
  const timeLeft = myRental && (myRental.expires.getTime() - new Date().getTime()) / 1000 / 60;

  const {signMessage, data} = useSignMessage({
    message: 'Sign in with ID: ' + hash,
    onSuccess: (data) => {
      fetch(`/api/opentest`, {
        method: 'POST',
        body: JSON.stringify({
          token,
          s: data
        })
      }).then(res => res.json()).then(data => {
        if (data.ip) {
          setAutoUrl(data.ip);
        }
      }).catch(() => {
        setError(true);
      });
    }
  });

  return (
    <Container>
      <Header>
        <div>Expires {myRental?.expires.toISOString()}</div>
        <Timer end={myRental?.expires.getTime()}/>
        {
          timeLeft < 0 ? <div>Expired</div> : <div>Running</div>
        }

        {/*<button onClick={execute}>Pause Rental</button>*/}
      </Header>
      <Content> <AutoFrame url={autoUrl} error={error} login={() => signMessage()}/>
      </Content>
    </Container>
  );
}

export default Auto
