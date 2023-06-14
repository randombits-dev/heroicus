import React, {useState} from 'react';
import ExtendModal from "./ExtendModal";

interface Props {
  tokenId: string;
}

const ExtendButton = ({rental}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="bg-blue-900 px-3 py-1 lg:px-5 lg:py-2 hover:bg-blue-800 whitespace-nowrap"
      >
        Extend Server
      </button>

      {showModal && <ExtendModal rental={rental} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default ExtendButton
