import { getLevelProgress } from '@/lib/level';

interface LevelProgressProps {
  matchCount: number;
}

export default function LevelProgress({ matchCount }: LevelProgressProps) {
  const { current, next, progress, remaining } = getLevelProgress(matchCount);

  return (
    <div className="bg-[#f7f8fa] border border-[#e5e8eb] rounded-[14px] p-5">
      {/* Level Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[24px]">{current.icon}</span>
          <div>
            <div className="text-[17px] font-bold text-[#191f28]">
              Lv.{current.level} {current.name}
            </div>
            {next && (
              <div className="text-[12px] text-[#8b95a1]">
                다음 레벨까지 {remaining}건
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[20px] font-bold text-[#191f28]">
            {matchCount}건
          </div>
          <div className="text-[11px] text-[#8b95a1]">완료</div>
        </div>
      </div>

      {/* Progress Bar */}
      {next ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] text-[#8b95a1] font-medium">
              Lv.{current.level}
            </span>
            <span className="text-[11px] text-[#4e5968] font-semibold">
              {matchCount}/{next.minMatches}
            </span>
            <span className="text-[11px] text-[#8b95a1] font-medium flex items-center gap-1">
              {next.icon} Lv.{next.level}
            </span>
          </div>
          <div className="h-2 bg-[#e5e8eb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#191f28] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="text-[13px] font-semibold text-[#191f28] mb-1">
            🎉 최고 레벨 달성!
          </div>
          <div className="text-[12px] text-[#8b95a1]">
            전설의 수거러입니다
          </div>
        </div>
      )}
    </div>
  );
}
