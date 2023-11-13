import {
  benefitCalculation,
  orderAmountCalculation,
  benefitAmountCalculation,
  eventBadgeGeneration,
} from '../domain/index.js';

const eventResultService = {
  /**
   * @param {{visitDate : number, menuInfo: [string, number][]}} params - 방문 일자 및 주문한 메뉴 정보가 담긴 객체
   * @returns {import('../utils/jsDoc.js').EventResult} 이벤트 결과
   */
  createEventResult({ visitDate, menuInfo }) {
    const totalOrderAmount = orderAmountCalculation.calculateAmount(menuInfo);
    const ordererInfo = { visitDate, totalOrderAmount, menuInfo };
    const benefitInfo = benefitCalculation.calculateBenefit(ordererInfo);

    const benefitAmountInfo = benefitAmountCalculation.createBenefitAmountInfo({
      benefitInfo,
      totalOrderAmount,
    });

    const eventBadge = eventBadgeGeneration.generateBadge(benefitAmountInfo.totalRewardAmount);

    return { totalOrderAmount, benefitAmountInfo, benefitInfo, eventBadge };
  },
};

export default eventResultService;
