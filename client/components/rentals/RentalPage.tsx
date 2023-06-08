import {useMyRental} from "../../hooks/useMyRental";
import {useAccount} from "wagmi";
import RentalContainer from "./RentalContainer";

export function RentalPage({token}) {
  const {address} = useAccount();

  const {myRental} = useMyRental({token});

  if (!myRental) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl"></div>
    </div>;
  }

  if (myRental.user !== address) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl">You do not own this rental</div>
    </div>;
  }

  if (myRental.expired) {
    return <div className="h-full flex">
      <div className="m-auto text-4xl">Rental is expired</div>
    </div>;
  }

  return <RentalContainer rental={myRental}/>
}

export default RentalPage
