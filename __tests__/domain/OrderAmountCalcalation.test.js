import menuFinder from '../../src/domain/menuFinder/module';
import orderAmountCalculation from '../../src/domain/orderAmountCalculation/module';

describe('총 주문 금액 계산 테스트', () => {
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
  ])(
    '메뉴 정보를 통해 할인 전 주문한 총 금액은 $expected원 이어야 한다',
    ({ menuInfo, expected }) => {
      // given - when
      const result = orderAmountCalculation.calculateAmount(menuFinder, menuInfo);

      // then
      expect(result).toBe(expected);
    },
  );
});
