import React, {useState} from 'react';
import StopModal from "./StopModal";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
}

const StopButton = ({rental}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="bg-red-900 px-3 py-1 lg:px-5 lg:py-2 lg:ml-5 hover:bg-red-800 whitespace-nowrap"
      >
        Terminate Server
      </button>

      {showModal && <StopModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default StopButton
