import { Console } from '@woowacourse/mission-utils';
import { FORMAT_MESSAGE } from '../constants/messages.js';

const OutputView = {
  printOrderMenu(menuInfo) {
    Console.print('\n<주문 메뉴>');
    const formatMenu = menuInfo
      .map(([menuName, quantity]) => `${menuName} ${quantity}개\n`)
      .join('');
    Console.print(formatMenu);
  },

  printTotalOrderAmount(totalOrderAmount) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${totalOrderAmount.toLocaleString()}원`);
  },

  printGiftMenu({ giftAmount }) {
    Console.print('\n<증정 메뉴>');
    if (giftAmount === 0) {
      Console.print('없음');
      return;
    }
    Console.print(`샴페인 1개`);
  },

  printRewardHistory(discountInfo) {
    Console.print('\n<혜택 내역>');

    const entries = Object.entries(discountInfo);
    if (entries.every(([, amount]) => amount === 0)) {
      Console.print('없음');
      return;
    }

    entries.forEach(([key, amount]) => {
      if (amount !== 0) {
        Console.print(`${FORMAT_MESSAGE.discountLabels[key]}: -${amount.toLocaleString()}원`);
      }
    });
  },

  printTotalRewardAmount(totalRewardAmount) {
    Console.print('\n<총혜택 금액>');
    if (totalRewardAmount === 0) {
      Console.print('없음');
      return;
    }
    Console.print(`-${totalRewardAmount.toLocaleString()}원`);
  },

  printExpectPaymentAmount(expectPaymentAmount) {
    Console.print('\n<할인 후 예상 결제 금액>');
    if (expectPaymentAmount === 0) {
      Console.print('없음');
      return;
    }
    Console.print(`${expectPaymentAmount.toLocaleString()}원`);
  },

  printEventBadge(eventBadge) {
    Console.print('\n<12월 이벤트 배지>');
    if (!eventBadge) {
      Console.print('없음');
      return;
    }
    Console.print(eventBadge);
  },

  printEventResult({
    menuInfo,
    eventResult: { totalOrderAmount, rewardAmountInfo, rewardInfo, eventBadge },
  }) {
    this.printOrderMenu(menuInfo);
    this.printTotalOrderAmount(totalOrderAmount);
    this.printGiftMenu(rewardInfo);
    this.printRewardHistory(rewardInfo);
    this.printTotalRewardAmount(rewardAmountInfo.totalRewardAmount);
    this.printExpectPaymentAmount(rewardAmountInfo.expectPaymentAmount);
    this.printEventBadge(eventBadge);
  },
};

export default OutputView;
