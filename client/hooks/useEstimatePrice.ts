import {TemplateInfo} from '../utils/definitions';
import {formatUSDC} from '../utils/numberUtils';

export const useEstimatePrice = (template: TemplateInfo | undefined, hours: number) => {
  if (template) {
    const amount = template.price * BigInt(hours);
    const price = formatUSDC(amount);
    return {price, amount};
  }
  return {};
};
