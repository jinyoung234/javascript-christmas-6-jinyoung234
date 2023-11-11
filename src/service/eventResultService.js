import AmountCalculator from '../domain/AmountCalculator.js';
import EventReward from '../domain/EventReward.js';
import EventBadgeGenerator from '../domain/EventBadgeGenerator.js';
import RewardCalculator from '../domain/RewardCalculator.js';

const eventResultService = {
  createEventResult({ visitDate, menuInfo }) {
    const totalOrderAmount = AmountCalculator.from(menuInfo).calculateAmount();
    const rewardInfo = EventReward.from({ visitDate, menuInfo, totalOrderAmount }).createReward();
    const rewardCalculator = RewardCalculator.of(rewardInfo, totalOrderAmount);
    const rewardAmountInfo = rewardCalculator.calculateRewardAmountInfo();
    const eventBadge = EventBadgeGenerator.from(rewardAmountInfo.totalRewardAmount).generateBadge();

    return { totalOrderAmount, rewardAmountInfo, rewardInfo, eventBadge };
  },
};

export default eventResultService;
