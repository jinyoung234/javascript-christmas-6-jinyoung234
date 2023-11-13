import { Console } from '@woowacourse/mission-utils';
import { FORMAT_MESSAGE, OUTPUT_MESSAGE } from '../constants/messages/module.js';

/**
 * @module OutputView
 * 터미널에 값을 출력 하기 위한 모듈
 */
const OutputView = {
  printStartGuideComments() {
    Console.print(OUTPUT_MESSAGE.guideComments);
  },

  /**
   * @param {number} visitDate 방문 일자
   */
  printEndGuideComments(visitDate) {
    Console.print(FORMAT_MESSAGE.endGuideComments(visitDate));
  },

  /**
   * @param {import('../utils/jsDoc.js').PrintEventResultParams} params - 주문한 메뉴 정보 및 이벤트 결과에 대한 정보가 담긴 객체
   */
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

/**
 * @param {[string, number][]} menuInfo - 주문한 메뉴 정보
 */
function printOrderMenu(menuInfo) {
  printSection(OUTPUT_MESSAGE.title.orderMenu, FORMAT_MESSAGE.orderMenus(menuInfo));
}

/**
 * @param {number} totalOrderAmount - 총 주문 금액
 */
function printTotalOrderAmount(totalOrderAmount) {
  printSection(OUTPUT_MESSAGE.title.totalOrderAmount, FORMAT_MESSAGE.amount(totalOrderAmount), {
    newLine: false,
  });
}

/**
 * @param {{giftAmount : number}} params - 증정 금액이 담긴 객체
 */
function printGiftMenu({ giftAmount }) {
  printSection(OUTPUT_MESSAGE.title.giftMenu, giftAmount !== 0 ? OUTPUT_MESSAGE.gift : null);
}

/**
 * @param {import('../utils/jsDoc.js').BenefitInfo} benefitInfo - 혜택 정보 객체
 */
function printBenefitHistory(benefitInfo) {
  printSection(
    OUTPUT_MESSAGE.title.benefitHistory,
    FORMAT_MESSAGE.benefitHistory(benefitInfo) || null,
  );
}

/**
 * @param {number} totalRewardAmount - 총 혜택 금액
 */
function printTotalBenefitAmount(totalRewardAmount) {
  printSection(
    OUTPUT_MESSAGE.title.totalBenefitAmount,
    totalRewardAmount !== 0
      ? `-${FORMAT_MESSAGE.amount(totalRewardAmount)}`
      : `${FORMAT_MESSAGE.amount(0)}`,
  );
}

/**
 * @param {number} expectPaymentAmount - 예상 지출 금액
 */
function printExpectPaymentAmount(expectPaymentAmount) {
  printSection(
    OUTPUT_MESSAGE.title.expectPaymentAmount,
    FORMAT_MESSAGE.amount(expectPaymentAmount),
  );
}

/**
 * @param {import('../utils/jsDoc.js').EventBadge | null} eventBadge - 이벤트 뱃지
 */
function printEventBadge(eventBadge) {
  printSection(OUTPUT_MESSAGE.title.eventBadge, eventBadge);
}

/**
 * @param {string} title - 출력할 제목
 * @param {string} content - 출력할 내용
 * @param {{newLine : boolean}} config - 추가 옵션 객체
 */
function printSection(title, content, config = { newLine: true }) {
  Console.print(FORMAT_MESSAGE.title(config, title));

  if (content) Console.print(content);

  if (!content) Console.print(OUTPUT_MESSAGE.nothing);
}
