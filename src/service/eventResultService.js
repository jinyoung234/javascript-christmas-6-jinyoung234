import {
  benefitCalculation,
  orderAmountCalculation,
  menuFinder,
  benefitAmountCalculation,
  eventBadgeGeneration,
} from '../domain/index.js';

const eventResultService = {
  createEventResult({ visitDate, menuInfo }) {
    const totalOrderAmount = orderAmountCalculation.calculateAmount(menuFinder, menuInfo);
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
