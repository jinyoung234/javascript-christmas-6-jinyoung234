import InputView from '../views/InputView.js';
import systemErrorHandler from '../errors/systemErrorHandler.js';

class PlannerController {
  #inputView = InputView;

  async #processInputVisitDate() {
    return systemErrorHandler.retryOnErrors(this.#inputView.readVisitDate.bind(this.#inputView));
  }

  async #processInputMenuInfo() {
    return systemErrorHandler.retryOnErrors(this.#inputView.readMenuInfo.bind(this.#inputView));
  }

  async play() {
    const visitDate = await this.#processInputVisitDate();
    const menuInfo = await this.#processInputMenuInfo();
    console.log(menuInfo);
  }
}

export default PlannerController;
