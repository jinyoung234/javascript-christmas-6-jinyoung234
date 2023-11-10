import EventReward from '../../src/domain/EventReward';

describe('혜택 내역 계산 테스트', () => {
  const createRewardInfo = (ordererInfo) => {
    // given
    const eventReward = EventReward.from(ordererInfo);

    // when
    return eventReward.createReward();
  };
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
  const createRewardInfoTestCase = ({
    xmasDiscountAmount = 1200,
    weekDayDiscountAmount = 2 * 2023,
    weekendDiscountAmount = 0,
    specialDiscountAmount = 1000,
    giftAmount = 25000,
  } = {}) => ({
    xmasDiscountAmount,
    weekDayDiscountAmount,
    weekendDiscountAmount,
    specialDiscountAmount,
    giftAmount,
  });
  describe('평일 할인 적용 여부 테스트', () => {
    test.each([
      {
        description: '12월 3일은 평일이기 때문에 할인이 적용된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedDiscountInfo: {
          ...createRewardInfoTestCase(),
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toStrictEqual(expectedDiscountInfo);
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
          ...createRewardInfoTestCase({
            xmasDiscountAmount: 1100,
            specialDiscountAmount: 0,
            weekDayDiscountAmount: 0,
            weekendDiscountAmount: 2023 * 2,
          }),
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toEqual(expectedDiscountInfo);
    });
  });

  describe('12월 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '11월 30일은 할인이 적용되지 안된다.',
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
      expect(rewardInfo).toEqual(expectedDiscountInfo);
    });
  });

  describe('증정 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '88000원은 샴페인이 증정되지 않는다.',
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
          xmasDiscountAmount: 1100,
          weekDayDiscountAmount: 0,
          weekendDiscountAmount: 1 * 2023,
          specialDiscountAmount: 0,
          giftAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toEqual(expectedDiscountInfo);
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
          weekDayDiscountAmount: 2 * 2023,
          weekendDiscountAmount: 0,
          specialDiscountAmount: 0,
          giftAmount: 25000,
        },
      },
      {
        description: '크리스마스 전에는 할인이 적용 된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: '2023-12-24' }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 3300,
          weekDayDiscountAmount: 2 * 2023,
          weekendDiscountAmount: 0,
          specialDiscountAmount: 1000,
          giftAmount: 25000,
        },
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toEqual(expectedDiscountInfo);
    });
  });

  describe('특별 할인 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: '12월 3일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-03' }),
        expectedDiscountInfo: createRewardInfoTestCase({ specialDiscountAmount: 1000 }),
      },
      {
        description: '12월 10일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-10' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 1900,
        }),
      },
      {
        description: '12월 17일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-17' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 2600,
        }),
      },
      {
        description: '12월 24일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-24' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 3300,
        }),
      },
      {
        description: '12월 25일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-25' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 3400,
        }),
      },
      {
        description: '12월 31일은 특별 할인 이벤트가 적용된다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-31' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 0,
        }),
      },
      {
        description: '12월 30일은 특별 할인 이벤트가 적용되지 않는다.',
        ordererInfo: createOrdererInfoTestCase({ visitDate: '2023-12-30' }),
        expectedDiscountInfo: createRewardInfoTestCase({
          xmasDiscountAmount: 0,
          specialDiscountAmount: 0,
          weekDayDiscountAmount: 0,
          weekendDiscountAmount: 4046,
        }),
      },
    ])('$description', ({ ordererInfo, expectedDiscountInfo }) => {
      // given - when
      const rewardInfo = createRewardInfo(ordererInfo);

      // then
      expect(rewardInfo).toEqual(expectedDiscountInfo);
    });
  });
});
