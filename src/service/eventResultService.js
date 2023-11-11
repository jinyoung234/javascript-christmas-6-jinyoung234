import benefitCalculation from '../domain/BenefitCalculation.js';
import EventBadgeGenerator from '../domain/EventBadgeGenerator.js';
import orderAmountCalculation from '../domain/OrderAmountCalculation.js';
import menuFinder from '../domain/MenuFinder.js';
import benefitAmountCalculation from '../domain/RewardCalculator.js';

const eventResultService = {
  createEventResult({ visitDate, menuInfo }) {
    const totalOrderAmount = orderAmountCalculation.calculateAmount(menuFinder, menuInfo);
    const ordererInfo = { visitDate, totalOrderAmount, menuInfo };
    const benefitInfo = benefitCalculation.calculateBenefit(ordererInfo);

    const rewardAmountInfo = benefitAmountCalculation.createRewardAmountInfo({
      benefitInfo,
      totalOrderAmount,
    });

    const eventBadge = EventBadgeGenerator.from(rewardAmountInfo.totalRewardAmount).generateBadge();

    return { totalOrderAmount, rewardAmountInfo, benefitInfo, eventBadge };
  },
};

export default eventResultService;
