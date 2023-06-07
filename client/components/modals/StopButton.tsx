import React, {useState} from 'react';
import StopModal from "./StopModal";

interface Props {
  tokenId: string;
}

const StopButton = ({rental}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="bg-red-900 px-3 py-1 lg:px-5 lg:py-2 lg:ml-5 hover:bg-red-800 whitespace-nowrap"
      >
        Stop Rental
      </button>

      {showModal && <StopModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default StopButton
