import { Console } from '@woowacourse/mission-utils';

import { INPUT_MESSAGE } from '../constants/messages/module.js';
import { SYMBOLS } from '../constants/symbols.js';

import { commonValidation, visitDateValidation, menuValidation } from '../validations/index.js';

const InputView = {
  async read(message) {
    const inputValue = await Console.readLineAsync(message);
    commonValidation.check(inputValue);

    return inputValue;
  },

  async readVisitDate() {
    const visitDate = Number(await this.read(INPUT_MESSAGE.visitDate));
    visitDateValidation.check(visitDate);

    return visitDate;
  },

  async readMenuInfo() {
    const parseMenuInfo = (menuString) => {
      const [menuName, quantity] = menuString.split(SYMBOLS.hyphen);
      return [menuName, Number(quantity)];
    };

    const menuInfo = Array.from(
      (await this.read(INPUT_MESSAGE.orderMenus)).split(SYMBOLS.comma),
      parseMenuInfo,
    );
    menuValidation.check(menuInfo);

    return menuInfo;
  },
};

export default InputView;
