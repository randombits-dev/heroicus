import React, {PropsWithChildren} from 'react';

interface Props {
  handleClick: () => void;
  additionalClasses?: string;
  disabled?: boolean;
}

export const ActionButton = ({handleClick, children, disabled, additionalClasses = ''}: PropsWithChildren<Props>) => {
  if (!disabled) {
    return <button className={'w-full bg-blue-900 px-5 py-3 hover:bg-blue-800 ' + additionalClasses}
                   onClick={handleClick}>{children}</button>;
  } else {
    return <button disabled={true} className={'w-full bg-neutral-800 px-5 py-3 ' + additionalClasses}
                   onClick={handleClick}>{children}</button>
      ;
  }

}

export default ActionButton
