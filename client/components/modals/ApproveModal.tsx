import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";

const ApproveModal = ({rental, onClose}) => {
  return (
    <Modal title="Rent" onClose={onClose}>
      <div>
        <div>Total Price: {''}</div>
      </div>
      <div className="">
        <ActionButton handleClick={() => {
        }}>Extend</ActionButton>
      </div>
    </Modal>
  );
}

export default ApproveModal
