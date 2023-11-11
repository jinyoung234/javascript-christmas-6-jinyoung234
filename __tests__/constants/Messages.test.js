import { FORMAT_MESSAGE } from '../../src/constants/messages';

describe('메시지 포맷 테스트', () => {
  describe('orderMenus 테스트', () => {
    test.each([
      {
        description: '출력 결과는 "피자 2개 - 콜라 1개 이다."',
        input: [
          ['피자', 2],
          ['콜라', 1],
        ],
        output: '피자 2개\n콜라 1개\n',
      },
    ])('$description', ({ input, output }) => {
      expect(FORMAT_MESSAGE.orderMenus(input)).toBe(output);
    });
  });

  describe('amount 테스트', () => {
    test.each([{ input: 5000, output: '5,000원' }])(
      'amount가 $input일 때, 출력 메시지는 $output이어야 한다',
      ({ input, output }) => {
        expect(FORMAT_MESSAGE.amount(input)).toBe(output);
      },
    );
  });

  describe('benefitHistory 테스트', () => {
    test.each([
      {
        description:
          '출력 결과는 "크리스마스 디데이 할인: -1,200원 - 평일 할인: -4,046원 - 특별 할인: -1,000원 - 증정 이벤트: -25,000원"이다.',
        input: {
          xmasDiscountAmount: 1200,
          weekDayDiscountAmount: 4046,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
        output:
          '크리스마스 디데이 할인: -1,200원\n평일 할인: -4,046원\n특별 할인: -1,000원\n증정 이벤트: -25,000원',
      },
    ])('$description', ({ input, output }) => {
      expect(FORMAT_MESSAGE.benefitHistory(input)).toBe(output);
    });
  });
});