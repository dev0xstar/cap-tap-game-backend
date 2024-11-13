export const getLevelInfo = (
  amount: number
): { text: string; number: number } => {
  if (amount >= 0 && amount < 100_000) return { text: "Starter", number: 1 };
  if (amount >= 100_000 && amount < 500_000)
    return { text: "Bronze", number: 2 };
  if (amount >= 500_000 && amount < 5_000_000)
    return { text: "Silver", number: 3 };
  if (amount >= 5_000_000 && amount < 50_000_000)
    return { text: "Gold", number: 4 };
  if (amount >= 50_000_000 && amount < 500_000_000)
    return { text: "Sapphire", number: 5 };
  if (amount >= 500_000_000 && amount < 5_000_000_000)
    return { text: "Emerald", number: 6 };
  if (amount >= 5_000_000_000 && amount < 50_000_000_000)
    return { text: "Ruby", number: 7 };
  if (amount >= 50_000_000_000 && amount < 500_000_000_000)
    return { text: "Diamond", number: 8 };
  if (amount >= 500_000_000_000 && amount < 1_000_000_000_000)
    return { text: "Master", number: 9 };
  if (amount >= 1_000_000_000_000 && amount < 10_000_000_000_000)
    return { text: "Legend", number: 10 };

  if (amount >= 10_000_000_000_000) return { text: "God", number: 11 };

  return { text: "Starter", number: 1 };
};
