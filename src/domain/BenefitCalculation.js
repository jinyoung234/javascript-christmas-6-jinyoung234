import { PROMOTION_DATE_INFO } from '../constants/promotionSystem.js';
import menuFinder from './MenuFinder.js';

const benefitCalculation = Object.freeze({
  calculateBenefit(ordererInfo) {
    const { year, month } = PROMOTION_DATE_INFO;
    const [startDate, endDate] = [new Date(`${year}-${month}-01`), new Date(`${year}-${month}-31`)];
    const { visitDate } = ordererInfo;

    if (!(visitDate >= startDate && visitDate <= endDate) || ordererInfo.totalOrderAmount < 10000)
      return createInitialBenefitInfo();

    return createBenefitInfo(ordererInfo);
  },
});

export default benefitCalculation;

function createInitialBenefitInfo() {
  return Object.freeze({
    xmasDiscountAmount: 0,
    weekDayDiscountAmount: 0,
    weekendDiscountAmount: 0,
    specialDiscountAmount: 0,
    giftAmount: 0,
  });
}

function createBenefitInfo(ordererInfo) {
  const { weekday, weekend } = createDayOfDiscountInfo();

  return {
    xmasDiscountAmount: calculateChristmasDiscount(ordererInfo),
    weekDayDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekday }),
    weekendDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekend }),
    specialDiscountAmount: calculateSpecialDiscount(ordererInfo),
    giftAmount: calculateGiftEvent(ordererInfo),
  };
}

function createDayOfDiscountInfo() {
  return {
    weekday: Object.freeze({
      menuCategory: '디저트',
      days: [0, 1, 2, 3, 4],
    }),

    weekend: Object.freeze({
      menuCategory: '메인',
      days: [5, 6],
    }),
  };
}

function calculateChristmasDiscount({ visitDate }) {
  const { year, month } = PROMOTION_DATE_INFO;
  const [startDate, endDate] = [new Date(`${year}-${month}-01`), new Date(`${year}-${month}-25`)];

  if (!(visitDate >= startDate && visitDate <= endDate)) return 0;

  const millisecondPerDay = 1000 * 60 * 60 * 24;
  const daysUntilChristmas = Math.floor((endDate - visitDate) / millisecondPerDay);

  const [christmasDiscountPerDay, christmasInitialDiscount] = [100, 1000];

  const totalEventDay = 24;
  return christmasInitialDiscount + christmasDiscountPerDay * (totalEventDay - daysUntilChristmas);
}

function calculateDiscountForDayType({ ordererInfo: { menuInfo, visitDate }, menuCategory, days }) {
  const visitDay = visitDate.getDay();

  if (!days.includes(visitDay)) return 0;

  const dayDiscount = 2023;

  return menuInfo
    .filter(([menuName]) => menuFinder.isMenuInCategory(menuName, menuCategory))
    .reduce((totalDiscount, [, quantity]) => totalDiscount + dayDiscount * quantity, 0);
}

function calculateSpecialDiscount({ visitDate }) {
  const formattedVisitDate = visitDate.toISOString().substring(0, 10);
  const specialDiscount = 1000;
  const specialDates = createSpecialDates();

  return specialDates.has(formattedVisitDate) ? specialDiscount : 0;
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
  const minimumOrderAmountForGift = 120000;
  if (totalOrderAmount < minimumOrderAmountForGift) return 0;

  const champagne = menuFinder.findByMenuName('샴페인', '음료');
  return champagne?.price ?? 0;
}
