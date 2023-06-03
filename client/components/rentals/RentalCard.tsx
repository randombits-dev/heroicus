import {useRouter} from "next/router";

const hash = crypto.randomUUID();
const RentalCard = ({rental}) => {
  const {push} = useRouter();
  const timeLeft = (rental.expires.getTime() - new Date().getTime()) / 1000 / 60;

  const launch = () => {
    void push(`/auto/${rental.token}`);
  };

  return <div className="bg-neutral-950 rounded-lg m-10 px-10 py-5">
    <div>{rental.token}</div>
    <div>Template is {rental.template}</div>
    <div>Expires {rental.expires.toISOString()}</div>
    <div>Time left: {timeLeft} mins</div>
    {
      timeLeft < 0 ? <div>Expired</div> : <div>Running</div>
    }

    <button className="bg-blue-900 px-5 py-1" onClick={launch}>Go</button>
  </div>;
};

export default RentalCard;
