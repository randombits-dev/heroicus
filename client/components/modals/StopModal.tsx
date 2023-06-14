import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";
import {usePauseRental} from "../../hooks/usePauseRental";
import {useTemplateInfo} from "../../hooks/useTemplateInfo";
import {useEstimateRefund} from "../../hooks/useEstimateRefund";
import ContractWriteStatus from "../common/ContractWriteStatus";
import Timer from "../common/Timer";
import TemplateSpec from "../TemplateSpec";

const StopModal = ({rental, onClose}) => {
  const {execute, status, statusMsg} = usePauseRental(rental.token);
  const templateInfo = useTemplateInfo({templateId: rental.template});
  const {price} = useEstimateRefund(templateInfo, rental);

  if (status) {
    return <Modal title="Terminate Rental" showClose={false}>
      <ContractWriteStatus status={status} statusMsg={statusMsg}/>
    </Modal>
  } else {
    return (
      <Modal title="Terminate Server" onClose={onClose}>
        <TemplateSpec name="TIME LEFT"><Timer end={rental.expires.getTime()}/></TemplateSpec>
        <TemplateSpec name="ESTIMATED REFUND">{price}</TemplateSpec>
        <div>
          <ActionButton handleClick={() => execute()}>Terminate</ActionButton>
        </div>
      </Modal>
    );
  }
}

export default StopModal
