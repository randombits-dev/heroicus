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

  return <div className="bg-neutral-950 rounded-lg m-10 px-10 py-5">
    <div>{rental.token}</div>
    <div>Template is {rental.template}</div>
    <div>Expires {rental.expires.toISOString()}</div>
    <div>Time left: {timeLeft} mins</div>
    {
      timeLeft < 0 ? <div>Expired</div> : <div>Running</div>
    }

    <button className="bg-blue-900 px-5 py-1" onClick={launch}>Launch</button>
    <button className="bg-red-900 px-5 py-1 ml-5" onClick={execute}>Stop Rental</button>
  </div>;
};

export default RentalCard;
