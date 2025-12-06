'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (price: number, message: string) => void;
  request: {
    description: string;
    imageUrl: string;
    price: number;
    location: string;
  };
}

export default function ProposalModal({ isOpen, onClose, onSubmit, request }: ProposalModalProps) {
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value) {
      setPrice(Number(value).toLocaleString());
    } else {
      setPrice('');
    }
  };

  const handleSubmit = async () => {
    if (!price) return;

    setIsSubmitting(true);
    const numericPrice = Number(price.replace(/,/g, ''));

    // 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit(numericPrice, message);
    setIsSubmitting(false);
    setPrice('');
    setMessage('');
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
          <h2 className="text-[17px] font-bold text-[var(--color-text-primary)]">제안하기</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)]"
          >
            <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
          </button>
        </div>

        {/* Request Info */}
        <div className="px-5 py-4 flex gap-3 border-b border-[var(--color-border-light)]">
          <div className="w-14 h-14 rounded-[8px] overflow-hidden relative bg-[var(--color-bg-secondary)] flex-shrink-0">
            <Image
              src={request.imageUrl}
              alt={request.description}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] text-[var(--color-text-primary)] line-clamp-1 mb-1">{request.description}</p>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">{request.location}</p>
            <p className="text-[14px] font-bold text-[var(--color-text-primary)] mt-1">
              희망가 {request.price.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-5 space-y-5">
          {/* Price Input */}
          <div>
            <label className="block text-[13px] font-medium text-[var(--color-text-primary)] mb-2">
              제안 금액
            </label>
            <div className="relative">
              <input
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="금액을 입력하세요"
                className="w-full border border-[var(--color-border)] rounded-[10px] px-4 py-3.5 text-[15px] text-[var(--color-text-primary)] placeholder-[var(--color-text-disabled)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] pr-12 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] text-[15px]">
                원
              </span>
            </div>
            <p className="text-[12px] text-[var(--color-text-tertiary)] mt-2">
              요청자의 희망가보다 낮은 금액을 제안하면 수락률이 높아요
            </p>
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-[13px] font-medium text-[var(--color-text-primary)] mb-2">
              메시지 <span className="text-[var(--color-text-tertiary)] font-normal">(선택)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="요청자에게 전달할 메시지를 입력하세요"
              className="w-full border border-[var(--color-border)] rounded-[10px] p-4 text-[15px] text-[var(--color-text-primary)] placeholder-[var(--color-text-disabled)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] h-[100px] resize-none transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-5 pb-5">
          <button
            onClick={handleSubmit}
            disabled={!price || isSubmitting}
            className="w-full bg-[var(--color-primary)] text-[var(--color-bg)] py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[var(--color-border)] disabled:text-[var(--color-text-disabled)] disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '제안 중...' : '제안하기'}
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
