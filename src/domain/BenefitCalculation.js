import EventPeriodChecker from './EventPeriodChecker.js';
import menuFinder from './MenuFinder.js';

const INITIAL_BENEFIT_INFO = Object.freeze({
  xmasDiscountAmount: 0,
  weekDayDiscountAmount: 0,
  weekendDiscountAmount: 0,
  specialDiscountAmount: 0,
  giftAmount: 0,
});

const EVENT_DATE_INFO = Object.freeze({
  eventStartDate: new Date('2023-12-01'),
  christmasDate: new Date('2023-12-25'),
  eventEndDate: new Date('2023-12-31'),
});

const DAY_OF_DISCOUNT_INFO = Object.freeze({
  weekday: Object.freeze({
    menuCategory: '디저트',
    days: [0, 1, 2, 3, 4],
  }),

  weekend: Object.freeze({
    menuCategory: '메인',
    days: [5, 6],
  }),
});

export const SPECIAL_DATES = new Set([
  '2023-12-03',
  '2023-12-10',
  '2023-12-17',
  '2023-12-24',
  '2023-12-25',
  '2023-12-31',
]);

export const DISCOUNT_AMOUNTS = Object.freeze({
  christmasDiscountPerDay: 100,
  christmasInitialDiscount: 1000,
  dayDiscount: 2023,
  specialDiscount: 1000,
  minimumOrderAmountForGift: 120000,
});

const benefitCalculation = Object.freeze({
  calculateBenefit(ordererInfo) {
    const { eventStartDate: startDate, eventEndDate: endDate } = EVENT_DATE_INFO;

    if (!EventPeriodChecker.of(startDate, endDate).isEventPeriod(ordererInfo.visitDate))
      return INITIAL_BENEFIT_INFO;

    return createBenefitInfo(ordererInfo);
  },
});

function createBenefitInfo(ordererInfo) {
  const { weekday, weekend } = DAY_OF_DISCOUNT_INFO;

  return {
    xmasDiscountAmount: calculateChristmasDiscount(ordererInfo),
    weekDayDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekday }),
    weekendDiscountAmount: calculateDiscountForDayType({ ordererInfo, ...weekend }),
    specialDiscountAmount: calculateSpecialDiscount(ordererInfo),
    giftAmount: calculateGiftEvent(ordererInfo),
  };
}

function calculateChristmasDiscount({ visitDate }) {
  const { eventStartDate: startDate, christmasDate: endDate } = EVENT_DATE_INFO;

  if (!EventPeriodChecker.of(startDate, endDate).isEventPeriod(visitDate)) return 0;

  const millisecondPerDay = 1000 * 60 * 60 * 24;
  const daysUntilChristmas = Math.floor((endDate - visitDate) / millisecondPerDay);

  const { christmasDiscountPerDay, christmasInitialDiscount } = DISCOUNT_AMOUNTS;

  const totalEventDay = 24;
  return christmasInitialDiscount + christmasDiscountPerDay * (totalEventDay - daysUntilChristmas);
}

function calculateDiscountForDayType({ ordererInfo: { menuInfo, visitDate }, menuCategory, days }) {
  const visitDay = visitDate.getDay();

  if (!days.includes(visitDay)) return 0;

  return menuInfo
    .filter(([menuName]) => menuFinder.isMenuInCategory(menuName, menuCategory))
    .reduce(
      (totalDiscount, [, quantity]) => totalDiscount + DISCOUNT_AMOUNTS.dayDiscount * quantity,
      0,
    );
}

function calculateSpecialDiscount({ visitDate }) {
  const formattedVisitDate = visitDate.toISOString().substring(0, 10);

  return SPECIAL_DATES.has(formattedVisitDate) ? DISCOUNT_AMOUNTS.specialDiscount : 0;
}

function calculateGiftEvent({ totalOrderAmount }) {
  if (totalOrderAmount < DISCOUNT_AMOUNTS.minimumOrderAmountForGift) return 0;

  const champagne = menuFinder.findByMenuName('샴페인', '음료');
  return champagne?.price ?? 0;
}

export default benefitCalculation;
