import { TOptionalStats } from "@store/types";

export const mergeStats = (
  targetStats: TOptionalStats,
  incomeStats?: TOptionalStats | null
): TOptionalStats => {
  if (!incomeStats) return targetStats;
  const result = { ...targetStats };

  const incomeStatsKeys = Object.keys(incomeStats) as [keyof TOptionalStats];
  incomeStatsKeys.forEach((key) => {
    result[key] = (result[key] ?? 0) + incomeStats[key]!;
  });
  return result;
};
