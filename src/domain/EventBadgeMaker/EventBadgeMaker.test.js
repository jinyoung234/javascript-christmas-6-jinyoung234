import EventBadgeMaker from './module.js';

describe('이벤트 뱃지 생성 테스트', () => {
  test.each([
    { totalBenefitAmount: 5000, expectedBadge: '별' },
    { totalBenefitAmount: 10000, expectedBadge: '트리' },
    { totalBenefitAmount: 15000, expectedBadge: '트리' },
    { totalBenefitAmount: 20000, expectedBadge: '산타' },
    { totalBenefitAmount: 25000, expectedBadge: '산타' },
    { totalBenefitAmount: 4999, expectedBadge: null },
    { totalBenefitAmount: 0, expectedBadge: null },
  ])(
    '보상금액 $totalBenefitAmount원에 대한 배지는 $expectedBadge 여야 한다',
    ({ totalBenefitAmount, expectedBadge }) => {
      // given - when
      const badge = EventBadgeMaker.createByBenefitAmount(totalBenefitAmount);

      // then
      expect(badge === expectedBadge).toBeTruthy();
    },
  );
});
