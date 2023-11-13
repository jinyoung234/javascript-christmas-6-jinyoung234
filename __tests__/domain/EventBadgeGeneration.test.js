import eventBadgeGeneration from '../../src/domain/eventBadgeGeneration/module.js';

describe('이벤트 뱃지 생성 테스트', () => {
  test.each([
    { totalRewardAmount: 5000, expectedBadge: '별' },
    { totalRewardAmount: 10000, expectedBadge: '트리' },
    { totalRewardAmount: 15000, expectedBadge: '트리' },
    { totalRewardAmount: 20000, expectedBadge: '산타' },
    { totalRewardAmount: 25000, expectedBadge: '산타' },
    { totalRewardAmount: 4999, expectedBadge: null },
    { totalRewardAmount: 0, expectedBadge: null },
  ])(
    '보상금액 $totalRewardAmount원에 대한 배지는 $expectedBadge 여야 한다',
    ({ totalRewardAmount, expectedBadge }) => {
      // given - when
      const badge = eventBadgeGeneration.generateBadge(totalRewardAmount);

      // then
      expect(badge === expectedBadge).toBeTruthy();
    },
  );
});
