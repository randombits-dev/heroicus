import {useMyRentals} from "../hooks/useMyRentals";
import RentalCard from "./RentalCard";

const MyRentals = () => {
  // const {address} = useAccount();
  // const [hours, setHours] = useState(2);
  // const {price} = useEstimatePrice(templateInfo, hours);
  // const {execute} = useRent(String(hours));

  const {rentalBalance, tokenIds, myRentals} = useMyRentals();
  
  return <div className="card">
    <div>Balance is {rentalBalance}</div>

    {/*<div>Token Ids: {tokenIds.map(item => <div>{item}</div>)}</div>*/}
    <div>My Rentals</div>
    <div>Length {myRentals?.length}</div>
    {
      myRentals?.map(rental => {
        return <RentalCard key={rental.token} rental={rental}/>
      })
    }
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
