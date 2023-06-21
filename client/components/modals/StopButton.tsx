import React, {useState} from 'react';
import StopModal from "./StopModal";
import {UserInfo} from "../../utils/definitions";
import ActionButton from "../common/ActionButton";

interface Props {
  rental: UserInfo;
}

const StopButton = ({rental}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ActionButton handleClick={() => setShowModal(true)} additionalClasses="bg-red-900 mt-3 hover:bg-red-800"
      >
        Terminate Server
      </ActionButton>

      {showModal && <StopModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default StopButton
