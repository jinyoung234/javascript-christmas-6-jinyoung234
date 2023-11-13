import { BADGE_INFO } from './constant.js';

const eventBadgeGeneration = {
  generateBadge(totalRewardAmount) {
    const targetBadge = createTargetBadges(totalRewardAmount)?.at(-1);

    return targetBadge?.name ?? null;
  },
};

function createTargetBadges(totalRewardAmount) {
  return BADGE_INFO.filter((badge) => totalRewardAmount >= badge.amount).sort(
    (a, b) => a.amount - b.amount,
  );
}

export default eventBadgeGeneration;
