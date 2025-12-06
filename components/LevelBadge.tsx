import { getUserLevel } from '@/lib/level';

interface LevelBadgeProps {
  matchCount: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelBadge({ matchCount, size = 'md' }: LevelBadgeProps) {
  const level = getUserLevel(matchCount);

  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-[12px] px-2 py-0.5',
    lg: 'text-[14px] px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center bg-[#f7f8fa] text-[#191f28] rounded-[6px] font-semibold ${sizeClasses[size]}`}
    >
      Lv.{level.level}
    </span>
  );
}
