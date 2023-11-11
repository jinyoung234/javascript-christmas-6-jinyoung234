import benefitAmountCalculation from '../../src/domain/RewardCalculator.js';

describe('총 혜택 금액 및 예상 지출 금액 계산 테스트', () => {
  describe('총 혜택 금액 계산', () => {
    test.each([
      {
        benefitInfo: {
          xmasDiscountAmount: 1200,
          weekDayDiscountAmount: 0,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedTotalRewardAmount: 27200,
      },
      {
        benefitInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: 2000,
          specialDiscountAmount: 0,
          giftAmount: 15000,
        },
        totalOrderAmount: 80000,
        expectedTotalRewardAmount: 17000,
      },
    ])(
      '총 혜택 금액은 $expectedTotalRewardAmount원 이다.',
      ({ benefitInfo, totalOrderAmount, expectedTotalRewardAmount }) => {
        // given - when
        const { totalRewardAmount } = benefitAmountCalculation.createRewardAmountInfo({
          benefitInfo,
          totalOrderAmount,
        });

        // then
        expect(totalRewardAmount).toBe(expectedTotalRewardAmount);
      },
    );
  });

  describe('예상 결제 금액 계산', () => {
    test.each([
      {
        benefitInfo: {
          xmasDiscountAmount: 1200,
          weekDayDiscountAmount: 0,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedExpectPaymentAmount: 97800,
      },
      {
        benefitInfo: {
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
      ({ benefitInfo, totalOrderAmount, expectedExpectPaymentAmount }) => {
        // given - when
        const { expectPaymentAmount } = benefitAmountCalculation.createRewardAmountInfo({
          benefitInfo,
          totalOrderAmount,
        });

        // then
        expect(expectPaymentAmount).toBe(expectedExpectPaymentAmount);
      },
    );
  });
});
