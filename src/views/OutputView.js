import { Console } from '@woowacourse/mission-utils';
import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/module.js';

const OutputView = {
  printStartGuideComments() {
    Console.print(OUTPUT_MESSAGE.guideComments);
  },

  printEndGuideComments(visitDate) {
    Console.print(FORMAT_MESSAGE.endGuideComments(visitDate));
  },

  printEventResult({
    menuInfo,
    eventResult: { totalOrderAmount, benefitAmountInfo, benefitInfo, eventBadge },
  }) {
    printOrderMenu(menuInfo);
    printTotalOrderAmount(totalOrderAmount);

    printGiftMenu(benefitInfo);
    printBenefitHistory(benefitInfo);
    printTotalBenefitAmount(benefitAmountInfo.totalRewardAmount);
    printExpectPaymentAmount(benefitAmountInfo.expectPaymentAmount);
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
  printSection(OUTPUT_MESSAGE.title.giftMenu, giftAmount !== 0 ? OUTPUT_MESSAGE.gift : null);
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
    totalRewardAmount !== 0
      ? `-${FORMAT_MESSAGE.amount(totalRewardAmount)}`
      : `${FORMAT_MESSAGE.amount(0)}`,
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
  Console.print(FORMAT_MESSAGE.title(config, title));

  if (content) Console.print(content);

  if (!content) Console.print(OUTPUT_MESSAGE.nothing);
}
