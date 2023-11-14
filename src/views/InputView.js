import { Console } from '@woowacourse/mission-utils';

import { INPUT_MESSAGE } from '../constants/messages/module.js';

import { commonValidation, visitDateValidation, MenuValidator } from '../validator/index.js';
import { extractOrderMenuInfos } from '../validator/menu/utils.js';

/**
 * @module InputView
 * 유저의 입력을 관리하기 위한 모듈
 */
const InputView = {
  /**
   * @param {string} message - 입력 안내 멘트를 출력할 메시지
   * @returns {string} 입력 값
   */
  async read(message) {
    const inputValue = await Console.readLineAsync(message);
    commonValidation.check(inputValue);

    return inputValue;
  },

  /**
   * @returns {number} 유저가 입력한 방문 일자
   */
  async readVisitDate() {
    const visitDate = Number(await this.read(INPUT_MESSAGE.visitDate));
    visitDateValidation.check(visitDate);

    return visitDate;
  },

  /**
   * @returns {[string, number][]} 유저가 입력한 메뉴 및 수량 들의 배열
   */
  async readOrderMenuInfo() {
    const inputOrderMenuInfo = await this.read(INPUT_MESSAGE.orderMenus);
    MenuValidator.check(inputOrderMenuInfo);

    return extractOrderMenuInfos(inputOrderMenuInfo);
  },
};

export default InputView;
