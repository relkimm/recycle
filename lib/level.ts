// 레벨 시스템

export interface Level {
  level: number;
  name: string;
  icon: string;
  minMatches: number;
  maxMatches: number;
  color: string;
}

export const levels: Level[] = [
  { level: 1, name: '새싹', icon: '🌱', minMatches: 0, maxMatches: 4, color: '#10b981' },
  { level: 2, name: '일반', icon: '♻️', minMatches: 5, maxMatches: 9, color: '#06b6d4' },
  { level: 3, name: '열정', icon: '⚡', minMatches: 10, maxMatches: 19, color: '#f59e0b' },
  { level: 4, name: '베테랑', icon: '⭐', minMatches: 20, maxMatches: 34, color: '#8b5cf6' },
  { level: 5, name: '마스터', icon: '💎', minMatches: 35, maxMatches: 49, color: '#ec4899' },
  { level: 6, name: '전설', icon: '👑', minMatches: 50, maxMatches: Infinity, color: '#f59e0b' },
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
