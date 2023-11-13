import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import eventResultService from '../service/EventResultService.js';
import systemErrorHandler from '../errors/systemErrorHandler/module.js';

/**
 * @module christmasPromotionController
 * 크리스마스 프로모션 이벤트 관련 애플리케이션을 만들기 위한 컨트롤러
 */
const christmasPromotionController = {
  /**
   * @returns {Promise<void>}
   */
  async play() {
    const { visitDate, menuInfo } = await processUserInput();

    processEventResult({ visitDate, menuInfo });
  },
};

/**
 * @returns {Promise<{visitDate : number, menuInfo : [string, number][]}>} 유저가 입력한 방문 일자 및 메뉴 정보를 반환할 Promise 객체
 */
async function processUserInput() {
  OutputView.printStartGuideComments();

  const visitDate = await systemErrorHandler.retryOnErrors(InputView.readVisitDate.bind(InputView));
  const menuInfo = await systemErrorHandler.retryOnErrors(InputView.readMenuInfo.bind(InputView));

  return { visitDate, menuInfo };
}

/**
 * @param {{visitDate : number, menuInfo : [string, number][]}} params - 유저가 입력한 방문 일자 및 메뉴 정보
 * @returns {void}
 */
function processEventResult({ visitDate, menuInfo }) {
  const eventResult = eventResultService.createEventResult({ visitDate, menuInfo });

  OutputView.printEndGuideComments(visitDate);
  OutputView.printEventResult({ menuInfo, eventResult });
}

export default christmasPromotionController;
