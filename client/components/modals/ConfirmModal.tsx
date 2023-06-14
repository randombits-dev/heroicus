import React from 'react';
import ActionButton from "../common/ActionButton";
import Modal from "../common/Modal";

interface Props {
  title: string;
  text: string;
  yes: () => void;
  no: () => void;
}

const ConfirmModal = ({title, text, yes, no}: Props) => {
  return (
    <Modal title={title} onClose={no}>
      <div>
        {text}
      </div>
      <div className="flex gap-5">
        <ActionButton handleClick={() => yes()}>Yes</ActionButton>
        <ActionButton handleClick={() => no()}>No</ActionButton>
      </div>
    </Modal>
  );
}

export default ConfirmModal
