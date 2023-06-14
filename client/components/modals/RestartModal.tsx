import React, {useState} from 'react';
import Modal from "../common/Modal";
import {useServerSignature} from "../../hooks/useServerSignature";
import {useRouter} from "next/router";
import ConfirmModal from "./ConfirmModal";
import {UserInfo} from "../../utils/definitions";

interface Props {
  rental: UserInfo;
  onClose: () => void;
}

const RestartModal = ({rental, onClose}: Props) => {
  const [restarting, setRestarting] = useState(false);
  const {signature} = useServerSignature({token: rental.token});
  const {reload} = useRouter();

  const restart = () => {
    setRestarting(true);
    fetch('/api/restart', {
      method: 'POST',
      body: JSON.stringify({token: rental.token, s: signature})
    }).then(() => {
      setTimeout(() => {
        void reload();
      }, 5000);
    });
  };

  if (restarting) {
    return <Modal title="Restart Server" showClose={false}>
      <div className="text-center">
        <div className="spinner"></div>
        <div>Restarting</div>
      </div>
    </Modal>
  } else {
    return <ConfirmModal title="Restart Server" text="Are you sure you want to restart this server?" yes={restart}
                         no={onClose}/>
  }
}

export default RestartModal
