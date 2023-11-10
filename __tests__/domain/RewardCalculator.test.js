import RewardCalculator from '../../src/domain/RewardCalculator.js';

const createRewardAmountInfo = (rewardInfo, totalOrderAmount) => {
  const rewardCalculator = RewardCalculator.of(rewardInfo, totalOrderAmount);
  return rewardCalculator.calculateRewardAmountInfo();
};

describe('RewardCalculator 보상 계산 테스트', () => {
  describe('보상 총액 계산', () => {
    test.each([
      {
        rewardInfo: {
          xmasDiscountAmount: 1200,
          weekDayDiscountAmount: 0,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedTotalRewardAmount: 27200,
      },
      {
        rewardInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: 2000,
          specialDiscountAmount: 0,
          giftAmount: 15000,
        },
        totalOrderAmount: 80000,
        expectedTotalRewardAmount: 17000,
      },
    ])(
      '보상 총액은 $expectedTotalRewardAmount원 이다.',
      ({ rewardInfo, totalOrderAmount, expectedTotalRewardAmount }) => {
        // given - when
        const { totalRewardAmount } = createRewardAmountInfo(rewardInfo, totalOrderAmount);

        // then
        expect(totalRewardAmount).toBe(expectedTotalRewardAmount);
      },
    );
  });

  describe('예상 결제 금액 계산', () => {
    test.each([
      {
        rewardInfo: {
          xmasDiscountAmount: 1200,
          weekDayDiscountAmount: 0,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedExpectPaymentAmount: 97800,
      },
      {
        rewardInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: 2000,
          specialDiscountAmount: 0,
          giftAmount: 15000,
        },
        totalOrderAmount: 80000,
        expectedExpectPaymentAmount: 78000,
      },
    ])(
      '예상 결제 금액은 $expectedExpectPaymentAmount원 이다.',
      ({ rewardInfo, totalOrderAmount, expectedExpectPaymentAmount }) => {
        // given - when
        const { expectPaymentAmount } = createRewardAmountInfo(rewardInfo, totalOrderAmount);

        // then
        expect(expectPaymentAmount).toBe(expectedExpectPaymentAmount);
      },
    );
  });
});
