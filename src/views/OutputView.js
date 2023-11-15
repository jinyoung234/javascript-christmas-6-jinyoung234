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
   * @param {import('../utils/jsDoc.js').PrintPromotionResultParams} params - 주문한 메뉴 정보 및 이벤트 결과에 대한 정보가 담긴 객체
   */
  printPromotionResult({
    menuInfo,
    promotionResult: { totalOrderAmount, promotionReceipt, promotionBenefitResult, eventBadge },
  }) {
    printOrderMenu(menuInfo);
    printTotalOrderAmount(totalOrderAmount);

    printGiftMenu(promotionBenefitResult.giftAmount);
    printBenefitHistory(promotionBenefitResult);
    printTotalBenefitAmount(promotionReceipt.totalBenefitAmount);
    printExpectPaymentAmount(promotionReceipt.expectPaymentAmount);
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
 * @param {number} giftAmount - 증정 이벤트의 당첨 액수
 */
function printGiftMenu(giftAmount) {
  printSection(OUTPUT_MESSAGE.title.giftMenu, FORMAT_MESSAGE.gift(giftAmount));
}

/**
 * @param {import('../utils/jsDoc.js').PromotionBenefitResult} promotionBenefits - 혜택 정보 객체
 */
function printBenefitHistory(promotionBenefits) {
  printSection(
    OUTPUT_MESSAGE.title.benefitHistory,
    FORMAT_MESSAGE.benefitHistory(promotionBenefits),
  );
}

/**
 * @param {number} totalBenefitAmount - 총 혜택 금액
 */
function printTotalBenefitAmount(totalBenefitAmount) {
  printSection(
    OUTPUT_MESSAGE.title.totalBenefitAmount,
    FORMAT_MESSAGE.totalBenefitAmount(totalBenefitAmount),
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
  printSection(OUTPUT_MESSAGE.title.eventBadge, FORMAT_MESSAGE.eventBadge(eventBadge));
}

/**
 * @param {string} title - 출력할 제목
 * @param {string} content - 출력할 내용
 * @param {{newLine : boolean}} config - 추가 옵션 객체
 */
function printSection(title, content, config = { newLine: true }) {
  Console.print(FORMAT_MESSAGE.title(config, title));

  Console.print(content);
}
