import { menuTable } from '../constants/system.js';

class AmountCalculator {
  #menuInfo;

  #menuTable = menuTable;

  constructor(menuInfo) {
    this.#menuInfo = menuInfo;
  }

  #findPriceByName(menuName) {
    const allMenus = Object.values(this.#menuTable).flatMap((menu) => Object.values(menu));
    const matchMenu = allMenus.find((menuInfo) => menuInfo?.name === menuName);
    return matchMenu?.price ?? null;
  }

  calculateAmount(discountAmount = 0) {
    const totalAmount = this.#menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const itemPrice = this.#findPriceByName(menuItemName);
      return prevTotalAmount + itemPrice * quantity;
    }, 0);

    return totalAmount - discountAmount;
  }
}

export default AmountCalculator;
