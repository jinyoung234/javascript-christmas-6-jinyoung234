import { PROMOTION_DATE_INFO } from '../../src/constants/promotionSystem';
import {
  BENEFIT_AMOUNT_INFO,
  INITIAL_BENEFIT_INFO,
  MINIMUM_ORDER_AMOUNT_FOR_GIFT,
} from '../../src/domain/benefitCalculation/constant';
import benefitCalculation from '../../src/domain/benefitCalculation/module';

describe('프로모션 내 혜택 내역 계산 테스트', () => {
  // given
  const createRewardInfo = (ordererInfo) => benefitCalculation.calculateBenefit(ordererInfo);

  const createOrdererInfoTestCase = ({
    visitDate = `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-03`,
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
            visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-02`,
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
            visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-02`,
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
        description: `${PROMOTION_DATE_INFO.year}년 ${PROMOTION_DATE_INFO.month - 1}월 30일은 ${
          PROMOTION_DATE_INFO.month
        }월 이전 이므로 할인이 적용되지 안된다.`,
        ordererInfo: {
          visitDate: new Date(`${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month - 1}-30`),
          menuInfo: [
            ['티본스테이크', 1],
            ['바비큐립', 1],
          ],
          totalOrderAmount: 109000,
        },
        expectedDiscountInfo: INITIAL_BENEFIT_INFO,
      },
      {
        description: `${PROMOTION_DATE_INFO.year + 1}년 1월 1일은 ${
          PROMOTION_DATE_INFO.year
        }년이 아니기 때문에 할인이 적용되지 않는다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: `${PROMOTION_DATE_INFO.year + 1}-${PROMOTION_DATE_INFO.month - 11}-01`,
          }),
        },
        expectedDiscountInfo: INITIAL_BENEFIT_INFO,
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
          visitDate: new Date(`${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-02`),
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
            visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-26`,
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
            visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-24`,
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
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-03`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 10일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-10`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 17일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-17`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 24일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-24`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 25일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-25`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 31일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-31`,
        }),
        expectedDiscountInfo: { specialDiscountAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 30일은 특별 할인 이벤트가 적용되지 않는다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-30`,
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
