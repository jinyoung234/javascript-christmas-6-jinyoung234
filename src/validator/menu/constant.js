// constant.js는 테스트 코드 및 menuValidation.js 에서만 사용

export const NEED_MENU_CATEGORY = ['애피타이저', '메인', '디저트', '음료'];

export const ORDER_QUANTITY = Object.freeze({
  min: 1,
  max: 20,
});

export const MENU_ORDER_PATTERN = /^[가-힣]+-[0-9]+(?:,[가-힣]+-[0-9]+)*$/;

export const INVALID_MENU_MESSAGE = '유효하지 않은 주문입니다. 다시 입력해 주세요.';
