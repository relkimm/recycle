'use client';

import { ArrowLeft, Wallet, TrendingUp, Download } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/lib/ToastContext';
import { earnings, Earning } from '@/lib/data';
import { statusBadgeStyles } from '@/lib/badgeStyles';

export default function EarningsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'withdrawn'>('all');

  const statusLabels = {
    pending: '정산 대기',
    available: '출금 가능',
    withdrawn: '출금 완료',
  };

  const filteredEarnings = earnings.filter((earning) => {
    if (activeTab === 'all') return true;
    return earning.status === activeTab;
  });

  const pendingAmount = earnings
    .filter((e) => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0);
  const availableAmount = earnings
    .filter((e) => e.status === 'available')
    .reduce((sum, e) => sum + e.amount, 0);
  const totalEarned = earnings.reduce((sum, e) => sum + e.amount, 0);

  const handleWithdraw = () => {
    if (availableAmount === 0) {
      showToast('출금 가능한 금액이 없어요');
      return;
    }
    showToast('출금 신청이 완료되었어요\n영업일 기준 1-2일 내 입금됩니다');
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
          <h1 className="text-[17px] font-bold text-[var(--color-primary)]">내 수익</h1>
        </div>
        <div className="h-px bg-[var(--color-border-light)]" />
      </header>

      {/* Summary Cards */}
      <div className="px-5 pt-5 pb-4 space-y-3">
        {/* 출금 가능 금액 */}
        <div className="bg-gradient-to-br from-[var(--color-link)] to-[#2563eb] rounded-[20px] p-5 text-[var(--color-bg)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] text-[var(--color-bg)]/80">출금 가능</p>
            <Wallet className="w-5 h-5 text-[var(--color-bg)]/60" strokeWidth={2} />
          </div>
          <p className="text-[36px] font-bold mb-6">
            {availableAmount.toLocaleString()}
            <span className="text-[20px] ml-1">원</span>
          </p>
          <button
            onClick={handleWithdraw}
            disabled={availableAmount === 0}
            className="w-full py-3.5 bg-[var(--color-bg)] text-[var(--color-link)] rounded-[12px] text-[15px] font-bold pressable disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            <Download className="w-5 h-5" strokeWidth={2} />
            출금하기
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-[16px]">
            <p className="text-[12px] text-[var(--color-text-tertiary)] mb-1">정산 대기</p>
            <p className="text-[20px] font-bold text-[var(--color-primary)]">
              {pendingAmount.toLocaleString()}
              <span className="text-[14px]">원</span>
            </p>
            <p className="text-[11px] text-[var(--color-text-tertiary)] mt-1">
              {earnings.filter((e) => e.status === 'pending').length}건
            </p>
          </div>

          <div className="p-4 bg-[var(--color-bg-secondary)] rounded-[16px]">
            <p className="text-[12px] text-[var(--color-text-tertiary)] mb-1">총 수익</p>
            <p className="text-[20px] font-bold text-[var(--color-primary)]">
              {totalEarned.toLocaleString()}
              <span className="text-[14px]">원</span>
            </p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-[#16a34a]" strokeWidth={2} />
              <p className="text-[11px] text-[#16a34a]">
                이번 달 +{(pendingAmount + availableAmount).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex sticky top-[var(--header-height)] z-40 bg-[var(--color-bg)] px-5">
        {(['all', 'available', 'withdrawn'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-3 text-center text-[14px] font-medium transition-colors ${
              activeTab === tab ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'
            }`}
          >
            {tab === 'all' ? '전체' : tab === 'available' ? '출금 가능' : '출금 완료'}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
            )}
          </button>
        ))}
      </div>
      <div className="h-px bg-[var(--color-border-light)]" />

      {/* Earnings List */}
      <div className="px-5 py-4">
        {filteredEarnings.length > 0 ? (
          <div className="space-y-3">
            {filteredEarnings.map((earning) => (
              <Link
                key={earning.id}
                href={`/request/${earning.requestId}`}
                className="block p-4 border border-[var(--color-border)] rounded-[16px] pressable hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-14 h-14 rounded-[10px] overflow-hidden relative bg-[var(--color-bg-secondary)] flex-shrink-0">
                    <Image
                      src={earning.requestImageUrl}
                      alt={earning.requestDescription}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[var(--color-primary)] line-clamp-1 mb-1">
                      {earning.requestDescription}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">
                      {earning.requesterName} · {earning.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[18px] font-bold text-[var(--color-primary)] mb-0.5">
                      +{earning.amount.toLocaleString()}원
                    </p>
                    {earning.withdrawnDate && (
                      <p className="text-[12px] text-[var(--color-text-tertiary)]">
                        출금일: {earning.withdrawnDate}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border ${statusBadgeStyles[earning.status]}`}
                  >
                    {statusLabels[earning.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-[var(--color-text-tertiary)]" strokeWidth={2} />
            </div>
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">
              {activeTab === 'all' ? '수익 내역이 없어요' :
               activeTab === 'available' ? '출금 가능한 금액이 없어요' :
               '출금 완료 내역이 없어요'}
            </p>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">
              동네 이웃의 요청에 제안해보세요
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-5 pb-5">
        <div className="p-4 bg-[var(--color-bg-secondary)] rounded-[12px]">
          <p className="text-[12px] text-[var(--color-text-secondary)] leading-[1.6]">
            • 수거 완료 확인 후 7일 뒤부터 출금 가능합니다
            <br />
            • 출금은 영업일 기준 1-2일 소요됩니다
            <br />• 최소 출금 금액은 10,000원입니다
          </p>
        </div>
      </div>
    </div>
  );
}
