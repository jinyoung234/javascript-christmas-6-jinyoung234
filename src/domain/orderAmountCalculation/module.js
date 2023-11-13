import menuFinder from '../menuFinder/module.js';

/**
 * @module orderAmountCalculation
 * 주문 정보를 토대로 총 주문 금액을 계산하는 모듈
 */
const orderAmountCalculation = Object.freeze({
  /**
   *
   * @param {[string, number][]} menuInfo - 메뉴 이름, 주문 수량이 있는 객체
   * @returns {number} 총 주문 금액
   */
  calculateAmount(menuInfo) {
    return menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const matchingMenu = menuFinder.findByMenuName(menuItemName);

      return !matchingMenu ? prevTotalAmount : prevTotalAmount + matchingMenu.price * quantity;
    }, 0);
  },
});

export default orderAmountCalculation;
