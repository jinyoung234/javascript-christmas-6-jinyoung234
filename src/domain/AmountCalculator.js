import { PROMOTION_MENU_TABLE } from '../constants/system.js';
import MenuFinder from './MenuFinder.js';

class AmountCalculator {
  #menuInfo;

  #menuFinder = new MenuFinder(PROMOTION_MENU_TABLE);

  constructor(menuInfo) {
    this.#menuInfo = menuInfo;
  }

  static from(menuInfo) {
    return new AmountCalculator(menuInfo);
  }

  calculateAmount() {
    return this.#menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const matchingMenu = this.#menuFinder.findByMenuName(menuItemName);

      return !matchingMenu ? prevTotalAmount : prevTotalAmount + matchingMenu.price * quantity;
    }, 0);
  }
}

export default AmountCalculator;
