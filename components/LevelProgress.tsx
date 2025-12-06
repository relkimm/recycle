import { getLevelProgress } from '@/lib/level';

interface LevelProgressProps {
  matchCount: number;
  isMyProfile?: boolean;
}

export default function LevelProgress({ matchCount, isMyProfile = false }: LevelProgressProps) {
  const { current, next, progress, remaining } = getLevelProgress(matchCount);

  // 본인 프로필이 아니면 간단하게만 표시
  if (!isMyProfile) {
    return (
      <div className="bg-white border border-[#e5e8eb] rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] text-[#8b95a1] mb-1">레벨</div>
            <div className="text-[24px] font-bold text-[#191f28]">
              Lv.{current.level}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[13px] text-[#8b95a1] mb-1">완료</div>
            <div className="text-[24px] font-bold text-[#191f28]">
              {matchCount}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 본인 프로필일 때만 진행바 표시
  return (
    <div className="bg-white border border-[#e5e8eb] rounded-[16px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow">
      {/* Level Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[13px] text-[#8b95a1] mb-1">레벨</div>
          <div className="text-[28px] font-bold text-[#191f28] leading-none">
            Lv.{current.level}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[13px] text-[#8b95a1] mb-1">완료</div>
          <div className="text-[28px] font-bold text-[#191f28] leading-none">
            {matchCount}
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      {next ? (
        <div className="bg-[#f7f8fa] rounded-[12px] p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12px] text-[#4e5968] font-medium">
              Lv.{next.level}까지
            </span>
            <span className="text-[13px] text-[#191f28] font-bold">
              {remaining}건 남음
            </span>
          </div>
          <div className="relative h-3 bg-[#e5e8eb] rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#191f28] to-[#4e5968] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] text-[#8b95a1]">
              {matchCount}/{next.minMatches}
            </span>
            <span className="text-[11px] text-[#4e5968] font-medium">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-[#f7f8fa] rounded-[12px] p-4 text-center">
          <div className="text-[14px] font-bold text-[#191f28] mb-1">
            최고 레벨 달성!
          </div>
          <div className="text-[12px] text-[#8b95a1]">
            레벨 6에 도달했습니다
          </div>
        </div>
      )}
    </div>
  );
}
