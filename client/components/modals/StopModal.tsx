import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";
import {usePauseRental} from "../../hooks/usePauseRental";
import {useTemplateInfo} from "../../hooks/useTemplateInfo";
import {useEstimateRefund} from "../../hooks/useEstimateRefund";
import ContractWriteStatus from "../common/ContractWriteStatus";
import Timer from "../common/Timer";
import TemplateSpec from "../TemplateSpec";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
  onClose: () => void;
}

const StopModal = ({rental, onClose}: Props) => {
  const {execute, status, statusMsg} = usePauseRental(rental.token, rental.region);
  const templateInfo = useTemplateInfo({templateId: rental.templateId});
  const {price} = useEstimateRefund(templateInfo, rental);

  if (status) {
    return <Modal title="Terminate Rental" showClose={false}>
      <ContractWriteStatus status={status} statusMsg={statusMsg}/>
    </Modal>
  } else {
    return (
      <Modal title="Terminate Server" onClose={onClose}>
        <TemplateSpec name="TIME LEFT"><Timer end={rental.expires}/></TemplateSpec>
        <TemplateSpec name="ESTIMATED REFUND">{price}</TemplateSpec>
        <div>
          <ActionButton handleClick={() => execute()}>Terminate</ActionButton>
        </div>
      </Modal>
    );
  }
}

export default StopModal
