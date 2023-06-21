import React, {useState} from 'react';
import RestartModal from "./RestartModal";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
}

const RestartButton = ({rental}: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="bg-blue-900 px-3 py-1 lg:ml-3 hover:bg-blue-800 whitespace-nowrap"
      >
        Restart Server
      </button>

      {showModal && <RestartModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default RestartButton
