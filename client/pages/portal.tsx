import {AvailableRentals} from "../components/AvailableRentals";
import MyRentals from "../components/rentals/MyRentals";
import WalletLayout from "../components/layout/WalletLayout";
import dynamic from "next/dynamic";

export function Portal() {
  return <WalletLayout>
    <MyRentals/>
    <AvailableRentals/>
  </WalletLayout>;
}

export default dynamic(() => Promise.resolve(Portal), {
  ssr: false,
});
