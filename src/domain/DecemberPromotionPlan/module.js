import MenuSearcher from '../MenuSearcher/module.js';
import { PROMOTION_DATE_INFO } from '../../constants/promotionSystem.js';
import {
  DAY_OF_BENEFIT_CONDITION,
  BENEFIT_DATE_INFO,
  INITIAL_PROMOTION_BENEFIT_RESULT,
  MINIMUM_TOTAL_ORDER_AMOUNT,
  BENEFIT_AMOUNT_INFO,
  MINIMUM_ORDER_AMOUNT_FOR_GIFT,
  GIFT_INFO,
  SPECIAL_DATES,
} from './constant.js';

/**
 * @module DecemberPromotionPlan
 * 12월의 프로모션 계획 들을(크리스마스, 주말/평일 할인, 특별 이벤트 및 증정 행사)통해 할인 혜택 들을 제공 하는 모듈
 */
const DecemberPromotionPlan = Object.freeze({
  /**
   * @param {import('../../utils/jsDoc.js').OrdererInfo} ordererInfo - 주문자 정보(방문 일자, 총 주문 금액, 주문한 메뉴 정보)
   * @returns {import('../../utils/jsDoc.js').PromotionBenefitResult} 각 혜택 금액 정보
   */
  execute({ visitDate, totalOrderAmount, orderMenuInfo }) {
    const { startDate, endDate } = BENEFIT_DATE_INFO;
    const formatVisitDate = formatVisitDateForPromotion(visitDate);
    const params = { dateInfo: { formatVisitDate, startDate, endDate }, totalOrderAmount };

    return isAvailablePromotion(params)
      ? createPromotionBenefitResult({
          visitDate: formatVisitDate,
          totalOrderAmount,
          orderMenuInfo,
        })
      : INITIAL_PROMOTION_BENEFIT_RESULT;
  },
});

export default DecemberPromotionPlan;

/**
 * @param {number} visitDate - 방문 일자
 * @returns {Date} 방문 일자에 대한 Date 객체
 */
function formatVisitDateForPromotion(visitDate) {
  const { year, month } = PROMOTION_DATE_INFO;

  return visitDate < 10
    ? new Date(`${year}-${month}-0${visitDate}`)
    : new Date(`${year}-${month}-${visitDate}`);
}

/**
 * @param {{dateInfo: {formatVisitDate: Date, startDate: Date, endDate: Date}, totalOrderAmount: number}} params - 프로모션이 유효한지 확인할 정보
 * @returns {boolean} 이벤트 기간 및 최소 주문 금액 요건을 충족하는지 여부
 */
function isAvailablePromotion({
  dateInfo: { formatVisitDate, startDate, endDate },
  totalOrderAmount,
}) {
  return (
    formatVisitDate >= startDate &&
    formatVisitDate <= endDate &&
    totalOrderAmount >= MINIMUM_TOTAL_ORDER_AMOUNT
  );
}

/**
 * @param {import('../../utils/jsDoc.js').OrdererInfo} ordererInfo - 주문자 정보(방문 일자, 총 주문 금액, 주문한 메뉴 정보)
 * @returns {import('../../utils/jsDoc.js').PromotionBenefitResult} 각 혜택 금액 정보
 */
function createPromotionBenefitResult(ordererInfo) {
  const { weekday, weekend } = DAY_OF_BENEFIT_CONDITION;

  return {
    xmasBenefitAmount: calculateChristmasBenefit(ordererInfo),
    weekDayBenefitAmount: calculateBenefitForDayType({ ordererInfo, ...weekday }),
    weekendBenefitAmount: calculateBenefitForDayType({ ordererInfo, ...weekend }),
    specialBenefitAmount: calculateSpecialBenefit(ordererInfo),
    giftAmount: calculateGiftEvent(ordererInfo),
  };
}

/**
 * @param {import('../../utils/jsDoc.js').OrdererInfo} ordererInfo - 주문자 정보(방문 일자, 총 주문 금액, 주문한 메뉴 정보)
 * @returns {number | 0} 크리스마스 디데이 할인이 적용되거나 적용되지 않은 금액
 */
function calculateChristmasBenefit({ visitDate }) {
  const { startDate, christmas: endDate } = BENEFIT_DATE_INFO;

  if (!(visitDate >= startDate && visitDate <= endDate)) return 0;

  const millisecondPerDay = 1000 * 60 * 60 * 24;
  const daysUntilChristmas = Math.floor((endDate - visitDate) / millisecondPerDay);

  const { christmas, everyDay } = BENEFIT_AMOUNT_INFO;

  const totalEventDay = 24;
  return christmas + everyDay * (totalEventDay - daysUntilChristmas);
}

/**
 *
 * @param {import('../../utils/jsDoc.js').CalculateBenefitForDayTypeParams} params - 주문자 정보 + 요일 할인 조건이 들어있는 매개 변수
 * @returns {number | 0} 요일(주말/평일) 할인이 적용되거나 적용 되지 않은 금액
 */
function calculateBenefitForDayType({
  ordererInfo: { orderMenuInfo, visitDate },
  menuCategory,
  days,
}) {
  return !days.includes(visitDate.getDay())
    ? 0
    : orderMenuInfo
        .filter(([menuName]) => MenuSearcher.isMenuInCategory(menuName, menuCategory))
        .reduce(
          (totalBenefit, [, quantity]) => totalBenefit + BENEFIT_AMOUNT_INFO.dayOfWeek * quantity,
          0,
        );
}

/**
 * @param {{visitDate : Date}} params - 방문 일자(Date 객체)가 포함된 객체
 * @returns {number | 0} 특별 할인이 적용되거나 적용되지 않은 금액
 */
function calculateSpecialBenefit({ visitDate }) {
  const formattedVisitDate = visitDate.toISOString().substring(0, 10);
  const specialDates = SPECIAL_DATES;

  return specialDates.has(formattedVisitDate) ? BENEFIT_AMOUNT_INFO.special : 0;
}

/**
 * @param {{totalOrderAmount : number}} params - 총 주문 금액이 포함된 객체
 * @returns {number | 0} 증정 이벤트가 적용되거나 적용되지 않은 금액
 */
function calculateGiftEvent({ totalOrderAmount }) {
  if (totalOrderAmount < MINIMUM_ORDER_AMOUNT_FOR_GIFT) return 0;

  const { menuCategory, menuName } = GIFT_INFO;
  const champagne = MenuSearcher.findByMenuName(menuName, menuCategory);

  return champagne?.price ?? 0;
}
