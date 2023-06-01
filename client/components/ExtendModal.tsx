import React, {useState} from 'react';
import ActionButton from "./ActionButton";
import Modal from "./Modal";
import {useExtendRental} from "../hooks/useExtendRental";

const ExtendModal = ({tokenId, onClose}) => {
  const [hours, setHours] = useState(2);
  // const {price} = useEstimatePrice(templateInfo, hours);
  const {execute} = useExtendRental(tokenId, 0);
  return (
    <Modal title="Extend Rental" onClose={onClose}>
      <div>
        <input className="bg-neutral-900 w-20 px-1 outline-0"
               onChange={(e) => setHours(e.target.value)}
               type="number"
               value={hours}
        /> hours
        <div>Total Price: {''}</div>
      </div>
      <div className="">
        <ActionButton handleClick={() => {
        }}>Extend</ActionButton>
      </div>
    </Modal>
  );
}

export default ExtendModal
