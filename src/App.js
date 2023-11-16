import ChristmasPromotionController from './controller/ChristmasPromotionController.js';

class App {
  #controller = ChristmasPromotionController;

  async run() {
    await this.#controller.play();
  }
}

export default App;
