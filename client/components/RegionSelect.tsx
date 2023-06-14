import React from 'react';
import {REGIONS} from "../utils/templates";

interface Props {
  regionChanged: (id: number) => void;
}

const RegionSelect = ({regionChanged}: Props) => {
  const onChange = (e: any) => {
    regionChanged(e.target.value);
  };

  return (
    <select className="bg-neutral-900 px-3 py-2" onChange={onChange}>
      {
        Object.entries(REGIONS).map(([id, name]) => <option key={id} value={id}>{name[1]}</option>)
      }
    </select>
  );
}

export default RegionSelect
