import React from 'react';

interface Props {
  name: string;
  value: string;
}

const TemplateSpec = ({name, value}: Props) => {
  return (
    <div className="py-1 grid grid-cols-5 gap-3 items-center">
      <div className="ml-auto text-right text-xs font-bold">{name}</div>
      <div className="mr-auto text-left text-md col-span-4">{value || 'None'}</div>
    </div>
  );
}

export default TemplateSpec
