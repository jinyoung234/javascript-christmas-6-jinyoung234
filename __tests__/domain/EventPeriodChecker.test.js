import EventPeriodChecker from '../../src/domain/EventPeriodChecker.js';

describe('이벤트 기간 확인 테스트', () => {
  const eventStartDate = new Date('2023-12-01');
  const eventEndDate = new Date('2023-12-31');

  test.each([
    { checkDate: '2023-12-01', expectedResult: true },
    { checkDate: '2023-12-15', expectedResult: true },
    { checkDate: '2023-12-31', expectedResult: true },
    { checkDate: '2023-11-30', expectedResult: false },
    { checkDate: '2024-01-01', expectedResult: false },
  ])('$checkDate의 이벤트 기간 여부는 $expectedResult 이다.', ({ checkDate, expectedResult }) => {
    // given
    const periodChecker = EventPeriodChecker.of(eventStartDate, eventEndDate);

    // when
    const isInPeriod = periodChecker.isEventPeriod(new Date(checkDate));

    // then
    expect(isInPeriod).toEqual(expectedResult);
  });
});
