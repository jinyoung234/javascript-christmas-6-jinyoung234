import {
  PromotionReceipt,
  OrderTotalAmount,
  EventBadge,
  PromotionBenefitResult,
} from '../domain/index.js';

const PromotionResultService = {
  /**
   * @param {{visitDate : number, menuInfo: [string, number][]}} params - 방문 일자 및 주문한 메뉴 정보가 담긴 객체
   * @returns {import('../utils/jsDoc.js').PromotionResult} 이벤트 결과
   */
  createPromotionResult({ visitDate, menuInfo }) {
    const totalOrderAmount = OrderTotalAmount.calculate(menuInfo);
    const ordererInfo = { visitDate, totalOrderAmount, menuInfo };

    const promotionBenefitResult = PromotionBenefitResult.receive(ordererInfo);
    const promotionReceipt = PromotionReceipt.receive({
      promotionBenefitResult,
      totalOrderAmount,
    });

    const eventBadge = EventBadge.generate(promotionReceipt.totalBenefitAmount);

    return { totalOrderAmount, promotionReceipt, promotionBenefitResult, eventBadge };
  },
};

export default PromotionResultService;
