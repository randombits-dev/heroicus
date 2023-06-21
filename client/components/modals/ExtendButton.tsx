import React, {useState} from 'react';
import ExtendModal from "./ExtendModal";
import {UserInfo} from "../../utils/definitions";
import ActionButton from "../common/ActionButton";

interface Props {
  rental: UserInfo;
  onExtended: () => void;
}

const ExtendButton = ({rental, onExtended}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
    onExtended();
  };

  return (
    <>
      <ActionButton handleClick={() => setShowModal(true)} additionalClasses="mt-3"
      >
        Extend Server
      </ActionButton>

      {showModal && <ExtendModal rental={rental} onClose={onClose}/>}
    </>
  );
}

export default ExtendButton
