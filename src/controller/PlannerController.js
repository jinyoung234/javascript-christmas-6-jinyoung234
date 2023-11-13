import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import eventResultService from '../service/eventResultService.js';
import systemErrorHandler from '../errors/systemErrorHandler.js';

const christmasPromotionController = {
  async play() {
    const visitDate = await processInputVisitDate();
    const menuInfo = await processInputMenuInfo();

    processEventResult({ visitDate, menuInfo });
  },
};

async function processInputVisitDate() {
  const visitDate = await systemErrorHandler.retryOnErrors(InputView.readVisitDate.bind(InputView));

  return visitDate < 10 ? new Date(`2023-12-0${visitDate}`) : new Date(`2023-12-${visitDate}`);
}

async function processInputMenuInfo() {
  return systemErrorHandler.retryOnErrors(InputView.readMenuInfo.bind(InputView));
}

function processEventResult({ visitDate, menuInfo }) {
  const eventResult = eventResultService.createEventResult({ visitDate, menuInfo });

  OutputView.printEventResult({ menuInfo, eventResult });
}

export default christmasPromotionController;
