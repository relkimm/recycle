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
  '일방적으로 거래를 취소했어요',
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
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-white rounded-t-[20px] z-[80] animate-slide-up-sheet">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-[#e5e8eb] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#f2f4f6]">
          <h2 className="text-[17px] font-bold text-[#191f28]">노쇼 신고</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]"
          >
            <X className="w-5 h-5 text-[#4e5968]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-[#fff5f5] rounded-[10px] mb-5">
            <AlertTriangle className="w-5 h-5 text-[#f04452] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] text-[#191f28] font-medium mb-1">
                {userName}님을 노쇼로 신고합니다
              </p>
              <p className="text-[13px] text-[#4e5968]">
                허위 신고는 서비스 이용에 제한이 있을 수 있어요
              </p>
            </div>
          </div>

          {/* Reason Selection */}
          <div className="space-y-3">
            <p className="text-[13px] font-medium text-[#191f28]">신고 사유</p>
            {reportReasons.map((reason) => (
              <button
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`w-full text-left px-4 py-3.5 rounded-[10px] border transition-colors ${
                  selectedReason === reason
                    ? 'border-[#191f28] bg-[#f7f8fa]'
                    : 'border-[#e5e8eb]'
                }`}
              >
                <span className="text-[15px] text-[#191f28]">{reason}</span>
              </button>
            ))}

            {/* Other reason input */}
            {selectedReason === '기타' && (
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="신고 사유를 입력해주세요"
                className="w-full border border-[#e5e8eb] rounded-[10px] p-4 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#191f28] focus:ring-1 focus:ring-[#191f28] h-[100px] resize-none transition-all"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 pb-5">
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === '기타' && !otherReason)}
            className="w-full bg-[#f04452] text-white py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] disabled:cursor-not-allowed transition-colors"
          >
            신고하기
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
