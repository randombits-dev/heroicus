import React from 'react';

interface Props {
  key: string;
}

const ContractWriteStatus = ({status, statusMsg}) => {
  if (status) {
    return <div className="text-center">
      <div className="spinner"></div>
      <div>{statusMsg}</div>
    </div>;
  }
}

export default ContractWriteStatus
