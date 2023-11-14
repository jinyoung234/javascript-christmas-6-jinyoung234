import { PROMOTION_DATE_INFO } from '../../constants/promotionSystem.js';

// constant.js는 테스트 코드 및 module.js에서만 사용
export const INITIAL_PROMOTION_BENEFIT_RESULT = Object.freeze({
  xmasBenefitAmount: 0,
  weekDayBenefitAmount: 0,
  weekendBenefitAmount: 0,
  specialBenefitAmount: 0,
  giftAmount: 0,
});

export const MINIMUM_TOTAL_ORDER_AMOUNT = 10000;

export const BENEFIT_DATE_INFO = Object.freeze({
  startDate: new Date(`${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-01`),
  endDate: new Date(`${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-31`),
  christmas: new Date(`${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-25`),
});

export const DAY_OF_BENEFIT_CONDITION = Object.freeze({
  weekday: Object.freeze({
    menuCategory: '디저트',
    days: [0, 1, 2, 3, 4],
  }),

  weekend: Object.freeze({
    menuCategory: '메인',
    days: [5, 6],
  }),
});

export const BENEFIT_AMOUNT_INFO = Object.freeze({
  everyDay: 100,
  christmas: 1000,
  dayOfWeek: 2023,
  special: 1000,
});

export const MINIMUM_ORDER_AMOUNT_FOR_GIFT = 120000;

export const GIFT_INFO = {
  menuCategory: '음료',
  menuName: '샴페인',
};

export const SPECIAL_DATES = new Set([
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-03`,
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-10`,
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-17`,
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-24`,
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-25`,
  `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-31`,
]);
