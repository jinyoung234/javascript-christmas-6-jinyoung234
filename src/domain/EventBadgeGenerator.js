class EventBadgeGenerator {
  #totalRewardAmount;

  #badgeInfo = [
    { name: '산타', amount: 20000 },
    { name: '트리', amount: 10000 },
    { name: '별', amount: 5000 },
  ];

  constructor(totalRewardAmount) {
    this.#totalRewardAmount = totalRewardAmount;
  }

  static from(totalRewardAmount) {
    return new EventBadgeGenerator(totalRewardAmount);
  }

  generateBadge() {
    const targetBadges = [...this.#badgeInfo]
      .filter((badge) => this.#totalRewardAmount >= badge.amount)
      .sort((a, b) => a.amount - b.amount);

    return targetBadges.at(-1)?.name ?? null;
  }
}

export default EventBadgeGenerator;
