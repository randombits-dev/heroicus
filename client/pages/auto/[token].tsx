import {useRouter} from "next/router";
import {styled} from "goober";
import WalletLayout from "../../components/layout/WalletLayout";
import AutoContainer from "../../components/rentals/AutoContainer";

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

export function Auto() {
  const router = useRouter();
  const token = router.query.token as string;
  return (
    <WalletLayout>
      <AutoContainer token={token}/>
    </WalletLayout>
  );
}

export default Auto
