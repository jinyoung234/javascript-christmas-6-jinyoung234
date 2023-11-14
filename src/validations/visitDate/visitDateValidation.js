/**
 * @module visitDateValidation
 * 입력 값에 대한 예상 방문 날짜의 유효성 검사를 수행하는 모듈
 */
import { startValidation } from '../utils/startValidation.js';
import { DATE_RANGE } from './constant.js';

const INVALID_VISIT_DATE = '유효하지 않은 날짜입니다. 다시 입력해 주세요.';

const visitDateValidation = Object.freeze({
  /**
   * @type {import('../../utils/jsDoc.js').VisitDateValidationTypes}
   */
  validationTypes: Object.freeze({
    validInteger: Object.freeze({
      errorMessage: INVALID_VISIT_DATE,
      isValid(visitDate) {
        return !Number.isNaN(visitDate) && Number.isInteger(visitDate) && visitDate > 0;
      },
    }),

    validDate: Object.freeze({
      errorMessage: INVALID_VISIT_DATE,
      isValid(visitDate) {
        const { min, max } = DATE_RANGE;

        return visitDate >= min && visitDate <= max;
      },
    }),
  }),

  /**
   * @param {number} visitDate - 사용자의 예상 방문 날짜
   * @throws {import('../../errors/AppError/module.js').default} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(visitDate) {
    startValidation(this.validationTypes, visitDate);
  },
});

export default visitDateValidation;
