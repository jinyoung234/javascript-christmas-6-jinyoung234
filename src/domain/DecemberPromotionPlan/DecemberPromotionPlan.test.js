import { PROMOTION_DATE_INFO } from '../../constants/promotionSystem';
import {
  BENEFIT_AMOUNT_INFO,
  MINIMUM_ORDER_AMOUNT_FOR_GIFT,
  INITIAL_PROMOTION_BENEFIT_RESULT,
  MINIMUM_TOTAL_ORDER_AMOUNT,
} from './constant';
import DecemberPromotionPlan from './module';

describe('12월 이벤트 계획에 따른 혜택 계산 테스트', () => {
  const createBenefitResult = (ordererInfo) => DecemberPromotionPlan.execute(ordererInfo);

  const createOrdererInfoTestCase = ({
    visitDate = 3,
    orderMenuInfo = [
      ['티본스테이크', 1],
      ['바비큐립', 1],
      ['초코케이크', 2],
      ['제로콜라', 1],
    ],
    totalOrderAmount = 142000,
  } = {}) => ({
    visitDate,
    orderMenuInfo,
    totalOrderAmount,
  });

  describe('프로모션 적용 여부 테스트', () => {
    test.each([
      {
        description: `5000원은 ${MINIMUM_TOTAL_ORDER_AMOUNT}원 미만 이기 때문에 프로모션 적용이 되지 않는다.`,
        ordererInfo: {
          visitDate: 3,
          orderMenuInfo: ['아이스크림', 1],
          totalOrderAmount: 5000,
        },
        expectedBenefitInfo: {
          ...INITIAL_PROMOTION_BENEFIT_RESULT,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult).toStrictEqual(expectedBenefitInfo);
    });
  });

  describe('평일 할인 적용 여부 테스트', () => {
    test.each([
      {
        description: `${PROMOTION_DATE_INFO.month}월 3일은 평일이기 때문에 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedBenefitInfo: {
          weekDayBenefitAmount: 2 * BENEFIT_AMOUNT_INFO.dayOfWeek,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 2일은 주말이기 때문에 할인이 적용되지 않는다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 2,
          }),
        },
        expectedBenefitInfo: {
          weekDayBenefitAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult.weekDayBenefitAmount).toBe(expectedBenefitInfo.weekDayBenefitAmount);
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
        expectedBenefitInfo: {
          weekendBenefitAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 3일은 평일이기 때문에 할인이 적용되지 않는다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedBenefitInfo: {
          weekendBenefitAmount: 0,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult.weekendBenefitAmount).toBe(expectedBenefitInfo.weekendBenefitAmount);
    });
  });

  describe('12월 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: `${PROMOTION_DATE_INFO.month}월 1일은 ${PROMOTION_DATE_INFO.month}월 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({ visitDate: 1 }),
        },
        expectedBenefitInfo: {
          xmasBenefitAmount: BENEFIT_AMOUNT_INFO.christmas,
          giftAmount: 25000,
          specialBenefitAmount: 0,
          weekDayBenefitAmount: 0,
          weekendBenefitAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
        },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 31일은 12월 할인이 적용된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 31,
          }),
        },
        expectedBenefitInfo: {
          xmasBenefitAmount: 0,
          weekDayBenefitAmount: BENEFIT_AMOUNT_INFO.dayOfWeek * 2,
          weekendBenefitAmount: 0,
          specialBenefitAmount: BENEFIT_AMOUNT_INFO.special,
          giftAmount: 25000,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult).toStrictEqual(expectedBenefitInfo);
    });
  });

  describe('증정 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: `88000원은 ${MINIMUM_ORDER_AMOUNT_FOR_GIFT}만원 미만이므로 샴페인이 증정되지 않는다.`,
        ordererInfo: {
          visitDate: 2,
          orderMenuInfo: [
            ['티본스테이크', 1],
            ['초코케이크', 2],
            ['제로콜라', 1],
          ],
          totalOrderAmount: 88000,
        },
        expectedBenefitInfo: {
          giftAmount: 0,
        },
      },
      {
        description: `142000원은 ${MINIMUM_ORDER_AMOUNT_FOR_GIFT}만원 초과이므로 샴페인이 증정된다.`,
        ordererInfo: {
          ...createOrdererInfoTestCase(),
        },
        expectedBenefitInfo: {
          giftAmount: 25000,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);
      // then
      expect(benefitResult.giftAmount).toBe(expectedBenefitInfo.giftAmount);
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
        expectedBenefitInfo: {
          xmasBenefitAmount: 0,
        },
      },
      {
        description: '크리스마스 전에는 할인이 적용 된다.',
        ordererInfo: {
          ...createOrdererInfoTestCase({
            visitDate: 24,
          }),
        },
        expectedBenefitInfo: {
          xmasBenefitAmount: 3300,
        },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult.xmasBenefitAmount).toBe(expectedBenefitInfo.xmasBenefitAmount);
    });
  });

  describe('특별 할인 이벤트 적용 여부 테스트', () => {
    test.each([
      {
        description: `${PROMOTION_DATE_INFO.month}월 3일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 3,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 10일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 10,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 17일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 17,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 24일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 24,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 25일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 25,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 31일은 특별 할인 이벤트가 적용된다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 31,
        }),
        expectedBenefitInfo: { specialBenefitAmount: BENEFIT_AMOUNT_INFO.special },
      },
      {
        description: `${PROMOTION_DATE_INFO.month}월 30일은 특별 할인 이벤트가 적용되지 않는다.`,
        ordererInfo: createOrdererInfoTestCase({
          visitDate: 30,
        }),
        expectedBenefitInfo: { specialBenefitAmount: 0 },
      },
    ])('$description', ({ ordererInfo, expectedBenefitInfo }) => {
      // given - when
      const benefitResult = createBenefitResult(ordererInfo);

      // then
      expect(benefitResult.specialBenefitAmount).toBe(expectedBenefitInfo.specialBenefitAmount);
    });
  });
});
