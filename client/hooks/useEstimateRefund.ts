import {formatEther} from 'viem';
import {TemplateInfo, UserInfo} from '../utils/definitions';

export const useEstimateRefund = (template: TemplateInfo | undefined, rental: UserInfo) => {
  if (template && rental) {
    const timeLeft = rental.expires - new Date().getTime() - 60000;
    const hoursLeft = timeLeft / 1000 / 3600;
    // const amount = parseEther(String(template.price)) * BigInt(timeLeft) / BigInt(1000) / BigInt(3600);
    const price = (Number(formatEther(template.price)) * hoursLeft).toFixed(2) + ' USDC';
    return {price};
  }
  return {};
};
