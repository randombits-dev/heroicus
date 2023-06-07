import {useMyRentals} from "../../hooks/useMyRentals";
import RentalCard from "./RentalCard";

const MyRentals = () => {

  const {myRentals} = useMyRentals();

  const renderRentals = () => {
    if (myRentals?.length > 0) {
      return myRentals.map(rental => {
        return <RentalCard key={rental.token} rental={rental}/>
      })
    } else {
      return <div>-- None --</div>;
    }
  };

  return <div className="m-10 text-center">
    <div className="text-3xl mb-5">My Rentals</div>
    <div className="flex justify-center flex-wrap">
      {renderRentals()}
    </div>

  </div>
};

export default MyRentals;
