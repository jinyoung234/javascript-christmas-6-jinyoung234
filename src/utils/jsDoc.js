/**
 * @typedef {object} CommonValidationType
 * @property {string} errorMessage - 유효성 검사 실패 시의 에러 메시지
 * @property {(inputValue : string) => boolean} isValid - 유효성 검사 함수
 */

/**
 * @typedef {object} CommonValidationTypes
 * @property {CommonValidationType} emptyValues - 입력 값이 비어있는지를 검사하기 위한 객체
 * @property {CommonValidationType} existSpaces - 입력 값에 공백이 포함되어 있는지를 검사하기 위한 객체
 */

/**
 * @typedef {object} VisitDateValidationType
 * @property {string} errorMessage - 유효성 검사 실패 시의 에러 메시지
 * @property {(visitDate: number) => void} isValid - 유효성 검사 함수
 */

/**
 * @typedef {object} VisitDateValidationTypes
 * @property {VisitDateValidationType} validInteger - 방문 일자가 양의 정수 인지 검사하기 위한 객체
 * @property {VisitDateValidationType} validDate - 방문 일자가 1 ~ 31 사이인지 검사하기 위한 객체
 */

/**
 * @typedef {object} MenuValidationType
 * @property {string} errorMessage - 유효성 검사 실패 시의 에러 메시지
 * @property {(orders: [string, number][]) => boolean} isValid - 주문 배열에 대한 유효성 검사 함수
 */

/**
 * @typedef {object} MenuValidationTypes
 * @property {MenuValidationType} existMenu - 주문 메뉴가 존재하는지 검사하기 위한 객체
 * @property {MenuValidationType} numberOfMenuCount - 주문 메뉴 수량이 숫자인지 검사하기 위한 객체
 * @property {MenuValidationType} singleMenuCount - 단일 메뉴의 수량이 최소 갯수 이상인지 검사하기 위한 객체
 * @property {MenuValidationType} validMenuCount - 전체 메뉴 수량이 유효한 범위 내에 있는지 검사하기 위한 객체
 * @property {MenuValidationType} noDuplicatesMenu - 주문 메뉴에 중복이 없는지 검사하기 위한 객체
 * @property {MenuValidationType} onlyDrinkOrders - 음료만 주문하는 경우를 검사하기 위한 객체
 */

/**
 * @typedef {object} OrdererInfo
 * @property {number | Date} visitDate - 방문 일
 * @property {number} totalOrderAmount - 총 주문 금액
 * @property {[string, number][]} orderMenuInfo - 주문한 메뉴 정보
 */

/**
 * @typedef {object} PromotionBenefitResult
 * @property {number} xmasBenefitAmount - 크리스마스 디데이 이벤트 할인 금액
 * @property {number} weekDayBenefitAmount - 평일 할인 금액
 * @property {number} weekendBenefitAmount - 주말 할인 금액
 * @property {number} specialBenefitAmount - 특별 할인 금액
 * @property {number} giftAmount - 증정 금액
 */

/**
 * @typedef {object} DayOfWeekBenefitCondition
 * @property {string} menuCategory - 할인 대상의 메뉴 카테고리
 * @property {number[]} days - 할인 하는 요일들 (ex - [5(금), 6(토)])
 */

/**
 * @typedef {{ordererInfo : {visitDate : Date, orderMenuInfo : [string, number][]}} & DayOfWeekBenefitCondition} CalculateBenefitForDayTypeParams
 */

/**
 * @typedef {object} PromotionReceipt
 * @property {number} totalBenefitAmount - 총 혜택 금액
 * @property {number} expectPaymentAmount - 예상 지출 금액
 */

/**
 * @typedef {"산타" | "별" | "트리"} EventBadge
 */

/**
 * @typedef {{orderMenuInfo : [string, number][], promotionResult : PromotionResult}} PrintPromotionResultParams
 */

/**
 * @typedef {object} PromotionResult
 * @property {number} totalOrderAmount - 총 주문 금액
 * @property {PromotionReceipt} promotionReceipt - 프로모션 후 영수증(총 혜택 금액 / 예상 지출 금액)
 * @property {PromotionBenefitResult} promotionBenefitResult - 각종 혜택 결과(크리스마스 디데이 혜택/주말 혜택/평일 혜택/특별 혜택/증정 이벤트)
 * @property {EventBadge | null} eventBadge - 이벤트 뱃지
 */

export {};
