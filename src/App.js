import christmasPromotionController from './controller/ChristmasPromotionController.js';

class App {
  #controller = christmasPromotionController;

  async run() {
    await this.#controller.play();
  }
}

export default App;
