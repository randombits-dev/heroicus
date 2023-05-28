import {useState} from "react";
import {useEstimatePrice} from "../hooks/useEstimatePrice";
import {useRent} from "../hooks/useRent";

const TemplateCard = ({templateInfo}: any) => {
  // const {address} = useAccount();
  const [hours, setHours] = useState(2);
  const {price} = useEstimatePrice(templateInfo, hours);
  const {execute, receipt, status} = useRent(templateInfo.name, String(hours));

  if (receipt) {
    return <div className="card">Successfully Rented</div>;
  } else if (status !== 'idle') {
    return <div className="card">Spinning...</div>;
  } else {
    return <div className="card">
      <div>Name: {templateInfo.name}</div>
      <div>Price per hour: {templateInfo.price} USDC</div>
      <div>{templateInfo.max}</div>
      Hours to rent: <input
      onChange={(e) => setHours(e.target.value)}
      type="number"
      value={hours}
    />
      <div>Total Price: {price}</div>

      <button onClick={execute}>Rent this server</button>
    </div>
  }

};

export default TemplateCard;
