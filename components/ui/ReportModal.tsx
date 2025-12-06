'use client';

import { X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  userName: string;
}

const reportReasons = [
  '약속 시간에 나타나지 않았어요',
  '연락이 되지 않아요',
  '일방적으로 매칭을 취소했어요',
  '기타',
];

export default function ReportModal({ isOpen, onClose, onSubmit, userName }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const reason = selectedReason === '기타' ? otherReason : selectedReason;
    if (reason) {
      onSubmit(reason);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[70] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-[var(--color-bg)] rounded-t-[20px] z-[80] animate-slide-up-sheet">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[var(--color-border)] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[var(--color-border-light)]">
          <h2 className="text-[17px] font-bold text-[var(--color-text-primary)]">노쇼 신고</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)]"
          >
            <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-[#fff5f5] rounded-[10px] mb-5">
            <AlertTriangle className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] text-[var(--color-text-primary)] font-medium mb-1">
                {userName}님을 노쇼로 신고합니다
              </p>
              <p className="text-[13px] text-[var(--color-text-secondary)]">
                허위 신고는 서비스 이용에 제한이 있을 수 있어요
              </p>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-[var(--color-text-primary)]">신고 사유</p>
            {reportReasons.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`w-full text-left px-4 py-3.5 rounded-[10px] border transition-colors ${
                  selectedReason === reason
                    ? 'border-[var(--color-primary)] bg-[var(--color-bg-secondary)]'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <span className="text-[15px] text-[var(--color-text-primary)]">{reason}</span>
              </button>
            ))}

            {/* Other reason input */}
            {selectedReason === '기타' && (
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="신고 사유를 입력해주세요"
                className="w-full border border-[var(--color-border)] rounded-[10px] p-4 text-[15px] text-[var(--color-text-primary)] placeholder-[var(--color-text-disabled)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] h-[100px] resize-none transition-all"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 pb-5">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === '기타' && !otherReason)}
            className="w-full bg-[var(--color-error)] text-[var(--color-bg)] py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[var(--color-border)] disabled:text-[var(--color-text-disabled)] disabled:cursor-not-allowed transition-colors"
          >
            신고하기
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
