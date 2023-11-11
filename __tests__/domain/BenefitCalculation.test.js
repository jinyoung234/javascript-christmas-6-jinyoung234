import benefitCalculation from '../../src/domain/BenefitCalculation';

describe('프로모션 내 혜택 내역 계산 테스트', () => {
  // given
  const createRewardInfo = (ordererInfo) => benefitCalculation.calculateBenefit(ordererInfo);

  const createOrdererInfoTestCase = ({
    visitDate = '2023-12-03',
    menuInfo = [
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ],
    totalOrderAmount = 142000,
  } = {}) => ({
    visitDate: new Date(visitDate),
    menuInfo,
    totalOrderAmount,
  });

  describe('평일 할인 적용 여부 테스트', () => {
    test.each([
      {
        description: '12월 3일은 평일이기 때문에 할인이 적용된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedDiscountInfo: {
          weekDayDiscountAmount: 2 * 2023,
        },
      },
      {
        description: '12월 2일은 주말이기 때문에 할인이 적용되지 않는다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2023-12-02' }),
        },
        expectedDiscountInfo: {
          weekDayDiscountAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo.weekDayDiscountAmount).toBe(expectedDiscountInfo.weekDayDiscountAmount);
    });
  });

  describe('주말 할인 적용 여부 테스트', () => {
    test.each([
      {
        description: '12월 2일은 주말이기 때문에 할인이 적용된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2023-12-02' }),
        },
        expectedDiscountInfo: {
          weekendDiscountAmount: 2023 * 2,
        },
      },
      {
        description: '12월 3일은 평일이기 때문에 할인이 적용되지 않는다.',
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedDiscountInfo: {
          weekendDiscountAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo.weekendDiscountAmount).toBe(expectedDiscountInfo.weekendDiscountAmount);
    });
  });

  describe('12월 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '2023년 11월 30일은 12월 이전 이므로 할인이 적용되지 안된다.',
        ordererInfo: {
          visitDate: new Date('2023-11-30'),
          menuInfo: [
            ['티본스테이크', 1],
            ['바비큐립', 1],
          ],
          totalOrderAmount: 109000,
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: 0,
          weekendDiscountAmount: 0,
          specialDiscountAmount: 0,
          giftAmount: 0,
        },
      },
      {
        description: '2024년 1월 1일은 할인이 적용되지 않는다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2024-01-01' }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: 0,
          weekendDiscountAmount: 0,
          specialDiscountAmount: 0,
          giftAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toStrictEqual(expectedDiscountInfo);
    });
  });

  describe('증정 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '88000원은 12만원 미만이므로 샴페인이 증정되지 않는다.',
        ordererInfo: {
          visitDate: new Date('2023-12-02'),
          menuInfo: [
            ['티본스테이크', 1],
            ['초코케이크', 2],
            ['제로콜라', 1],
          ],
          totalOrderAmount: 88000,
        },
        expectedDiscountInfo: {
          giftAmount: 0,
        },
      },
      {
        description: '142000원은 12만원 초과이므로 샴페인이 증정된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedDiscountInfo: {
          giftAmount: 25000,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);
      // then
      expect(rewardInfo.giftAmount).toBe(expectedDiscountInfo.giftAmount);
    });
  });

  describe('크리스마스 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '크리스마스가 지난 이후는 할인이 적용되지 않는다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2023-12-26' }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 0,
        },
      },
      {
        description: '크리스마스 전에는 할인이 적용 된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2023-12-24' }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 3300,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo.xmasDiscountAmount).toBe(expectedDiscountInfo.xmasDiscountAmount);
    });
  });

  describe('특별 할인 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '12월 3일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-03' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 10일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-10' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 17일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-17' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 24일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-24' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 25일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-25' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 31일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-31' }),
        expectedDiscountInfo: { specialDiscountAmount: 1000 },
      },
      {
        description: '12월 30일은 특별 할인 이벤트가 적용되지 않는다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-30' }),
        expectedDiscountInfo: { specialDiscountAmount: 0 },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo.specialDiscountAmount).toBe(expectedDiscountInfo.specialDiscountAmount);
    });
  });
});
