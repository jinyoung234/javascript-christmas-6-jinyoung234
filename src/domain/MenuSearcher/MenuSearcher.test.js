import MenuSearcher from './module.js';

describe('메뉴 찾기 테스트', () => {
  describe('findByMenuName 테스트', () => {
    test.each([
      {
        menuName: '티본스테이크',
        category: '스테이크',
        expectedMenu: { name: '티본스테이크', price: 55000 },
      },
      {
        menuName: '초코케이크',
        category: '디저트',
        expectedMenu: { name: '초코케이크', price: 15000 },
      },
      { menuName: '제로콜라', category: '음료', expectedMenu: { name: '제로콜라', price: 3000 } },
      { menuName: '초코케이크', category: '음료', expectedMenu: undefined },
    ])(
      '메뉴 이름이 $menuName이고, 카테고리가 $category일 경우 검색 결과는 $expectedMenu 이다.',
      ({ menuName, category, expectedMenu }) => {
        // given - when
        const menu = MenuSearcher.findByMenuName(menuName, category);

        // then
        expect(menu).toEqual(expectedMenu);
      },
    );
  });

  describe('isMenuInCategory 테스트', () => {
    test.each([
      { menuName: '티본스테이크', category: '메인', expectedResult: true },
      { menuName: '초코케이크', category: '디저트', expectedResult: true },
      { menuName: '제로콜라', category: '음료', expectedResult: true },
      { menuName: '초코케이크', category: '음료', expectedResult: false },
    ])(
      '메뉴 이름이 $menuName이고, 카테고리가 $category일 때, 실행 결과는 $expectedResult 이다.',
      ({ menuName, category, expectedResult }) => {
        // given - when
        const result = MenuSearcher.isMenuInCategory(menuName, category);

        // then
        expect(result).toBe(expectedResult);
      },
    );
  });
});
