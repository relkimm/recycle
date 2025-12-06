'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, User, MapPin } from 'lucide-react';
import { requests, categoryLabels } from '@/lib/data';
import Image from 'next/image';

export default function ConfirmCompletionPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  const [isConfirming, setIsConfirming] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const request = requests.find((r) => r.id === requestId);

  if (!request || request.status !== 'completed_waiting') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-text-secondary)]">확인할 수거 정보가 없습니다.</p>
      </div>
    );
  }

  const handleConfirm = () => {
    setIsConfirming(true);

    // 실제로는 API 호출
    setTimeout(() => {
      setIsConfirming(false);
      router.push(`/request/${requestId}/confirmed`);
    }, 1500);
  };

  const handleReport = () => {
    setShowReportModal(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[var(--color-border)]">
        <div className="flex items-center h-[56px] px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-[17px] font-semibold">수거 완료 확인</h1>
        </div>
      </header>

      <div className="p-4">
        {/* 수거자 정보 - 간소화 */}
        <div className="mb-3 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-bg-secondary)] flex-shrink-0">
            <Image
              src={request.collectorImage || ''}
              alt={request.collectorName || ''}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">
              {request.collectorName}님이 수거 완료했어요
            </p>
            <p className="text-[12px] text-[var(--color-text-tertiary)]">
              {request.completionTime}
            </p>
          </div>
        </div>

        {/* 수거 완료 인증 사진 - 크게 */}
        <div className="mb-4">
          <div className="w-full aspect-square rounded-[12px] overflow-hidden bg-[var(--color-bg-secondary)]">
            <Image
              src={request.completionImage || ''}
              alt="수거 완료 인증"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* 안내 메시지 */}
        <div className="mb-4 p-4 bg-[var(--color-bg-secondary)] rounded-[12px]">
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            수거가 정상적으로 완료되지 않았다면 '문제 신고하기' 버튼을 눌러주세요.
          </p>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] safe-area-bottom">
        <div className="max-w-[560px] mx-auto p-4 space-y-2">
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-[10px] font-semibold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isConfirming ? '확인 중...' : '수거 완료 확인'}
          </button>
          <button
            onClick={handleReport}
            className="w-full py-3 bg-white text-[var(--color-error)] border border-[var(--color-error)] rounded-[10px] font-medium text-[15px] hover:bg-red-50 transition-colors"
          >
            문제 신고하기
          </button>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[140px]" />

      {/* 신고 모달 */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50" onClick={() => setShowReportModal(false)}>
          <div
            className="w-full max-w-[560px] mx-auto bg-white rounded-t-[20px] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[17px] font-bold mb-4">문제 신고</h3>
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
              신고 사유를 선택해주세요. 운영팀에서 확인 후 처리하겠습니다.
            </p>
            <div className="space-y-2 mb-6">
              {['수거가 완료되지 않았어요', '잘못된 사진이 업로드되었어요', '약속 시간을 지키지 않았어요', '기타'].map(
                (reason) => (
                  <button
                    key={reason}
                    className="w-full py-3 px-4 text-left text-[15px] bg-[var(--color-bg-secondary)] rounded-[10px] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                    onClick={() => {
                      alert(`신고 사유: ${reason}\n운영팀에서 확인 후 처리하겠습니다.`);
                      setShowReportModal(false);
                    }}
                  >
                    {reason}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-[10px] font-medium text-[15px]"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
