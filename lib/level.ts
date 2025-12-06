// 레벨 시스템

export interface Level {
  level: number;
  minMatches: number;
  maxMatches: number;
}

export const levels: Level[] = [
  { level: 1, minMatches: 0, maxMatches: 4 },
  { level: 2, minMatches: 5, maxMatches: 9 },
  { level: 3, minMatches: 10, maxMatches: 19 },
  { level: 4, minMatches: 20, maxMatches: 34 },
  { level: 5, minMatches: 35, maxMatches: 49 },
  { level: 6, minMatches: 50, maxMatches: Infinity },
];

export function getUserLevel(matchCount: number): Level {
  return levels.find(
    (level) => matchCount >= level.minMatches && matchCount <= level.maxMatches
  ) || levels[0];
}

export function getLevelProgress(matchCount: number): {
  current: Level;
  next: Level | null;
  progress: number;
  remaining: number;
} {
  const current = getUserLevel(matchCount);
  const next = levels.find((level) => level.level === current.level + 1) || null;

  if (!next) {
    return {
      current,
      next: null,
      progress: 100,
      remaining: 0,
    };
  }

  const rangeSize = next.minMatches - current.minMatches;
  const currentProgress = matchCount - current.minMatches;
  const progress = Math.min((currentProgress / rangeSize) * 100, 100);
  const remaining = next.minMatches - matchCount;

  return {
    current,
    next,
    progress,
    remaining,
  };
}
