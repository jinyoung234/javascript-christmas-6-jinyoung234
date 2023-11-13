import menuFinder from '../menuFinder/module.js';

const orderAmountCalculation = Object.freeze({
  calculateAmount(menuInfo) {
    return menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const matchingMenu = menuFinder.findByMenuName(menuItemName);

      return !matchingMenu ? prevTotalAmount : prevTotalAmount + matchingMenu.price * quantity;
    }, 0);
  },
});

export default orderAmountCalculation;
