import { BADGE_INFO } from './constant.js';

/**
 * @module eventBadgeGeneration
 * 이벤트 뱃지를 생성하는 모듈
 */
const eventBadgeGeneration = {
  /**
   * @param {number} totalRewardAmount - 총 혜택 금액
   * @returns {import('../../utils/jsDoc.js').EventBadge | null} 혜택 금액에 해당하는 뱃지 or null
   */
  generateBadge(totalRewardAmount) {
    const targetBadge = createTargetBadges(totalRewardAmount)?.at(-1);

    return targetBadge?.name ?? null;
  },
};

export default eventBadgeGeneration;

/**
 *
 * @param {number} totalRewardAmount - 총 혜택 금액
 * @returns {Array} 혜택 금액에 해당 되는 뱃지가 있는 배열 or 빈 배열
 */
function createTargetBadges(totalRewardAmount) {
  return BADGE_INFO.filter((badge) => totalRewardAmount >= badge.amount).sort(
    (a, b) => a.amount - b.amount,
  );
}
