import { addCalculation } from '../../utils/number.js';

/**
 * @module benefitAmountCalculation
 * 총 혜택 금액 및 예상 지출 금액을 계산하기 위한 모듈
 */
const benefitAmountCalculation = Object.freeze({
  /**
   *
   * @param {import('../../utils/jsDoc.js').CreateBenefitAmountInfoParams} params - 혜택 정보 및 총 주문 금액이 들어있는 객체
   * @returns {import('../../utils/jsDoc.js').BenefitAmountInfo} 총 혜택 금액 및 예상 지출 금액
   */
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

export default benefitAmountCalculation;

function calculateRewardAmount(benefitInfo) {
  return Object.values(benefitInfo).reduce(addCalculation, 0);
}

function calculateExpectedPayment({ totalOrderAmount, totalRewardAmount, benefitInfo }) {
  const discountAmount = totalRewardAmount - benefitInfo.giftAmount;

  return totalOrderAmount - discountAmount;
}
