import menuFinder from '../menuFinder/module.js';
import { PROMOTION_DATE_INFO } from '../../constants/promotionSystem.js';
import {
  DAY_OF_BENEFIT_CONDITION,
  BENEFIT_DATE_INFO,
  INITIAL_BENEFIT_INFO,
  MINIMUM_TOTAL_ORDER_AMOUNT,
  BENEFIT_AMOUNT_INFO,
  MINIMUM_ORDER_AMOUNT_FOR_GIFT,
  GIFT_INFO,
} from './constant.js';

const benefitCalculation = Object.freeze({
  calculateBenefit(ordererInfo) {
    const { startDate, endDate } = BENEFIT_DATE_INFO;
    const { visitDate } = ordererInfo;

    if (
      !(visitDate >= startDate && visitDate <= endDate) ||
      ordererInfo.totalOrderAmount < MINIMUM_TOTAL_ORDER_AMOUNT
    )
      return INITIAL_BENEFIT_INFO;

    return createBenefitInfo(ordererInfo);
  },
});

export default benefitCalculation;

function createBenefitInfo(ordererInfo) {
  const { weekday, weekend } = DAY_OF_BENEFIT_CONDITION;

  return {
    xmasDiscountAmount: calculateChristmasDiscount(ordererInfo),
    weekDayDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekday }),
    weekendDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekend }),
    specialDiscountAmount: calculateSpecialDiscount(ordererInfo),
    giftAmount: calculateGiftEvent(ordererInfo),
  };
}

function calculateChristmasDiscount({ visitDate }) {
  const { startDate, christmas: endDate } = BENEFIT_DATE_INFO;

  if (!(visitDate >= startDate && visitDate <= endDate)) return 0;

  const millisecondPerDay = 1000 * 60 * 60 * 24;
  const daysUntilChristmas = Math.floor((endDate - visitDate) / millisecondPerDay);

  const { christmas, everyDay } = BENEFIT_AMOUNT_INFO;

  const totalEventDay = 24;
  return christmas + everyDay * (totalEventDay - daysUntilChristmas);
}

function calculateDiscountForDayType({ ordererInfo: { menuInfo, visitDate }, menuCategory, days }) {
  const visitDay = visitDate.getDay();

  if (!days.includes(visitDay)) return 0;

  return menuInfo
    .filter(([menuName]) => menuFinder.isMenuInCategory(menuName, menuCategory))
    .reduce(
      (totalDiscount, [, quantity]) => totalDiscount + BENEFIT_AMOUNT_INFO.dayOfWeek * quantity,
      0,
    );
}

function calculateSpecialDiscount({ visitDate }) {
  const formattedVisitDate = visitDate.toISOString().substring(0, 10);
  const specialDates = createSpecialDates();

  return specialDates.has(formattedVisitDate) ? BENEFIT_AMOUNT_INFO.special : 0;
}

function createSpecialDates() {
  return new Set([
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-03`,
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-10`,
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-17`,
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-24`,
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-25`,
    `${PROMOTION_DATE_INFO.year}-${PROMOTION_DATE_INFO.month}-31`,
  ]);
}

function calculateGiftEvent({ totalOrderAmount }) {
  if (totalOrderAmount < MINIMUM_ORDER_AMOUNT_FOR_GIFT) return 0;

  const { menuCategory, menuName } = GIFT_INFO;
  const champagne = menuFinder.findByMenuName(menuName, menuCategory);

  return champagne?.price ?? 0;
}
