import {TemplateInfo} from '../utils/templates';

export const useEstimatePrice = (template: TemplateInfo, hours: number) => {
  if (template) {
    const price = (template.price * hours).toFixed(2) + ' USDC';
    return {price};
  }
  return {};
};
