'use client';

import BottomNav from '@/components/BottomNav';
import { Settings, Heart, Clock, Bell, CreditCard, Receipt, Wallet, ChevronRight, MapPin, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import { requests, myProposals, notifications, categoryLabels } from '@/lib/data';
import RequestCard from '@/components/RequestCard';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import LevelProgress from '@/components/LevelProgress';
import LevelBadge from '@/components/LevelBadge';

export default function MyPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'requests' | 'proposals' | 'inprogress'>('inprogress');

  // 내가 작성한 요청만 필터링
  const myRequests = requests.filter((req) => req.authorId === 'me');

  // 진행 중인 수거 (내가 수거자인 경우 + 내가 요청자인데 수거 완료 대기중인 경우)
  const inProgressCollections = requests.filter(
    (req) =>
      (req.collectorId === 'me' && (req.status === 'in_progress' || req.status === 'matched')) ||
      (req.authorId === 'me' && req.status === 'completed_waiting')
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const statusLabels = {
    pending: '대기중',
    accepted: '수락됨',
    rejected: '거절됨',
  };

  const statusColors = {
    pending: 'bg-[var(--color-border-light)] text-[var(--color-text-secondary)]',
    accepted: 'bg-[var(--color-primary)] text-[var(--color-bg)]',
    rejected: 'bg-[var(--color-border-light)] text-[var(--color-text-tertiary)]',
  };

  return (
    <>
      <div className="flex-1 bg-[var(--color-bg)] overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[var(--color-bg)]">
        <div className="px-5 py-3 flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[var(--color-primary)]">마이</h1>
          <div className="flex items-center">
            <Link
              href="/notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <Bell className="w-[22px] h-[22px] text-[var(--color-primary)]" strokeWidth={2} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-[6px] h-[6px] bg-[var(--color-error)] rounded-full" />
              )}
            </Link>
            <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-bg-secondary)]">
              <Settings className="w-[22px] h-[22px] text-[var(--color-primary)]" strokeWidth={2} />
            </Link>
          </div>
        </div>
        <div className="h-px bg-[var(--color-border-light)]" />
      </header>

      {/* Profile Section */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden relative bg-[var(--color-bg-secondary)]">
            <Image
              src={user.profileImage}
              alt="Me"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-[17px] font-bold text-[var(--color-primary)]">{user.name}</h2>
              <LevelBadge matchCount={user.transactionCount} size="sm" />
            </div>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">{user.location.name}</p>
          </div>
          <Link
            href="/my/profile"
            className="px-4 py-2 border border-[var(--color-border)] rounded-[8px] text-[13px] font-medium text-[var(--color-text-secondary)] pressable"
          >
            프로필 수정
          </Link>
        </div>

        {/* Level Progress */}
        <LevelProgress matchCount={user.transactionCount} isMyProfile={true} />
      </div>

      {/* Quick Menu */}
      <div className="px-5 pb-4">
        <div className="flex gap-3 mb-3">
          <Link
            href="/my/likes"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--color-bg-secondary)] rounded-[12px] pressable"
          >
            <Heart className="w-[18px] h-[18px] text-[var(--color-text-secondary)]" strokeWidth={2} />
            <span className="text-[14px] font-medium text-[var(--color-primary)]">관심목록</span>
          </Link>
          <Link
            href="/my/history"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--color-bg-secondary)] rounded-[12px] pressable"
          >
            <Clock className="w-[18px] h-[18px] text-[var(--color-text-secondary)]" strokeWidth={2} />
            <span className="text-[14px] font-medium text-[var(--color-primary)]">최근 본</span>
          </Link>
        </div>

        {/* 결제 & 수익 메뉴 */}
        <div className="space-y-2">
          <Link
            href="/my/earnings"
            className="flex items-center justify-between p-4 bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-tertiary)] rounded-[12px] pressable"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-bg)] rounded-[10px] flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[var(--color-link)]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--color-primary)]">내 수익</p>
                <p className="text-[12px] text-[var(--color-text-tertiary)]">수거로 번 금액 확인</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-tertiary)]" />
          </Link>

          <Link
            href="/my/payments"
            className="flex items-center justify-between p-4 bg-[var(--color-bg-secondary)] rounded-[12px] pressable"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-bg)] rounded-[10px] flex items-center justify-center">
                <Receipt className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--color-primary)]">결제 내역</p>
                <p className="text-[12px] text-[var(--color-text-tertiary)]">요청별 결제 내역 확인</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-tertiary)]" />
          </Link>

          <Link
            href="/my/cards"
            className="flex items-center justify-between p-4 bg-[var(--color-bg-secondary)] rounded-[12px] pressable"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--color-bg)] rounded-[10px] flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[var(--color-primary)]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--color-primary)]">저장된 카드</p>
                <p className="text-[12px] text-[var(--color-text-tertiary)]">결제 수단 관리</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-tertiary)]" />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-[var(--color-bg-secondary)]" />

      {/* Tabs */}
      <div className="flex sticky top-[var(--header-height)] z-40 bg-[var(--color-bg)]">
        <button
          onClick={() => setActiveTab('inprogress')}
          className={`relative flex-1 py-3.5 text-center text-[14px] font-medium transition-colors ${
            activeTab === 'inprogress' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'
          }`}
        >
          진행 중
          {activeTab === 'inprogress' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`relative flex-1 py-3.5 text-center text-[14px] font-medium transition-colors ${
            activeTab === 'requests' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'
          }`}
        >
          내 요청
          {activeTab === 'requests' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`relative flex-1 py-3.5 text-center text-[14px] font-medium transition-colors ${
            activeTab === 'proposals' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-tertiary)]'
          }`}
        >
          내 제안
          {activeTab === 'proposals' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
          )}
        </button>
      </div>
      <div className="h-px bg-[var(--color-border-light)]" />

      {/* Tab Content */}
      <div className="px-5">
        {activeTab === 'inprogress' ? (
          inProgressCollections.length > 0 ? (
            <div className="space-y-3 py-4">
              {inProgressCollections.map((req) => {
                const isCollector = req.collectorId === 'me';
                const isWaitingConfirm = req.status === 'completed_waiting' && req.authorId === 'me';

                return (
                  <Link
                    key={req.id}
                    href={
                      isWaitingConfirm
                        ? `/request/${req.id}/confirm`
                        : isCollector
                        ? `/collect/${req.id}`
                        : `/request/${req.id}`
                    }
                    className="block p-4 bg-white rounded-[12px] hover:bg-[var(--color-bg-secondary)] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-[10px] overflow-hidden flex-shrink-0 bg-[var(--color-bg-secondary)]">
                        <Image
                          src={req.imageUrl}
                          alt={req.description}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1">
                          <span className="inline-block px-2 py-[3px] bg-[var(--color-border-light)] rounded-[4px] text-[11px] text-[var(--color-text-secondary)] font-medium">
                            {categoryLabels[req.category].label}
                          </span>
                        </div>
                        <p className="text-[15px] text-[var(--color-text-primary)] line-clamp-2 mb-2">
                          {req.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-[17px] font-bold text-[var(--color-text-primary)]">
                            {req.price.toLocaleString()}원
                          </p>
                          {isWaitingConfirm && (
                            <span className="px-2.5 py-1 bg-[var(--color-primary)] text-white text-[13px] font-semibold rounded-[6px]">
                              확인 필요
                            </span>
                          )}
                          {isCollector && req.status === 'in_progress' && (
                            <span className="px-2.5 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] text-[13px] font-semibold rounded-[6px]">
                              수거 진행중
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">
                진행 중인 수거가 없어요
              </p>
              <p className="text-[13px] text-[var(--color-text-tertiary)]">
                요청을 등록하거나 제안을 보내보세요
              </p>
            </div>
          )
        ) : activeTab === 'requests' ? (
          myRequests.length > 0 ? (
            <div className="divide-y divide-[var(--color-border-light)]">
              {myRequests.map((req) => (
                <Link key={req.id} href={`/request/${req.id}`}>
                  <RequestCard request={req} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">아직 등록한 요청이 없어요</p>
              <p className="text-[13px] text-[var(--color-text-tertiary)]">분리수거가 필요한 물건이 있나요?</p>
            </div>
          )
        ) : myProposals.length > 0 ? (
          <div className="divide-y divide-[var(--color-border-light)]">
            {myProposals.map((proposal) => (
              <Link
                key={proposal.id}
                href={`/request/${proposal.requestId}`}
                className="flex gap-4 py-4 pressable"
              >
                <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[var(--color-bg-secondary)]">
                  <Image
                    src={proposal.requestImageUrl}
                    alt="Request"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <p className="text-[14px] text-[var(--color-primary)] line-clamp-1 mb-0.5">
                      {proposal.requestDescription}
                    </p>
                    <p className="text-[12px] text-[var(--color-text-tertiary)]">
                      {proposal.requestLocation} · {proposal.createdAt}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold text-[var(--color-primary)]">
                      {proposal.proposedPrice.toLocaleString()}원
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${statusColors[proposal.status]}`}
                    >
                      {statusLabels[proposal.status]}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[15px] text-[var(--color-text-secondary)] mb-1">아직 보낸 제안이 없어요</p>
            <p className="text-[13px] text-[var(--color-text-tertiary)]">동네 이웃에게 도움을 줘보세요</p>
          </div>
        )}
      </div>
      </div>

      <BottomNav />
    </>
  );
}
