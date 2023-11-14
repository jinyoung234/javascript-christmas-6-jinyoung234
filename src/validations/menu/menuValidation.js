import { PROMOTION_MENU_TABLE } from '../../constants/promotionSystem.js';
import { SYMBOLS } from '../../constants/symbols.js';
import AppError from '../../errors/AppError/module.js';
import { startValidation } from '../utils/startValidation.js';
import { ORDER_QUANTITY } from './constant.js';

export const INVALID_MENU_MESSAGE = '유효하지 않은 주문입니다. 다시 입력해 주세요.';

/**
 * @module menuValidation
 * 입력 값에 대한 주문 메뉴 및 수량의 유효성 검사를 수행하는 모듈
 */
const menuValidation = Object.freeze({
  /**
   * @type {import('../../utils/jsDoc.js').MenuValidationTypes}
   */
  validationTypes: Object.freeze({
    existMenu: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid(orders) {
        const allMenus = Object.values(PROMOTION_MENU_TABLE).flatMap((section) => section);

        return orders.every(([menuName]) => allMenus.some((menu) => menu.name === menuName));
      },
    }),

    numberOfMenuCount: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid(orders) {
        return orders.every(([, menuCount]) => !Number.isNaN(menuCount));
      },
    }),

    singleMenuCount: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid(orders) {
        return orders.every(([, menuCount]) => menuCount >= ORDER_QUANTITY.min);
      },
    }),

    validMenuCount: Object.freeze({
      errorMessage: `메뉴 갯수는 ${ORDER_QUANTITY.min}개에서 ${ORDER_QUANTITY.max}개 까지 가능합니다. 다시 입력해 주세요.`,
      isValid(orders) {
        const allOrderCount = orders.reduce(
          (prevOrderCount, [, orderCount]) => prevOrderCount + orderCount,
          0,
        );
        const { min, max } = ORDER_QUANTITY;

        return allOrderCount >= min && allOrderCount <= max;
      },
    }),

    noDuplicatesMenu: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid(orders) {
        const uniqueItems = new Set(orders.map(([menuName]) => menuName));
        return uniqueItems.size === orders.length;
      },
    }),

    onlyDrinkOrders: Object.freeze({
      errorMessage: '음료만 주문하는 것은 불가능합니다. 다시 입력해 주세요.',
      isValid(orders) {
        return !orders.every(([menuName]) => {
          const drinkMenus = Object.values(PROMOTION_MENU_TABLE['음료']).map(({ name }) => name);
          return drinkMenus.includes(menuName);
        });
      },
    }),
  }),

  check(inputOrders) {
    if (!/^[가-힣]+-[0-9]+(?:,[가-힣]+-[0-9]+)*$/.test(inputOrders))
      throw new AppError(INVALID_MENU_MESSAGE);

    const parseMenuInfo = (menuString) => {
      const [menuName, quantity] = menuString.split(SYMBOLS.hyphen);
      return [menuName, Number(quantity)];
    };

    const orders = Array.from(inputOrders.split(SYMBOLS.comma), parseMenuInfo);
    startValidation(this.validationTypes, orders);
  },
});

export default menuValidation;
