import { FORMAT_MESSAGE } from './module';

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
      // given - when - then
      expect(FORMAT_MESSAGE.orderMenus(input)).toBe(output);
    });
  });

  describe('amount 테스트', () => {
    test.each([{ input: 5000, output: '5,000원' }])(
      'amount가 $input일 때, 출력 메시지는 $output이어야 한다',
      ({ input, output }) => {
        // given - when - then
        expect(FORMAT_MESSAGE.amount(input)).toBe(output);
      },
    );
    // TODO: 0원인 case도 추가
  });

  describe('benefitHistory 테스트', () => {
    test.each([
      {
        description:
          '출력 결과는 "크리스마스 디데이 할인: -1,200원 - 평일 할인: -4,046원 - 특별 할인: -1,000원 - 증정 이벤트: -25,000원"이다.',
        input: {
          xmasBenefitAmount: 1200,
          weekDayBenefitAmount: 4046,
          specialBenefitAmount: 1000,
          giftAmount: 25000,
        },
        output:
          '크리스마스 디데이 할인: -1,200원\n평일 할인: -4,046원\n특별 할인: -1,000원\n증정 이벤트: -25,000원',
      },
      {
        description: '프로모션 혜택이 모두 0원인 경우 결과는 "없음"이다.',
        input: {
          xmasBenefitAmount: 0,
          weekendBenefitAmount: 0,
          weekDayBenefitAmount: 0,
          specialBenefitAmount: 0,
          giftAmount: 0,
        },
        output: '없음',
      },
    ])('$description', ({ input, output }) => {
      // given - when - then
      expect(FORMAT_MESSAGE.benefitHistory(input)).toBe(output);
    });
  });

  describe('title 테스트', () => {
    test.each([
      {
        description: 'newLine 옵션이 false일 경우, 출력 결과는 "<제목>"이다.',
        input: { config: { newLine: false }, title: '제목' },
        output: '<제목>',
      },
      {
        description: 'newLine 옵션이 true일 경우, 출력 결과는 "\\n<제목>"이다.',
        input: { config: { newLine: true }, title: '제목' },
        output: '\n<제목>',
      },
    ])('$description', ({ input, output }) => {
      // given - when - then
      expect(FORMAT_MESSAGE.title(input.config, input.title)).toBe(output);
    });
  });

  describe('gift 테스트', () => {
    test.each([
      {
        description: 'giftAmount가 있는 경우 샴페인 1개가 증정 된다.',
        input: 25000,
        output: '샴페인 1개',
      },
      {
        description: 'giftAmount가 없는 경우 샴페인이 증정되지 않고 "없음"을 반환한다.',
        input: 0,
        output: '없음',
      },
    ])('$description', ({ input: giftAmount, output }) => {
      // given - when - then
      expect(FORMAT_MESSAGE.gift(giftAmount)).toBe(output);
    });
  });
});
