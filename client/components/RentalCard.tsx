import {usePauseRental} from "../hooks/usePauseRental";

const hash = crypto.randomUUID();
const RentalCard = ({rental}) => {
  const {execute} = usePauseRental(rental.token);
  const timeLeft = (rental.expires.getTime() - new Date().getTime()) / 1000 / 60;

  // const {signMessage, data} = useSignMessage({
  //   message: 'Sign in with ID: ' + hash,
  //   onSuccess: (data) => {
  //     window.open(`/api/launch/${rental.token}?s=${data}&h=${hash}`, '_blank');
  //   }
  // });

  const launch = () => {
    window.open(`/auto/${rental.token}`, '_blank');
  };

  return <div className="card">
    <div>{rental.token}</div>
    <div>Template is {rental.template}</div>
    <div>Expires {rental.expires.toISOString()}</div>
    <div>Time left: {timeLeft} mins</div>
    {
      timeLeft < 0 ? <div>Expired</div> : <div>Running</div>
    }

    <button onClick={execute}>Pause Rental</button>
    <button onClick={launch}>Launch</button>
  </div>;
};

export default RentalCard;
