/**
 * @module visitDateValidation
 * 입력 값에 대한 예상 방문 날짜의 유효성 검사를 수행하는 모듈
 */
import { startValidation } from './utils/startValidation.js';

const visitDateValidation = Object.freeze({
  validationTypes: Object.freeze({
    validInteger: Object.freeze({
      errorMessage: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      isValid(visitDate) {
        return !Number.isNaN(visitDate) && Number.isInteger(visitDate) && visitDate >= 0;
      },
    }),

    validDate: Object.freeze({
      errorMessage: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
      isValid(visitDate) {
        return visitDate >= 1 && visitDate <= 31;
      },
    }),
  }),

  /**
   * @param {number} visitDate - 사용자의 예상 방문 날짜
   * @throws {import('../../error/AppError/AppError.module.js').default} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(visitDate) {
    startValidation(this.validationTypes, visitDate);
  },
});

export default visitDateValidation;
