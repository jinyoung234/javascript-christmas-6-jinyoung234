import { addCalculation } from '../validations/utils/number.js';

const benefitAmountCalculation = Object.freeze({
  createRewardAmountInfo({ benefitInfo, totalOrderAmount }) {
    const totalRewardAmount = calculateRewardAmount(benefitInfo);
    const expectPaymentAmount = calculateExpectedPayment({
      benefitInfo,
      totalRewardAmount,
      totalOrderAmount,
    });

    return { totalRewardAmount, expectPaymentAmount };
  },
});

function calculateRewardAmount(benefitInfo) {
  return Object.values(benefitInfo).reduce(addCalculation, 0);
}

function calculateExpectedPayment({ totalOrderAmount, totalRewardAmount, benefitInfo }) {
  return totalOrderAmount - (totalRewardAmount - benefitInfo.giftAmount);
}

export default benefitAmountCalculation;
