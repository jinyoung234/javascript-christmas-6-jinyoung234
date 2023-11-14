import AppError from '../../errors/AppError/module';
import { VisitDateValidator } from '..';

describe('VisitDateValidator 테스트', () => {
  const startVisitDateValidator = (visitDate) => () => VisitDateValidator.check(visitDate);

  describe('예외 테스트', () => {
    test.each([
      {
        visitDate: 0,
        expectedErrorMessage: VisitDateValidator.validationTypes.validDate.errorMessage,
      },
      {
        visitDate: 32,
        expectedErrorMessage: VisitDateValidator.validationTypes.validDate.errorMessage,
      },
      {
        visitDate: -1,
        expectedErrorMessage: VisitDateValidator.validationTypes.validInteger.errorMessage,
      },
      {
        visitDate: NaN,
        expectedErrorMessage: VisitDateValidator.validationTypes.validInteger.errorMessage,
      },
      {
        visitDate: 15.5,
        expectedErrorMessage: VisitDateValidator.validationTypes.validInteger.errorMessage,
      },
    ])(
      'visitDate가 "$visitDate"일 때 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ visitDate, expectedErrorMessage }) => {
        // given - when - then
        expect(startVisitDateValidator(visitDate)).toThrow(new AppError(expectedErrorMessage));
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
      expect(startVisitDateValidator(visitDate)).not.toThrow();
    });
  });
});
