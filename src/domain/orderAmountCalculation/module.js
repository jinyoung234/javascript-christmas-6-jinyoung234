const orderAmountCalculation = Object.freeze({
  calculateAmount(menuFinder, menuInfo) {
    return menuInfo.reduce((prevTotalAmount, [menuItemName, quantity]) => {
      const matchingMenu = menuFinder.findByMenuName(menuItemName);

      return !matchingMenu ? prevTotalAmount : prevTotalAmount + matchingMenu.price * quantity;
    }, 0);
  },
});

export default orderAmountCalculation;
