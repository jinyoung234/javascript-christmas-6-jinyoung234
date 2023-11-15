# Domain Documentation

## 도메인 계층의 클래스(객체) 구조도

<img width="609" alt="image" src="https://github.com/woowacourse-precourse/javascript-lotto-6/assets/87177577/24677451-b9f5-4c62-919f-f6dc3342bebf"/>

단, `PromotionResult`의 경우 객체가 아닌 결과물로써 존재하며 해당 데이터는 `PromotionResultService`에서 생성합니다.

<br/>

## OrderMenuAmount

> 주문 총액과 관련된 모듈로, 현재는 총 주문 금액을 계산하기 위해 설계한 모듈

| 메서드         | 매개 변수       | 반환 값  | 설명                                         |
| -------------- | --------------- | -------- | -------------------------------------------- |
| calculateTotal | `orderMenuInfo` | `number` | 주문한 메뉴의 총 금액을 계산하여 반환합니다. |

<br/>

## Menu Searcher

> 메뉴 테이블에 존재하는 메뉴를 찾기 위한 모듈

| 메서드           | 매개 변수                      | 반환 값               | 설명                                                             |
| ---------------- | ------------------------------ | --------------------- | ---------------------------------------------------------------- |
| findByMenuName   | `menuName, category(optional)` | `undefined \| object` | 주어진 카테고리에서 메뉴 이름에 해당하는 메뉴를 찾아 반환합니다. |
| isMenuInCategory | `menuName, category`           | `boolean`             | 주어진 카테고리에 메뉴 이름이 존재하는지 여부를 반환합니다.      |

<br/>

## DecemberPromotionPlan

> 12월의 프로모션 계획 들을(크리스마스, 주말/평일 할인, 특별 이벤트 및 증정 행사)통해 할인 혜택 들을 제공 하는 모듈

| 메서드                       | 매개 변수                                                                 | 반환 값                  | 설명                                                                        |
| ---------------------------- | ------------------------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------- |
| execute                      | `OrdererInfo { visitDate, totalOrderAmount, orderMenuInfo }`              | `PromotionBenefitResult` | 계획을 실행하여 각 프로모션 혜택의 금액 정보가 담긴 객체를 반환합니다.      |
| formatVisitDateForPromotion  | `visitDate`                                                               | `Date`                   | 방문 일자를 Date 객체로 변환합니다.                                         |
| isAvailablePromotion         | `{ dateInfo: { formatVisitDate, startDate, endDate }, totalOrderAmount }` | `boolean`                | 이벤트 기간과 최소 주문 금액 요건을 충족하는지 여부를 반환합니다.           |
| createPromotionBenefitResult | `OrdererInfo`                                                             | `PromotionBenefitResult` | 주문 정보를 바탕으로 각 프로모션 혜택의 금액 정보가 담긴 객체를 반환합니다. |
| calculateChristmasBenefit    | `OrdererInfo`                                                             | `number \| 0`            | 크리스마스 디데이 할인 금액을 계산합니다.                                   |
| calculateBenefitForDayType   | `CalculateBenefitForDayTypeParams`                                        | `number \| 0`            | 요일(주말/평일) 할인 금액을 계산합니다.                                     |
| calculateSpecialBenefit      | `{ visitDate: Date }`                                                     | `number \| 0`            | 특별 할인이 적용되는 금액을 계산합니다.                                     |
| calculateGiftEvent           | `{ totalOrderAmount: number }`                                            | `number \| 0`            | 증정 이벤트 적용 금액을 계산합니다.                                         |

<br/>

## PromotionReceipt

> 총 혜택 금액 및 예상 지출 금액을 묶어 프로모션 결과에 대한 영수증을 표현한 모듈

| 메서드                   | 매개 변수                                                          | 반환 값            | 설명                                                                |
| ------------------------ | ------------------------------------------------------------------ | ------------------ | ------------------------------------------------------------------- |
| issue                    | `{ promotionBenefitResult, totalOrderAmount }`                     | `PromotionReceipt` | 혜택 정보 및 총 주문 금액을 바탕으로 영수증을 발행합니다.           |
| calculateBenefitAmount   | `PromotionBenefitResult`                                           | `number`           | 주어진 프로모션 혜택 결과를 바탕으로 총 혜택 금액을 계산합니다.     |
| calculateExpectedPayment | `{ totalOrderAmount, promotionBenefitResult, totalBenefitAmount }` | `number`           | 총 주문 금액과 총 혜택 금액을 바탕으로 예상 지출 금액을 계산합니다. |

<br/>

## EventBadgeMaker

> 12월의 이벤트 뱃지를 생성하는 모듈

| 메서드                | 매개 변수            | 반환 값              | 설명                                                                |
| --------------------- | -------------------- | -------------------- | ------------------------------------------------------------------- |
| createByBenefitAmount | `totalBenefitAmount` | `EventBadge \| null` | 총 혜택 금액에 해당하는 이벤트 뱃지를 생성하거나 null을 반환합니다. |
| searchTargetBadges    | `totalBenefitAmount` | `Array`              | 총 혜택 금액에 해당되는 뱃지가 있는 배열을 반환합니다.              |

<br/>

`Custom Type` 들은 `src/utils/jsDoc.js`에서 확인이 가능합니다.
