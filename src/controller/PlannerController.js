import InputView from '../views/InputView.js';

import OutputView from '../views/OutputView.js';
import systemErrorHandler from '../errors/systemErrorHandler.js';
import eventResultService from '../service/eventResultService.js';

class PlannerController {
  #inputView = InputView;

  #outputView = OutputView;

  #service = eventResultService;

  #processEventResult({ visitDate, menuInfo }) {
    const eventResult = this.#service.createEventResult({
      visitDate,
      menuInfo,
    });
    this.#outputView.printEventResult({ menuInfo, eventResult });
  }

  async #processInputVisitDate() {
    const visitDate = await systemErrorHandler.retryOnErrors(
      this.#inputView.readVisitDate.bind(this.#inputView),
    );

    return visitDate < 10 ? new Date(`2023-12-0${visitDate}`) : new Date(`2023-12-${visitDate}`);
  }

  async #processInputMenuInfo() {
    return systemErrorHandler.retryOnErrors(this.#inputView.readMenuInfo.bind(this.#inputView));
  }

  async play() {
    const visitDate = await this.#processInputVisitDate();
    const menuInfo = await this.#processInputMenuInfo();

    this.#processEventResult({ visitDate, menuInfo });
  }
}

export default PlannerController;
