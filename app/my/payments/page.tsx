'use client';

import { ArrowLeft, Receipt } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { payments, Payment } from '@/lib/data';
import { statusBadgeStyles } from '@/lib/badgeStyles';

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const statusLabels = {
    pending: '수거 대기',
    completed: '수거 완료',
    refunded: '환불 완료',
  };

  const filteredPayments = payments.filter((payment) => {
    if (activeTab === 'all') return true;
    return payment.status === activeTab;
  });

  const totalSpent = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const thisMonthSpent = totalSpent;

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
          <h1 className="text-[17px] font-bold text-[var(--color-primary)]">결제 내역</h1>
        </div>
        <div className="h-px bg-[var(--color-border-light)]" />
      </header>

      {/* Summary Card */}
      <div className="px-5 pt-5 pb-4">
        <div className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] rounded-[16px] p-5">
          <p className="text-[13px] text-[var(--color-text-tertiary)] mb-1">이번 달 지출</p>
          <p className="text-[32px] font-bold text-[var(--color-primary)]">
            {thisMonthSpent.toLocaleString()}
            <span className="text-[20px] ml-1">원</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex sticky top-[var(--header-height)] z-40 bg-[var(--color-bg)] px-5">
        {(['all', 'pending', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-3 text-center text-[14px] font-medium transition-colors ${
              activeTab === tab ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'
            }`}
          >
            {tab === 'all' ? '전체' : tab === 'pending' ? '수거 대기' : '수거 완료'}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
            )}
          </button>
        ))}
      </div>
      <div className="h-px bg-[var(--color-border-light)]" />

      {/* Payments List */}
      <div className="px-5 py-4">
        {filteredPayments.length > 0 ? (
          <div className="space-y-3">
            {filteredPayments.map((payment) => (
              <Link
                key={payment.id}
                href={`/request/${payment.requestId}`}
                className="block p-4 border border-[var(--color-border)] rounded-[16px] pressable hover:bg-[var(--color-bg-secondary)] transition-colors"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-14 h-14 rounded-[10px] overflow-hidden relative bg-[var(--color-bg-secondary)] flex-shrink-0">
                    <Image
                      src={payment.requestImageUrl}
                      alt={payment.requestDescription}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[var(--color-primary)] line-clamp-1 mb-1">
                      {payment.requestDescription}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">
                      {payment.collectorName} · {payment.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[18px] font-bold text-[var(--color-primary)] mb-0.5">
                      {payment.amount.toLocaleString()}원
                    </p>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">{payment.paymentMethod}</p>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-[8px] text-[12px] font-semibold border ${statusBadgeStyles[payment.status]}`}
                  >
                    {statusLabels[payment.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center">
              <Receipt className="w-8 h-8 text-[var(--color-text-tertiary)]" strokeWidth={2} />
            </div>
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">
              {activeTab === 'all' ? '결제 내역이 없어요' :
               activeTab === 'pending' ? '수거 대기중인 내역이 없어요' :
               '수거 완료된 내역이 없어요'}
            </p>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">
              요청을 등록하고 제안을 받아보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
