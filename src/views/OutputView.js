import { Console } from '@woowacourse/mission-utils';
import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages.js';

const OutputView = {
  printEventResult({
    menuInfo,
    eventResult: { totalOrderAmount, rewardAmountInfo, benefitInfo, eventBadge },
  }) {
    printOrderMenu(menuInfo);
    printTotalOrderAmount(totalOrderAmount);
    printGiftMenu(benefitInfo);
    printBenefitHistory(benefitInfo);
    printTotalBenefitAmount(rewardAmountInfo.totalRewardAmount);
    printExpectPaymentAmount(rewardAmountInfo.expectPaymentAmount);
    printEventBadge(eventBadge);
  },
};

export default OutputView;

function printOrderMenu(menuInfo) {
  printSection(OUTPUT_MESSAGE.title.orderMenu, FORMAT_MESSAGE.orderMenus(menuInfo));
}

function printTotalOrderAmount(totalOrderAmount) {
  printSection(OUTPUT_MESSAGE.title.totalOrderAmount, FORMAT_MESSAGE.amount(totalOrderAmount), {
    newLine: false,
  });
}

function printGiftMenu({ giftAmount }) {
  printSection(OUTPUT_MESSAGE.title.giftMenu, giftAmount !== 0 ? '샴페인 1개' : null);
}

function printBenefitHistory(benefitInfo) {
  printSection(
    OUTPUT_MESSAGE.title.benefitHistory,
    FORMAT_MESSAGE.benefitHistory(benefitInfo) || null,
  );
}

function printTotalBenefitAmount(totalRewardAmount) {
  printSection(
    OUTPUT_MESSAGE.title.totalBenefitAmount,
    totalRewardAmount !== 0 ? `-${FORMAT_MESSAGE.amount(totalRewardAmount)}` : null,
  );
}

function printExpectPaymentAmount(expectPaymentAmount) {
  printSection(
    OUTPUT_MESSAGE.title.expectPaymentAmount,
    expectPaymentAmount !== 0 ? `${FORMAT_MESSAGE.amount(expectPaymentAmount)}` : null,
  );
}

function printEventBadge(eventBadge) {
  printSection(OUTPUT_MESSAGE.title.eventBadge, eventBadge);
}

function printSection(title, content, config = { newLine: true }) {
  Console.print(`${config.newLine ? '\n' : ''}<${title}>`);

  if (content) Console.print(content);

  if (!content) Console.print('없음');
}
