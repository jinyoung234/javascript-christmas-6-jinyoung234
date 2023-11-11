const eventBadgeGeneration = {
  generateBadge(totalRewardAmount) {
    const targetBadge = createTargetBadges(totalRewardAmount)?.at(-1);

    return targetBadge?.name ?? null;
  },
};

function createTargetBadges(totalRewardAmount) {
  return [
    { name: '산타', amount: 20_000 },
    { name: '트리', amount: 10_000 },
    { name: '별', amount: 5_000 },
  ]
    .filter((badge) => totalRewardAmount >= badge.amount)
    .sort((a, b) => a.amount - b.amount);
}

export default eventBadgeGeneration;
