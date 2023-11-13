import christmasPromotionController from './controller/PlannerController.js';

class App {
  #controller = christmasPromotionController;

  async run() {
    await this.#controller.play();
  }
}

export default App;
