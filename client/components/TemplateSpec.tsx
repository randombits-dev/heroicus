import React, {PropsWithChildren} from 'react';

interface Props {
  name: string;
}

const TemplateSpec = ({name, children}: PropsWithChildren<Props>) => {
  return (
    <div className="py-1 grid grid-cols-3 gap-5 items-center">
      <div className="ml-auto text-right text-xs font-bold">{name}</div>
      <div className="mr-auto text-left text-md col-span-2">{children || 'None'}</div>
    </div>
  );
}

export default TemplateSpec
