import React, {useState} from 'react';
import ExtendModal from "./ExtendModal";

interface Props {
  tokenId: string;
}

const ExtendButton = ({tokenId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Toggle modal
      </button>

      {showModal && <ExtendModal tokenId={tokenId} onClose={() => setShowModal(false)}/>}
    </>
  );
}

export default ExtendButton
