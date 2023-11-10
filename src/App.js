import PlannerController from './controller/PlannerController.js';

class App {
  #controller = new PlannerController();

  async run() {
    await this.#controller.play();
  }
}

export default App;
