import {TemplateInfo} from '../utils/definitions';
import {useTemplateList} from './useTemplateList';

export const useTemplateInfo = ({templateId}): TemplateInfo => {
  const templateList = useTemplateList();

  if (templateList.length > 0) {
    return templateList.find(t => t.name === templateId);
  }
  return null;
};
