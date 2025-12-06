'use client';

import { ArrowLeft, CreditCard, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/lib/ToastContext';
import { savedCards as initialCards, SavedCard } from '@/lib/data';

export default function SavedCardsPage() {
  const { showToast } = useToast();
  const [cards, setCards] = useState<SavedCard[]>(initialCards);

  const handleDeleteCard = (cardId: string) => {
    if (confirm('이 카드를 삭제하시겠어요?')) {
      setCards(cards.filter((card) => card.id !== cardId));
      showToast('카드가 삭제되었어요');
    }
  };

  const handleSetPrimary = (cardId: string) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isPrimary: card.id === cardId,
      }))
    );
    showToast('기본 결제 수단으로 설정되었어요');
  };

  return (
    <div className="flex-1 bg-[var(--color-bg)] overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg)]">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link
            href="/my"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[var(--color-primary)]">저장된 카드</h1>
        </div>
        <div className="h-px bg-[var(--color-border-light)]" />
      </header>

      {/* Cards List */}
      <div className="px-5 py-5">
        {cards.length > 0 ? (
          <div className="space-y-3">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-[16px] border-2 transition-all ${
                  card.isPrimary
                    ? 'border-[var(--color-link)] bg-[#f0f7ff]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg)]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-[12px] flex items-center justify-center ${
                        card.isPrimary ? 'bg-[var(--color-link)]' : 'bg-[var(--color-bg-secondary)]'
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${
                          card.isPrimary ? 'text-[var(--color-bg)]' : 'text-[var(--color-text-tertiary)]'
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[var(--color-primary)] mb-0.5">
                        {card.cardName}
                      </p>
                      <p className="text-[13px] text-[var(--color-text-tertiary)]">{card.cardNumber}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)] pressable transition-colors"
                  >
                    <Trash2 className="w-[18px] h-[18px] text-[var(--color-error)]" strokeWidth={2} />
                  </button>
                </div>

                {card.isPrimary ? (
                  <div className="inline-block px-3 py-1.5 bg-[var(--color-link)] text-[var(--color-bg)] text-[12px] font-semibold rounded-[6px]">
                    기본 결제 수단
                  </div>
                ) : (
                  <button
                    onClick={() => handleSetPrimary(card.id)}
                    className="w-full py-2.5 border border-[var(--color-border)] rounded-[10px] text-[13px] font-medium text-[var(--color-text-secondary)] pressable hover:bg-[var(--color-bg-secondary)] transition-colors"
                  >
                    기본 결제 수단으로 설정
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-[var(--color-text-tertiary)]" strokeWidth={2} />
            </div>
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">저장된 카드가 없어요</p>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">
              첫 결제 시 '다음에도 사용' 체크하면<br />자동으로 저장됩니다
            </p>
          </div>
        )}

        {/* Add Card Button */}
        {cards.length > 0 && (
          <button className="w-full mt-4 py-4 border-2 border-dashed border-[var(--color-border)] rounded-[16px] text-[14px] font-medium text-[var(--color-text-tertiary)] flex items-center justify-center gap-2 pressable hover:border-[var(--color-link)] hover:text-[var(--color-link)] hover:bg-[#f0f7ff] transition-all">
            <Plus className="w-5 h-5" strokeWidth={2} />
            새 카드 추가
          </button>
        )}
      </div>

      {/* Info */}
      <div className="px-5 pb-5">
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-[12px]">
          <p className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">
            • 저장된 카드 정보는 안전하게 암호화되어 보관됩니다
            <br />
            • 기본 결제 수단은 결제 시 자동으로 선택됩니다
            <br />• 언제든지 카드를 삭제하거나 변경할 수 있어요
          </p>
        </div>
      </div>
    </div>
  );
}
