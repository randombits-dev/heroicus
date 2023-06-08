import React, {useState} from 'react';
import ConfirmModal from "./ConfirmModal";

const RestartButton = ({onConfirm}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="bg-blue-900 px-3 py-1 lg:px-5 lg:py-2 hover:bg-blue-800 whitespace-nowrap"
      >
        Restart Server
      </button>

      {showModal && <ConfirmModal title="Restart Server" text="Are you sure you want to restart this server?" yes={onConfirm}
                                  no={() => setShowModal(false)}/>}
    </>
  );
}

export default RestartButton
