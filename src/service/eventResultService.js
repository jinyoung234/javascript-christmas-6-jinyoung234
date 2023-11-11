import benefitCalculation from '../domain/BenefitCalculation.js';
import EventBadgeGenerator from '../domain/EventBadgeGenerator.js';
import RewardCalculator from '../domain/RewardCalculator.js';
import orderAmountCalculation from '../domain/OrderAmountCalculation.js';
import menuFinder from '../domain/MenuFinder.js';

const eventResultService = {
  createEventResult({ visitDate, menuInfo }) {
    const totalOrderAmount = orderAmountCalculation.calculateAmount(menuFinder, menuInfo);
    const rewardInfoParams = { visitDate, totalOrderAmount, menuInfo };
    const rewardInfo = benefitCalculation.calculateBenefit(rewardInfoParams);

    const rewardCalculator = RewardCalculator.of(rewardInfo, totalOrderAmount);
    const rewardAmountInfo = rewardCalculator.calculateRewardAmountInfo();

    const eventBadge = EventBadgeGenerator.from(rewardAmountInfo.totalRewardAmount).generateBadge();

    return { totalOrderAmount, rewardAmountInfo, rewardInfo, eventBadge };
  },
};

export default eventResultService;
