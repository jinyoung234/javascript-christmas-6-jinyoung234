class MenuFinder {
  #menuTable;

  constructor(menuTable) {
    this.#menuTable = menuTable;
  }

  static from(menuTable) {
    return new MenuFinder(menuTable);
  }

  findByMenuName(menuName, category) {
    const menusForSearch =
      this.#menuTable[category] ?? Object.values(this.#menuTable).flatMap((section) => section);

    return menusForSearch.find((menu) => menu.name === menuName);
  }

  isMenuInCategory(menuName, category) {
    return this.findByMenuName(menuName, category) !== undefined;
  }
}

export default MenuFinder;
