import AppError from '../../errors/AppError/module';
import { visitDateValidation } from '..';

describe('visitDateValidation 테스트', () => {
  const startVisitDateValidation = (visitDate) => () => visitDateValidation.check(visitDate);

  describe('예외 테스트', () => {
    test.each([
      {
        visitDate: 0,
        expectedErrorMessage: visitDateValidation.validationTypes.validDate.errorMessage,
      },
      {
        visitDate: 32,
        expectedErrorMessage: visitDateValidation.validationTypes.validDate.errorMessage,
      },
      {
        visitDate: -1,
        expectedErrorMessage: visitDateValidation.validationTypes.validInteger.errorMessage,
      },
      {
        visitDate: NaN,
        expectedErrorMessage: visitDateValidation.validationTypes.validInteger.errorMessage,
      },
      {
        visitDate: 15.5,
        expectedErrorMessage: visitDateValidation.validationTypes.validInteger.errorMessage,
      },
    ])(
      'visitDate가 "$visitDate"일 때 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ visitDate, expectedErrorMessage }) => {
        // given - when - then
        expect(startVisitDateValidation(visitDate)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('비 예외 테스트', () => {
    test.each([
      {
        visitDate: 1,
      },
      {
        visitDate: 15,
      },
      {
        visitDate: 31,
      },
    ])('visitDate이 $visitDate일 때 에러가 발생하지 않는다.', ({ visitDate }) => {
      // given - when - then
      expect(startVisitDateValidation(visitDate)).not.toThrow();
    });
  });
});
