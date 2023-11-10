import { addCalculation } from '../validations/utils/number.js';

class RewardCalculator {
  #rewardInfo;

  #totalOrderAmount;

  constructor(rewardInfo, totalOrderAmount) {
    this.#rewardInfo = rewardInfo;
    this.#totalOrderAmount = totalOrderAmount;
  }

  static of(rewardInfo, totalOrderAmount) {
    return new RewardCalculator(rewardInfo, totalOrderAmount);
  }

  calculateRewardAmountInfo() {
    const totalRewardAmount = this.#calculateRewardAmount();
    const expectPaymentAmount = this.#calculateExpectedPayment(totalRewardAmount);

    return { totalRewardAmount, expectPaymentAmount };
  }

  #calculateRewardAmount() {
    return Object.values(this.#rewardInfo).reduce(addCalculation, 0);
  }

  #calculateExpectedPayment(totalRewardAmount) {
    return this.#totalOrderAmount - (totalRewardAmount - this.#rewardInfo.giftAmount);
  }
}

export default RewardCalculator;
