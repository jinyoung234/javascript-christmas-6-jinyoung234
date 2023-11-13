import AppError from '../../src/errors/appError';
import { menuValidation } from '../../src/validations';

describe('menuValidation 테스트', () => {
  const startMenuValidation = (orders) => () => menuValidation.check(orders);

  describe('예외 테스트', () => {
    test.each([
      {
        orders: [['NotAMenuItem', 1]],
        expectedErrorMessage: menuValidation.validationTypes.existMenu.errorMessage,
      },
      {
        orders: [
          ['양송이수프', 0],
          ['아이스크림', 1],
        ],
        expectedErrorMessage: menuValidation.validationTypes.singleMenuCount.errorMessage,
      },
      {
        orders: Array.from({ length: 21 }, () => ['양송이수프', 1]),
        expectedErrorMessage: menuValidation.validationTypes.validMenuCount.errorMessage,
      },
      {
        orders: [
          ['제로콜라', 2],
          ['레드와인', 'a'],
        ],
        expectedErrorMessage: menuValidation.validationTypes.numberOfMenuCount.errorMessage,
      },
      {
        orders: [
          ['양송이수프', 1],
          ['양송이수프', 1],
        ],
        expectedErrorMessage: menuValidation.validationTypes.noDuplicatesMenu.errorMessage,
      },
      {
        orders: [
          ['제로콜라', 2],
          ['레드와인', 1],
        ],
        expectedErrorMessage: menuValidation.validationTypes.onlyDrinkOrders.errorMessage,
      },
      {
        orders: [['제로콜라', 2]],
        expectedErrorMessage: menuValidation.validationTypes.onlyDrinkOrders.errorMessage,
      },
    ])(
      '입력한 orders는 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ orders, expectedErrorMessage }) => {
        expect(startMenuValidation(orders)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('비 예외 테스트', () => {
    test.each([
      {
        orders: [['양송이수프', 1]],
      },
      {
        orders: [
          ['양송이수프', 1],
          ['바비큐립', 2],
          ['제로콜라', 1],
        ],
      },
      {
        orders: [
          ['양송이수프', 11],
          ['바비큐립', 8],
          ['제로콜라', 1],
        ],
      },
    ])('orders는 에러가 발생하지 않아야 한다.', ({ orders }) => {
      expect(startMenuValidation(orders)).not.toThrow();
    });
  });
});
