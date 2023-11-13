import { PROMOTION_MENU_TABLE } from '../../constants/promotionSystem.js';

const menuFinder = Object.freeze({
  findByMenuName(menuName, category) {
    const menusForSearch =
      PROMOTION_MENU_TABLE[category] ??
      Object.values(PROMOTION_MENU_TABLE).flatMap((section) => section);

    return menusForSearch.find((menu) => menu.name === menuName);
  },

  isMenuInCategory(menuName, category) {
    return this.findByMenuName(menuName, category) !== undefined;
  },
});

export default menuFinder;
