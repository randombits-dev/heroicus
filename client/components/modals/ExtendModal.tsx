import React, {useState} from 'react';
import Modal from "../common/Modal";
import {useExtendRental} from "../../hooks/useExtendRental";
import {useEstimatePrice} from "../../hooks/useEstimatePrice";
import {useTemplateInfo} from "../../hooks/useTemplateInfo";
import TemplateSpec from "../TemplateSpec";
import ContractWriteStatus from "../common/ContractWriteStatus";
import ActionButton from "../common/ActionButton";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
  onClose: () => void;
}

const ExtendModal = ({rental, onClose}: Props) => {
  const [hours, setHours] = useState(2);
  const [error, setError] = useState('');

  const templateInfo = useTemplateInfo({templateId: rental.templateId});
  const {price, amount} = useEstimatePrice(templateInfo, hours);
  const {
    execute,
    status,
    statusMsg,
    enough,
    executeAllowance,
    statusAllowance,
    statusMsgAllowance,
    prepareError
  } = useExtendRental(rental.token, amount || BigInt(0));

  const updateHours = (e: any) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setHours(value);
      const timeRemaining = rental.expires - new Date().getTime();
      const hoursRemaining = timeRemaining / (1000 * 60 * 60);
      const newExpires = Number(value) + hoursRemaining;
      if (!value || value == 0) {
        setError('Minimum time is 1 hour');
      } else if (newExpires > 30 * 24) {
        setError('Maximum time is 30 days')
      } else {
        setError('');
      }
    }
  };

  const writeButton = () => {
    if (error) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">{error}</button>;
    } else if (prepareError) {
      return <button className="bg-neutral-800 px-10 py-3 w-full mt-5">Hours are invalid</button>;
    } else if (enough) {
      return <button className="bg-blue-900 px-10 py-3 w-full mt-5" onClick={() => execute()}>Pay {price} USDC</button>;
    } else {
      return <button className="bg-blue-900 px-10 py-3 w-full mt-5" onClick={() => executeAllowance()}>Approve {price} USDC</button>;
    }
  };

  const writeContents = () => {
    if (status === 'success') {
      return <div>
        <div className="mb-5">Successfully Extended</div>
        <ActionButton handleClick={onClose}>Done</ActionButton>
      </div>
    } else if (status) {
      return <ContractWriteStatus status={status} statusMsg={statusMsg}/>
    } else if (!enough && statusAllowance) {
      return <ContractWriteStatus status={statusAllowance} statusMsg={statusMsgAllowance}/>
    } else {
      return <div>
        <TemplateSpec name="HOURS"><input className="bg-neutral-900 w-20 px-5 py-1 outline-0"
                                          onChange={updateHours}
                                          type="text"
                                          value={hours}
        /></TemplateSpec>
        <TemplateSpec name="TOTAL">{price} USDC</TemplateSpec>
        {
          writeButton()
        }
      </div>
    }
  };

  return (
    <Modal title="Extend Server" onClose={onClose}>
      {
        writeContents()
      }
    </Modal>
  );
}

export default ExtendModal
