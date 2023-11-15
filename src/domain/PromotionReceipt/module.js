import { addCalculation } from '../../utils/number.js';

/**
 * @module PromotionReceipt
 * 총 혜택 금액 및 예상 지출 금액을 묶어 프로모션 결과에 대한 영수증을 표현한 모듈
 */
const PromotionReceipt = Object.freeze({
  /**
   *
   * @param {{promotionBenefitResult : import('../../utils/jsDoc.js').PromotionBenefitResult, totalOrderAmount : number}} params - 혜택 정보 및 총 주문 금액이 들어있는 객체
   * @returns {import('../../utils/jsDoc.js').PromotionReceipt} 총 혜택 금액 및 예상 지출 금액
   */
  issue({ promotionBenefitResult, totalOrderAmount }) {
    const totalBenefitAmount = calculateBenefitAmount(promotionBenefitResult);
    const expectPaymentAmount = calculateExpectedPayment({
      promotionBenefitResult,
      totalBenefitAmount,
      totalOrderAmount,
    });

    return { totalBenefitAmount, expectPaymentAmount };
  },
});

export default PromotionReceipt;

/**
 * @param {import('../../utils/jsDoc.js').PromotionBenefitResult} promotionBenefitResult - 혜택 결과
 * @returns {number} 총 혜택 금액
 */
function calculateBenefitAmount(promotionBenefitResult) {
  return Object.values(promotionBenefitResult).reduce(addCalculation, 0);
}

/**
 *
 * @param {{totalOrderAmount : number, promotionBenefitResult : import('../../utils/jsDoc.js').PromotionBenefitResult, totalBenefitAmount : number}} params - 함수 실행에 필요한 매개변수들
 * @returns {number} 예상 지출 금액
 */
function calculateExpectedPayment({
  totalOrderAmount,
  totalBenefitAmount,
  promotionBenefitResult,
}) {
  const benefitAmount = totalBenefitAmount - promotionBenefitResult.giftAmount;

  return totalOrderAmount - benefitAmount;
}
