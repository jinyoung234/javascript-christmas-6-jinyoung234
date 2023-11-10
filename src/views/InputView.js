import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../constants/messages.js';
import { commonValidation, visitDateValidation } from '../validations/index.js';
import { SYMBOLS } from '../constants/symbols.js';
import menuValidation from '../validations/menuValidation.js';

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
    const menuInfo = (await this.read(INPUT_MESSAGE.orderMenus))
      .split(SYMBOLS.comma)
      .map((inputMenuInfo) => inputMenuInfo.split(SYMBOLS.hyphen))
      .map(([menuName, count]) => [menuName, Number(count)]);
    menuValidation.check(menuInfo);

    return menuInfo;
  },
};

export default InputView;
