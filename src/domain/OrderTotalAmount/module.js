import MenuSearcher from '../MenuSearcher/module';

/**
 * @module OrderTotalAmount
 * 주문 총액과 관련된 모듈
 */
const OrderTotalAmount = Object.freeze({
  /**
   *
   * @param {[string, number][]} menuInfo - 메뉴 이름, 주문 수량이 있는 객체
   * @returns {number} 총 주문 금액
   */
  calculate(menuInfo) {
    return menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const matchingMenu = MenuSearcher.findByMenuName(menuItemName);

      return prevTotalAmount + (matchingMenu?.price ?? 0) * quantity;
    }, 0);
  },
});

export default OrderTotalAmount;
