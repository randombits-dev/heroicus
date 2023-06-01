import React, {PropsWithChildren} from 'react';

interface Props {
  handleClick: () => void;
}

const ActionButton = ({handleClick, children}: PropsWithChildren<Props>) => {
  return <button className="bg-blue-900 px-10 py-3" onClick={handleClick}>{children}</button>
    ;
}

export default ActionButton
