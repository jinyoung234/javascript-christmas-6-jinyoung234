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
 * @property {MenuValidationType} menuCategory - 주문 메뉴가 유효한 범주에 속하는지 검사하기 위한 객체
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
 * @property {[string, number][]} menuInfo - 주문한 메뉴 정보
 */

/**
 * @typedef {object} BenefitInfo
 * @property {number} xmasDiscountAmount - 크리스마스 디데이 이벤트 할인 금액
 * @property {number} weekDayDiscountAmount - 평일 할인 금액
 * @property {number} weekendDiscountAmount - 주말 할인 금액
 * @property {number} specialDiscountAmount - 특별 할인 금액
 * @property {number} giftAmount - 증정 금액
 */

/**
 * @typedef {object} DayOfWeekBenefitCondition
 * @property {string} menuCategory - 할인 대상의 메뉴 카테고리
 * @property {number[]} days - 할인 하는 요일들 (ex - [5(금), 6(토)])
 */

/**
 * @typedef {{ordererInfo : {visitDate : Date, menuInfo : [string, number][]}} & DayOfWeekBenefitCondition} CalculateDiscountForDayTypeParams
 */

/**
 * @typedef {{benefitInfo : BenefitInfo, totalOrderAmount : number}} CreateBenefitAmountInfoParams
 */

/**
 * @typedef {object} BenefitAmountInfo
 * @property {number} totalRewardAmount - 총 혜택 금액
 * @property {number} expectPaymentAmount - 예상 지출 금액
 */

/**
 * @typedef {"산타" | "별" | "트리"} EventBadge
 */

/**
 * @typedef {{menuInfo : [string, number][], eventResult : EventResult}} PrintEventResultParams
 */

/**
 * @typedef {object} EventResult
 * @property {number} totalOrderAmount - 총 주문 금액
 * @property {BenefitAmountInfo} benefitAmountInfo - 평일 할인 금액
 * @property {BenefitInfo} benefitInfo - 혜택 정보
 * @property {EventBadge | null} eventBadge - 이벤트 뱃지
 */

export {};
