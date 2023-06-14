import {useRouter} from "next/router";
import WalletLayout from "../../components/layout/WalletLayout";
import RentalPage from "../../components/rentals/RentalPage";

export function Auto() {
  const router = useRouter();
  const token = router.query.token as string;
  return (
    <WalletLayout flex={true}>
      <RentalPage token={token}/>
    </WalletLayout>
  );
}

export default Auto
