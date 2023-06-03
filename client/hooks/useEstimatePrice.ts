import {TemplateInfo} from '../utils/templates';
import {parseEther} from 'viem';

export const useEstimatePrice = (template: TemplateInfo, hours: number) => {
  if (template) {
    const price = (template.price * hours).toFixed(2) + ' USDC';
    const amount = parseEther(String(template.price)) * BigInt(hours);
    return {price, amount};
  }
  return {};
};
