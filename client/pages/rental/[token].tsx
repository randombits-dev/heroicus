import {useRouter} from "next/router";
import RentalPage from "../../components/rentals/RentalPage";
import dynamic from "next/dynamic";

const WalletLayout = dynamic(() => import('../../components/layout/WalletLayout'), {
  ssr: false,
})

export function Rental() {
  const router = useRouter();
  const token = Number(router.query.token);
  return (
    <WalletLayout flex={true}>
      <RentalPage token={token}/>
    </WalletLayout>
  );
}

export default dynamic(() => Promise.resolve(Rental), {
  ssr: false,
});
