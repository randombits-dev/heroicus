import React from 'react';
import {useTemplateList} from "../../hooks/useTemplateList";
import TemplateAdmin from "./TemplateAdmin";

const AdminHome = () => {
  const templateInfo = useTemplateList();

  return (
    <div className="text-center m-10">
      <div className="text-3xl">Available Rentals</div>
      <div className="flex justify-center">
        {
          templateInfo.map(template => {
            return <TemplateAdmin key={template.name} templateInfo={template}/>;
          })}
      </div>
    </div>
  )
}

export default AdminHome
