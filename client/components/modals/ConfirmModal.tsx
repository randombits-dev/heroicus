import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";

const ConfirmModal = ({title, text, yes, no}) => {
  return (
    <Modal title={title} onClose={no}>
      <div>
        {text}
      </div>
      <div className="">
        <ActionButton handleClick={() => yes()}>Yes</ActionButton>
        <ActionButton handleClick={() => no()}>No</ActionButton>
      </div>
    </Modal>
  );
}

export default ConfirmModal
