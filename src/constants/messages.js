export const INPUT_MESSAGE = Object.freeze({
  visitDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  orderMenus:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
  title: Object.freeze({
    orderMenu: '주문 메뉴',
    totalOrderAmount: '할인 전 총주문 금액',
    giftMenu: '증정 메뉴',
    benefitHistory: '혜택 내역',
    totalBenefitAmount: '총혜택 금액',
    expectPaymentAmount: '할인 후 예상 결제 금액',
    eventBadge: '12월 이벤트 배지',
  }),

  discountLabels: Object.freeze({
    xmasDiscountAmount: '크리스마스 디데이 할인',
    weekDayDiscountAmount: '평일 할인',
    weekendDiscountAmount: '주말 할인',
    specialDiscountAmount: '특별 할인',
    giftAmount: '증정 이벤트',
  }),
});

export const FORMAT_MESSAGE = Object.freeze({
  orderMenus(menuInfo) {
    return menuInfo.map(([menuName, quantity]) => `${menuName} ${quantity}개\n`).join('');
  },

  amount(amount) {
    return `${amount.toLocaleString()}원`;
  },

  benefitHistory(benefitInfo) {
    return Object.entries(benefitInfo)
      .reduce(
        (acc, [benefitName, amount]) =>
          amount !== 0
            ? [...acc, `${OUTPUT_MESSAGE.discountLabels[benefitName]}: -${this.amount(amount)}`]
            : acc,
        [],
      )
      .join('\n');
  },
});
