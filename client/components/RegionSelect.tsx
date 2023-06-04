import React from 'react';
import {REGIONS} from "../utils/templates";

interface Props {
  regionChanged: (id) => void;
}

const RegionSelect = ({regionChanged}: Props) => {
  const onChange = (e) => {
    regionChanged(e.target.value);
  };

  return (
    <select className="bg-neutral-950" onChange={onChange}>
      {
        Object.entries(REGIONS).map(([id, name]) => <option key={id} value={id}>{name}</option>)
      }
    </select>
  );
}

export default RegionSelect
