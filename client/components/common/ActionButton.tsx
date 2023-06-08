import React, {PropsWithChildren} from 'react';

interface Props {
  handleClick: () => void;
  additionalClasses?: string;
}

export const ActionButton = ({handleClick, children, additionalClasses = ''}: PropsWithChildren<Props>) => {
  return <button className={'w-full bg-blue-900 px-10 py-3 hover:bg-blue-800 ' + additionalClasses}
                 onClick={handleClick}>{children}</button>
    ;
}

export default ActionButton
