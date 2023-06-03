import React, {useState} from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";
import {useExtendRental} from "../../hooks/useExtendRental";
import {useEstimatePrice} from "../../hooks/useEstimatePrice";
import {useTemplateInfo} from "../../hooks/useTemplateInfo";

const ExtendModal = ({rental, onClose}) => {
  const [hours, setHours] = useState(2);
  const templateInfo = useTemplateInfo({templateId: rental.template});
  const {price, amount} = useEstimatePrice(templateInfo, hours);
  const {execute} = useExtendRental(rental.token, amount);
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
        <ActionButton handleClick={() => execute()}>Extend</ActionButton>
      </div>
    </Modal>
  );
}

export default ExtendModal
