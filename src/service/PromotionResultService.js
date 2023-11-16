import {
  PromotionReceipt,
  OrderMenuAmount,
  EventBadgeMaker,
  DecemberPromotionPlan,
} from '../domain/index.js';

const PromotionResultService = {
  /**
   * @param {{visitDate : number, orderMenuInfo: [string, number][]}} params - 방문 일자 및 주문한 메뉴 정보가 담긴 객체
   * @returns {import('../utils/jsDoc.js').PromotionResult} 이벤트 결과
   */
  createPromotionResult({ visitDate, orderMenuInfo }) {
    const totalOrderAmount = OrderMenuAmount.calculateTotal(orderMenuInfo);
    const ordererInfo = { visitDate, totalOrderAmount, orderMenuInfo };

    const promotionBenefitResult = DecemberPromotionPlan.execute(ordererInfo);

    const promotionReceipt = PromotionReceipt.issue({
      promotionBenefitResult,
      totalOrderAmount,
    });

    const eventBadge = EventBadgeMaker.createByBenefitAmount(promotionReceipt.totalBenefitAmount);

    return { totalOrderAmount, promotionReceipt, promotionBenefitResult, eventBadge };
  },
};

export default PromotionResultService;
