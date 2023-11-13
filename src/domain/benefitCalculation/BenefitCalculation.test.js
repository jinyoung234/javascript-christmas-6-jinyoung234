import { PROMOTION_DATE_INFO } from '../../constants/promotionSystem';
import { BENEFIT_AMOUNT_INFO, MINIMUM_ORDER_AMOUNT_FOR_GIFT } from './constant';
import benefitCalculation from './module';

describe('프로모션 내 혜택 내역 계산 테스트', () => {
  // given
  const createRewardInfo = (ordererInfo) => benefitCalculation.calculateBenefit(ordererInfo);

  const createOrdererInfoTestCase = ({
    visitDate = 3,
    menuInfo = [
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ],
    totalOrderAmount = 142000,
  } = {}) => ({
    visitDate,
    menuInfo,
    totalOrderAmount,
  });

  describe('평일 할인 적용 여부 테스트', () => {
    test.each([
      {
        description: `${PROMOTION_DATE_INFO.month}월 3일은 평일이기 때문에 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedDiscountInfo: {
          weekDayDiscountAmount: 2 * BENEFIT_AMOUNT_INFO.dayOfWeek,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 2일은 주말이기 때문에 할인이 적용되지 않는다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 2,
          }),
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
        description: `${PROMOTION_DATE_INFO.month}월 2일은 주말이기 때문에 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 2,
          }),
        },
        expectedDiscountInfo: {
          weekendDiscountAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 3일은 평일이기 때문에 할인이 적용되지 않는다.`,
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
        description: `${PROMOTION_DATE_INFO.month}월 1일은 ${PROMOTION_DATE_INFO.month}월 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: 1 }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: BENEFIT_AMOUNT_INFO.christmas,
          giftAmount: 25000,
          specialDiscountAmount: 0,
          weekDayDiscountAmount: 0,
          weekendDiscountAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 31일은 12월 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 31,
          }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 0,
          weekDayDiscountAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
          weekendDiscountAmount: 0,
          specialDiscountAmount: BENEFIT_AMOUNT_INFO.special,
          giftAmount: 25000,
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
        description: `88000원은 ${MINIMUM_ORDER_AMOUNT_FOR_GIFT}만원 미만이므로 샴페인이 증정되지 않는다.`,
        ordererInfo: {
          visitDate: 2,
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
        description: `142000원은 ${MINIMUM_ORDER_AMOUNT_FOR_GIFT}만원 초과이므로 샴페인이 증정된다.`,
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
          ...createOrdererInfoTestCase({
            visitDate: 26,
          }),
        },
        expectedDiscountInfo: {
          xmasDiscountAmount: 0,
        },
      },
      {
        description: '크리스마스 전에는 할인이 적용 된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 24,
          }),
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
        description: `${PROMOTION_DATE_INFO.month}월 3일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 3,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 10일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 10,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 17일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 17,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 24일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 24,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 25일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 25,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 31일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 31,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 30일은 특별 할인 이벤트가 적용되지 않는다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 30,
        }),
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
