import { addCalculation } from '../validations/utils/number.js';

const benefitAmountCalculation = Object.freeze({
  createBenefitAmountInfo({ benefitInfo, totalOrderAmount }) {
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
  const discountAmount = totalRewardAmount - benefitInfo.giftAmount;

  return totalOrderAmount - discountAmount;
}

export default benefitAmountCalculation;
