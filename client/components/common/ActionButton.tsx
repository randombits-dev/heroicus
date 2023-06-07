import React, {PropsWithChildren} from 'react';

interface Props {
  handleClick: () => void;
}

const ActionButton = ({handleClick, children}: PropsWithChildren<Props>) => {
  return <button className="w-full bg-blue-900 px-10 py-3 hover:bg-blue-800" onClick={handleClick}>{children}</button>
    ;
}

export default ActionButton
