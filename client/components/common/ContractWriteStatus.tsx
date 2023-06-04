import React from 'react';
import {ContractWriteStatus} from "../../utils/definitions";

interface Props {
  status: ContractWriteStatus;
  statusMsg: string;
}

const ContractWriteStatus = ({status, statusMsg}: Props) => {
  if (status) {
    return <div className="text-center">
      <div className="spinner"></div>
      <div>{statusMsg}</div>
    </div>;
  }
}

export default ContractWriteStatus
