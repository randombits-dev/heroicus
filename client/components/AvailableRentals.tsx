'use client'

import {useTemplateList} from "../hooks/useTemplateList";
import TemplateCard from "./TemplateCard";

export function AvailableRentals() {
  const templateInfo = useTemplateList();

  return (
    <div className="text-center p-10">
      <div className="text-3xl mb-5">Available Rentals</div>
      <div className="flex flex-wrap justify-center">
        {
          templateInfo.map(template => {
            return <TemplateCard key={template.name} templateInfo={template}/>;
          })}
      </div>
    </div>
  )
}
