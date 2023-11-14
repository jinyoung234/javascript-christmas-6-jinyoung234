import PromotionReceipt from './module.js';

describe('총 혜택 금액 및 예상 지출 금액 계산 테스트', () => {
  describe('총 혜택 금액 계산', () => {
    test.each([
      {
        promotionBenefitResult: {
          xmasBenefitAmount: 1200,
          weekDayBenefitAmount: 0,
          specialBenefitAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedTotalBenefitAmount: 27200,
      },
      {
        promotionBenefitResult: {
          xmasBenefitAmount: 0,
          weekDayBenefitAmount: 2000,
          specialBenefitAmount: 0,
          giftAmount: 15000,
        },
        totalOrderAmount: 80000,
        expectedTotalBenefitAmount: 17000,
      },
    ])(
      '총 혜택 금액은 $expectedTotalBenefitAmount원 이다.',
      ({ promotionBenefitResult, totalOrderAmount, expectedTotalBenefitAmount }) => {
        // given - when
        const { totalBenefitAmount } = PromotionReceipt.receive({
          promotionBenefitResult,
          totalOrderAmount,
        });

        // then
        expect(totalBenefitAmount).toBe(expectedTotalBenefitAmount);
      },
    );
  });

  describe('예상 결제 금액 계산', () => {
    test.each([
      {
        promotionBenefitResult: {
          xmasBenefitAmount: 1200,
          weekDayBenefitAmount: 0,
          specialBenefitAmount: 1000,
          giftAmount: 25000,
        },
        totalOrderAmount: 100000,
        expectedExpectPaymentAmount: 97800,
      },
      {
        promotionBenefitResult: {
          xmasBenefitAmount: 0,
          weekDayBenefitAmount: 2000,
          specialBenefitAmount: 0,
          giftAmount: 15000,
        },
        totalOrderAmount: 80000,
        expectedExpectPaymentAmount: 78000,
      },
    ])(
      '예상 결제 금액은 $expectedExpectPaymentAmount원 이다.',
      ({ promotionBenefitResult, totalOrderAmount, expectedExpectPaymentAmount }) => {
        // given - when
        const { expectPaymentAmount } = PromotionReceipt.receive({
          promotionBenefitResult,
          totalOrderAmount,
        });

        // then
        expect(expectPaymentAmount).toBe(expectedExpectPaymentAmount);
      },
    );
  });
});
