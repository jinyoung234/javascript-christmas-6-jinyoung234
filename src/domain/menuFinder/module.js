import { PROMOTION_MENU_TABLE } from '../../constants/promotionSystem.js';

/**
 * @module menuFinder
 * 메뉴 테이블에 존재하는 메뉴를 찾기 위한 모듈
 */
const menuFinder = Object.freeze({
  /**
   * @param {string} menuName - 메뉴 이름
   * @param {string} category - 메뉴 카테고리
   * @returns {undefined | string} 매칭 되거나 매칭 되지 않은(undefined) 메뉴 이름
   */
  findByMenuName(menuName, category) {
    const menusForSearch =
      PROMOTION_MENU_TABLE[category] ??
      Object.values(PROMOTION_MENU_TABLE).flatMap((section) => section);

    return menusForSearch.find((menu) => menu.name === menuName);
  },

  /**
   * @param {string} menuName - 메뉴 이름
   * @param {string} category - 메뉴 카테고리
   * @returns {boolean} 카테고리에 있는 메뉴 이름이 실제 메뉴 테이블에 존재하는지에 대한 여부
   */
  isMenuInCategory(menuName, category) {
    return this.findByMenuName(menuName, category) !== undefined;
  },
});

export default menuFinder;
