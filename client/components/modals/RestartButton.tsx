import React, {useState} from 'react';
import RestartModal from "./RestartModal";
import {UserInfo} from "../../utils/definitions";
import ActionButton from "../common/ActionButton";

interface Props {
  rental: UserInfo;
}

const RestartButton = ({rental}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ActionButton handleClick={() => setShowModal(true)} additionalClasses="mt-3"
      >
        Restart Server
      </ActionButton>

      {showModal && <RestartModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default RestartButton
