import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import PromotionResultService from '../service/PromotionResultService.js';
import ErrorHandler from '../errors/ErrorHandler/module.js';

/**
 * @module ChristmasPromotionController
 * 크리스마스 프로모션 이벤트 관련 애플리케이션의 흐름 제어를 담당
 */
const ChristmasPromotionController = {
  /**
   * @returns {Promise<void>}
   */
  async play() {
    const { visitDate, menuInfo } = await processUserInput();

    processPromotionResult({ visitDate, menuInfo });
  },
};

/**
 * @returns {Promise<{visitDate : number, menuInfo : [string, number][]}>} 유저가 입력한 방문 일자 및 메뉴 정보를 반환할 Promise 객체
 */
async function processUserInput() {
  OutputView.printStartGuideComments();

  const visitDate = await ErrorHandler.retryOnErrors(InputView.readVisitDate.bind(InputView));
  const menuInfo = await ErrorHandler.retryOnErrors(InputView.readMenuInfo.bind(InputView));

  return { visitDate, menuInfo };
}

/**
 * @param {{visitDate : number, menuInfo : [string, number][]}} params - 유저가 입력한 방문 일자 및 메뉴 정보
 * @returns {void}
 */
function processPromotionResult({ visitDate, menuInfo }) {
  const promotionResult = PromotionResultService.createPromotionResult({ visitDate, menuInfo });

  OutputView.printEndGuideComments(visitDate);
  OutputView.printPromotionResult({ menuInfo, promotionResult });
}

export default ChristmasPromotionController;
