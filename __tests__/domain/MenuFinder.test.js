import MenuFinder from '../../src/domain/MenuFinder.js';

describe('메뉴 찾기 테스트', () => {
  const sampleMenuTable = {
    메인: [{ name: '티본스테이크', price: 35000 }],
    디저트: [{ name: '초코케이크', price: 7000 }],
    음료: [{ name: '제로콜라', price: 2000 }],
  };

  describe('findByMenuName 테스트', () => {
    test.each([
      {
        menuName: '티본스테이크',
        category: '스테이크',
        expectedMenu: { name: '티본스테이크', price: 35000 },
      },
      {
        menuName: '초코케이크',
        category: '디저트',
        expectedMenu: { name: '초코케이크', price: 7000 },
      },
      { menuName: '제로콜라', category: '음료', expectedMenu: { name: '제로콜라', price: 2000 } },
      { menuName: '초코케이크', category: '음료', expectedMenu: undefined },
    ])(
      '메뉴 이름 $menuName과 카테고리 $category로 메뉴를 찾으면 $expectedMenu를 반환해야 한다',
      ({ menuName, category, expectedMenu }) => {
        // given
        const menuFinder = MenuFinder.from(sampleMenuTable);

        // when
        const menu = menuFinder.findByMenuName(menuName, category);

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
      '$menuName가 $category 카테고리에 속하는지 확인하면 $expectedResult를 반환해야 한다',
      ({ menuName, category, expectedResult }) => {
        // given
        const menuFinder = MenuFinder.from(sampleMenuTable);

        // when
        const result = menuFinder.isMenuInCategory(menuName, category);

        // then
        expect(result).toBe(expectedResult);
      },
    );
  });
});
