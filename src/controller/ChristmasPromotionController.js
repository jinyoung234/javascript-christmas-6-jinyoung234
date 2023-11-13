import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import eventResultService from '../service/EventResultService.js';
import systemErrorHandler from '../errors/systemErrorHandler/module.js';

const christmasPromotionController = {
  async play() {
    const { visitDate, menuInfo } = await processUserInput();

    processEventResult({ visitDate, menuInfo });
  },
};

async function processUserInput() {
  OutputView.printStartGuideComments();

  const visitDate = await systemErrorHandler.retryOnErrors(InputView.readVisitDate.bind(InputView));
  const menuInfo = await systemErrorHandler.retryOnErrors(InputView.readMenuInfo.bind(InputView));

  return { visitDate, menuInfo };
}

function processEventResult({ visitDate, menuInfo }) {
  const eventResult = eventResultService.createEventResult({ visitDate, menuInfo });

  OutputView.printEndGuideComments(visitDate);
  OutputView.printEventResult({ menuInfo, eventResult });
}

export default christmasPromotionController;
