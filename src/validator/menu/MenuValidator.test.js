import AppError from '../../errors/AppError/module';
import { MenuValidator } from '..';
import { INVALID_MENU_MESSAGE } from './constant';

describe('메뉴 관련 유효성 검사 테스트', () => {
  const startMenuValidator = (orders) => () => MenuValidator.check(orders);

  describe('예외 테스트', () => {
    test.each([
      {
        orders: '양송이수프-1-아이스크림-1',
        expectedErrorMessage: INVALID_MENU_MESSAGE,
      },
      {
        orders: '양송이수프:1,아이스크림:1',
        expectedErrorMessage: INVALID_MENU_MESSAGE,
      },
      {
        orders: 'NotAMenuItem-1',
        expectedErrorMessage: MenuValidator.validationTypes.existMenu.errorMessage,
      },
      {
        orders: '양송이수프-0,아이스크림-1',
        expectedErrorMessage: MenuValidator.validationTypes.singleMenuCount.errorMessage,
      },
      {
        orders: '양송이수프-20,아이스크림-1',
        expectedErrorMessage: MenuValidator.validationTypes.validMenuCount.errorMessage,
      },
      {
        orders: '제로콜라-2,레드와인-a',
        expectedErrorMessage: MenuValidator.validationTypes.numberOfMenuCount.errorMessage,
      },
      {
        orders: '양송이수프-1,양송이수프-1',
        expectedErrorMessage: MenuValidator.validationTypes.noDuplicatesMenu.errorMessage,
      },
      {
        orders: '제로콜라-2,레드와인-1',
        expectedErrorMessage: MenuValidator.validationTypes.onlyDrinkOrders.errorMessage,
      },
      {
        orders: '제로콜라-2',
        expectedErrorMessage: MenuValidator.validationTypes.onlyDrinkOrders.errorMessage,
      },
    ])(
      '입력한 orders는 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ orders, expectedErrorMessage }) => {
        expect(startMenuValidator(orders)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('비 예외 테스트', () => {
    test.each([
      {
        orders: '양송이수프-1',
      },
      {
        orders: '양송이수프-1,바비큐립-2,제로콜라-1',
      },
      {
        orders: '양송이수프-11,바비큐립-8,제로콜라-1',
      },
    ])('orders는 에러가 발생하지 않아야 한다.', ({ orders }) => {
      expect(startMenuValidator(orders)).not.toThrow();
    });
  });
});
