import benefitCalculation from '../domain/BenefitCalculation.js';
import orderAmountCalculation from '../domain/OrderAmountCalculation.js';
import menuFinder from '../domain/MenuFinder.js';
import benefitAmountCalculation from '../domain/BenefitAmountCalculation.js';
import eventBadgeGeneration from '../domain/EventBadgeGeneration.js';

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
