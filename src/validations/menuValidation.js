import { menuTable } from '../constants/system.js';
import { startValidation } from './utils/startValidation.js';

export const INVALID_MENU_MESSAGE = '유효하지 않은 주문입니다. 다시 입력해 주세요.';

/**
 * @module menuValidation
 * 입력 값에 대한 주문 메뉴 및 수량의 유효성 검사를 수행하는 모듈
 */
const menuValidation = Object.freeze({
  validationTypes: Object.freeze({
    menuCategory: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid() {
        return Object.keys(menuTable).some((menuCategory) =>
          ['애피타이저', '메인', '디저트', '음료'].includes(menuCategory),
        );
      },
    }),

    existMenu: Object.freeze({
      errorMessage: INVALID_MENU_MESSAGE,
      isValid(orders) {
        return orders.some(([menuName]) => {
          const allMenus = Object.values(menuTable).flatMap((section) =>
            Object.values(section).map(({ name }) => name),
          );
          return allMenus.includes(menuName);
        });
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
        return orders.every(([, menuCount]) => menuCount >= 1);
      },
    }),

    validMenuCount: Object.freeze({
      errorMessage: '메뉴 갯수는 1개에서 20개 까지 가능합니다. 다시 입력해 주세요.',
      isValid(orders) {
        const allOrderCount = orders.reduce(
          (prevOrderCount, [, orderCount]) => prevOrderCount + orderCount,
          0,
        );
        return allOrderCount >= 1 && allOrderCount <= 20;
      },
    }),

    noDuplicatesMenu: Object.freeze({
      errorMessage: '중복된 메뉴 항목입니다. 다시 입력해 주세요.',
      isValid(orders) {
        const uniqueItems = new Set(orders.map(([menuName]) => menuName));
        return uniqueItems.size === orders.length;
      },
    }),

    onlyDrinkOrders: Object.freeze({
      errorMessage: '음료만 주문하는 것은 불가능합니다. 다시 입력해 주세요.',
      isValid(orders) {
        return !orders.every(([menuName]) => {
          const drinkMenus = Object.values(menuTable['음료']).map(({ name }) => name);
          return drinkMenus.includes(menuName);
        });
      },
    }),
  }),

  /**
   * @param {Array} orders - 사용자의 주문 배열, 각 요소는 [메뉴, 메뉴 갯수] 형태
   * @throws {AppError} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(orders) {
    startValidation(this.validationTypes, orders);
  },
});

export default menuValidation;
