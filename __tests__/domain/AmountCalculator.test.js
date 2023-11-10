import AmountCalculator from '../../src/domain/AmountCalculator.js';

describe('AmountCalculator 파라미터화 테스트', () => {
  test.each([
    {
      menuInfo: [
        ['양송이수프', 1],
        ['바비큐립', 2],
        ['제로콜라', 1],
      ],
      expected: 117000,
    },
    {
      menuInfo: [
        ['양송이수프', 2],
        ['바비큐립', 1],
      ],
      expected: 66000,
    },
    {
      menuInfo: [
        ['타파스', 3],
        ['아이스크림', 1],
      ],
      expected: 21500,
    },
  ])(
    '메뉴 정보를 통해 할인 전 주문한 총 금액은 $expected원 이어야 한다',
    ({ menuInfo, discount, expected }) => {
      // given
      const amountCalculator = new AmountCalculator(menuInfo);

      // when
      const result = amountCalculator.calculateAmount(discount);

      // then
      expect(result).toBe(expected);
    },
  );
});
