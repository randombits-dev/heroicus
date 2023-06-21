import React, {useState} from 'react';
import ExtendModal from "./ExtendModal";
import {UserInfo} from "../../utils/definitions";

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
      <button onClick={() => setShowModal(true)}
              className="bg-blue-900 px-3 py-1 hover:bg-blue-800 whitespace-nowrap"
      >
        Extend Server
      </button>

      {showModal && <ExtendModal rental={rental} onClose={onClose}/>}
    </>
  );
}

export default ExtendButton
