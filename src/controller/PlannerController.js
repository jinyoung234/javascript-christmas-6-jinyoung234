import systemErrorHandler from '../errors/systemErrorHandler.js';
import InputView from '../views/InputView.js';

class PlannerController {
  #inputView = InputView;

  async #processInputVisitDate() {
    return systemErrorHandler.retryOnErrors(this.#inputView.readVisitDate.bind(this.#inputView));
  }

  async play() {
    const visitDate = await this.#processInputVisitDate();
    console.log(visitDate);
  }
}

export default PlannerController;
