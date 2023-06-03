import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";
import {usePauseRental} from "../../hooks/usePauseRental";
import {useTemplateInfo} from "../../hooks/useTemplateInfo";
import {useEstimateRefund} from "../../hooks/useEstimateRefund";
import ContractWriteStatus from "../common/ContractWriteStatus";

const StopModal = ({rental, onClose}) => {
  const {execute, status, statusMsg} = usePauseRental(rental.token);
  const templateInfo = useTemplateInfo({templateId: rental.template});
  const {price} = useEstimateRefund(templateInfo, rental);

  // if (executing) {
  //   return (
  //     <Modal title="Terminate Rental" showClose={false}>
  //       <div className="spinner"></div>
  //     </Modal>
  //   );
  // } else {
  return (
    <Modal title="Terminate Rental" onClose={onClose}>
      <div>
        Estimated Refund: {price}
      </div>
      <div>
        <ActionButton handleClick={() => execute()}>Terminate</ActionButton>
      </div>
      <div>
        <ContractWriteStatus status={status} statusMsg={statusMsg}/>
      </div>
    </Modal>
  );
  // }
}

export default StopModal
