import { SYMBOLS } from '../../constants/symbols.js';

/**
 * @param {string} inputOrderMenuInfo - 입력 받은 주문한 메뉴 정보
 * @returns {[string, number]} 메뉴 이름 - 수량이 포함 된 배열
 */
const parseOrderMenuInfo = (inputOrderMenuInfo) => {
  const [menuName, quantity] = inputOrderMenuInfo.split(SYMBOLS.hyphen);
  return [menuName, Number(quantity)];
};

/**
 * @param {string} inputOrders - 입력 받은 주문들
 * @returns {[string, number][]} 메뉴 이름 - 수량이 포함 된 2차원 배열
 */
export const extractOrderMenuInfos = (inputOrders) =>
  Array.from(inputOrders.split(SYMBOLS.comma), parseOrderMenuInfo);
