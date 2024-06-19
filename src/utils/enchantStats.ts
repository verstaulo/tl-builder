import ENCHANT_PATTERNS from "@store/data/ENCHANT_PATTERNS.json";
import { TEnchantPatterns, TOptionalStats } from "@store/types";

const enchantPatterns: TEnchantPatterns = ENCHANT_PATTERNS;

export const enchantEquipmentStats = (
  stats: TOptionalStats,
  enchantPattern: keyof TEnchantPatterns,
  itemLvl: number
): TOptionalStats => {
  const resultStats: TOptionalStats = {};

  const filteredKeys = Object.keys(stats).filter((key) => {
    if (Object.keys(enchantPatterns[enchantPattern]).includes(key)) return key;
  });

  filteredKeys.forEach((statkey) => {
    resultStats[statkey as keyof TOptionalStats] =
      enchantPatterns[enchantPattern][statkey][itemLvl];
  });
  return resultStats;
};
