const menuFinder = Object.freeze({
  menuTable: Object.freeze({
    애피타이저: [
      {
        name: '양송이수프',
        price: 6000,
      },
      {
        name: '타파스',
        price: 5500,
      },
      {
        name: '시저샐러드',
        price: 8000,
      },
    ],
    메인: [
      {
        name: '티본스테이크',
        price: 55000,
      },
      {
        name: '바비큐립',
        price: 54000,
      },
      {
        name: '해산물파스타',
        price: 35000,
      },
      {
        name: '크리스마스파스타',
        price: 25000,
      },
    ],
    디저트: [
      {
        name: '초코케이크',
        price: 15000,
      },
      {
        name: '아이스크림',
        price: 5000,
      },
    ],
    음료: [
      {
        name: '제로콜라',
        price: 3000,
      },
      {
        name: '레드와인',
        price: 60000,
      },
      {
        name: '샴페인',
        price: 25000,
      },
    ],
  }),

  findByMenuName(menuName, category) {
    const menusForSearch =
      this.menuTable[category] ?? Object.values(this.menuTable).flatMap((section) => section);

    return menusForSearch.find((menu) => menu.name === menuName);
  },

  isMenuInCategory(menuName, category) {
    return this.findByMenuName(menuName, category) !== undefined;
  },
});

export default menuFinder;
