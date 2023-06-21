import {TemplateInfo, UserInfo} from '../utils/definitions';
import {formatUSDC} from '../utils/numberUtils';

export const useEstimateRefund = (template: TemplateInfo | undefined, rental: UserInfo) => {
  if (template && rental) {
    const timeLeft = rental.expires - new Date().getTime() - 60000;
    const hoursLeft = timeLeft / 1000 / 3600;
    const price = (Number(formatUSDC(template.price)) * hoursLeft).toFixed(2) + ' USDC';
    return {price};
  }
  return {};
};
