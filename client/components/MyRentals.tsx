import {useMyRentals} from "../hooks/useMyRentals";
import RentalCard from "./RentalCard";

const MyRentals = () => {

  const {myRentals} = useMyRentals();

  const renderRentals = () => {
    if (myRentals?.length > 0) {
      return myRentals.map(rental => {
        return <RentalCard key={rental.token} rental={rental}/>
      })
    } else {
      return <div>None</div>;
    }
  };

  return <div className="m-10 text-center">
    <div className="text-3xl">My Rentals</div>
    <div className="flex justify-center">
      {renderRentals()}
    </div>

  </div>
};

export default MyRentals;

{/*<div>Name: {templateInfo.name}</div>*/
}
{/*<div>Price per hour: {templateInfo.price} USDC</div>*/
}
{/*<div>{templateInfo.max}</div>*/
}
{/*Hours to rent: <input*/
}
{/*onChange={(e) => setHours(e.target.value)}*/
}
{/*type="number"*/
}
{/*value={hours}*/
}
{/*/>*/
}
{/*  <div>Total Price: {price}</div>*/
}

{/*  <button onClick={execute}>Rent this server</button>*/
}
