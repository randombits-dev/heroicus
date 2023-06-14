import {formatEther} from 'viem';
import {TemplateInfo} from '../utils/definitions';

export const useEstimatePrice = (template: TemplateInfo | undefined, hours: number) => {
  if (template) {
    const amount = template.price * BigInt(hours);
    const price = formatEther(amount);
    return {price, amount};
  }
  return {};
};
