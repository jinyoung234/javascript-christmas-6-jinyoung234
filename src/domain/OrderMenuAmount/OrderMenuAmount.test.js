import OrderMenuAmount from './module.js';

describe('총 주문 금액 계산 테스트', () => {
  test.each([
    {
      orderMenuInfo: [
        ['양송이수프', 1],
        ['바비큐립', 2],
        ['제로콜라', 1],
      ],
      expected: 117000,
    },
    {
      orderMenuInfo: [
        ['양송이수프', 2],
        ['바비큐립', 1],
      ],
      expected: 66000,
    },
    {
      orderMenuInfo: [['새송이수프', 2]],
      expected: 0,
    },
  ])('계산된 할인 전 총 주문 금액은 $expected원 이다.', ({ orderMenuInfo, expected }) => {
    // given - when
    const result = OrderMenuAmount.calculateTotal(orderMenuInfo);

    // then
    expect(result).toBe(expected);
  });
});
