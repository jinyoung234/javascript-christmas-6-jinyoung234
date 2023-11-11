import EventPeriodChecker from './EventPeriodChecker.js';
import findingMenu from './MenuFinder.js';

class EventReward {
  #discountInfo = {
    xmasDiscountAmount: 0,
    weekDayDiscountAmount: 0,
    weekendDiscountAmount: 0,
    specialDiscountAmount: 0,
    giftAmount: 0,
  };

  #eventDateInfo = {
    eventStartDate: new Date('2023-12-01'),
    christmasDate: new Date('2023-12-25'),
    eventEndDate: new Date('2023-12-31'),
  };

  #ordererInfo;

  constructor(ordererInfo) {
    this.#ordererInfo = ordererInfo;
  }

  static from(ordererInfo) {
    return new EventReward(ordererInfo);
  }

  createReward() {
    const { eventStartDate: startDate, eventEndDate: endDate } = this.#eventDateInfo;

    if (!EventPeriodChecker.of(startDate, endDate).isEventPeriod(this.#ordererInfo.visitDate))
      return { ...this.#discountInfo };

    return {
      xmasDiscountAmount: this.#calculateChristmasDiscount(),
      weekDayDiscountAmount: this.#calculateDiscountForDayType('디저트', [0, 1, 2, 3, 4]),
      weekendDiscountAmount: this.#calculateDiscountForDayType('메인', [5, 6]),
      specialDiscountAmount: this.#calculateSpecialDiscount(),
      giftAmount: this.#calculateGiftEvent(),
    };
  }

  #calculateChristmasDiscount() {
    const { eventStartDate: startDate, christmasDate: endDate } = this.#eventDateInfo;
    const { visitDate } = this.#ordererInfo;

    if (!EventPeriodChecker.of(startDate, endDate).isEventPeriod(visitDate)) return 0;

    const daysUntilChristmas = Math.floor((endDate - visitDate) / (1000 * 60 * 60 * 24));
    const discountPerDay = 100;

    return 1000 + discountPerDay * (24 - daysUntilChristmas);
  }

  #calculateDiscountForDayType(category, days) {
    const { menuInfo, visitDate } = this.#ordererInfo;
    const visitDay = visitDate.getDay();

    if (!days.includes(visitDay)) return 0;

    return menuInfo
      .filter(([menuName]) => findingMenu.isMenuInCategory(menuName, category))
      .reduce((totalDiscount, [, quantity]) => totalDiscount + 2023 * quantity, 0);
  }

  #calculateSpecialDiscount() {
    const specialDates = new Set([
      '2023-12-03',
      '2023-12-10',
      '2023-12-17',
      '2023-12-24',
      '2023-12-25',
      '2023-12-31',
    ]);
    const formattedVisitDate = this.#ordererInfo.visitDate.toISOString().substring(0, 10);

    return specialDates.has(formattedVisitDate) ? 1000 : 0;
  }

  #calculateGiftEvent() {
    const { totalOrderAmount } = this.#ordererInfo;

    if (totalOrderAmount < 120000) return 0;

    const champagne = findingMenu.findByMenuName('샴페인', '음료');
    return champagne?.price ?? 0;
  }
}

export default EventReward;
