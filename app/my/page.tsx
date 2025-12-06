'use client';

import BottomNav from '@/components/BottomNav';
import { Settings, Heart, Clock, Bell } from 'lucide-react';
import Image from 'next/image';
import { requests, myProposals, notifications } from '@/lib/data';
import RequestCard from '@/components/RequestCard';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/lib/UserContext';

export default function MyPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'requests' | 'proposals'>('requests');

  // 내가 작성한 요청만 필터링
  const myRequests = requests.filter((req) => req.authorId === 'me');
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const statusLabels = {
    pending: '대기중',
    accepted: '수락됨',
    rejected: '거절됨',
  };

  const statusColors = {
    pending: 'bg-[#f2f4f6] text-[#4e5968]',
    accepted: 'bg-[#191f28] text-white',
    rejected: 'bg-[#f2f4f6] text-[#8b95a1]',
  };

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white">
        <div className="px-5 py-3 flex items-center justify-between">
          <h1 className="text-[18px] font-bold text-[#191f28]">마이</h1>
          <div className="flex items-center">
            <Link
              href="/notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa] transition-colors"
            >
              <Bell className="w-[22px] h-[22px] text-[#191f28]" strokeWidth={2} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-[6px] h-[6px] bg-[#f04452] rounded-full" />
              )}
            </Link>
            <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
              <Settings className="w-[22px] h-[22px] text-[#191f28]" strokeWidth={2} />
            </Link>
          </div>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Profile Section */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-4">
          <div className="w-[60px] h-[60px] rounded-full overflow-hidden relative bg-[#f7f8fa]">
            <Image
              src={user.profileImage}
              alt="Me"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-bold text-[#191f28]">{user.name}</h2>
            <p className="text-[13px] text-[#8b95a1]">{user.location.name}</p>
          </div>
          <Link
            href="/my/profile"
            className="px-4 py-2 border border-[#e5e8eb] rounded-[8px] text-[13px] font-medium text-[#4e5968] pressable"
          >
            프로필 수정
          </Link>
        </div>

        {/* Stats */}
        <div className="flex mt-5 py-4 bg-[#f7f8fa] rounded-[12px]">
          <div className="flex-1 text-center border-r border-[#e5e8eb]">
            <div className="text-[18px] font-bold text-[#191f28]">{user.transactionCount}</div>
            <div className="text-[12px] text-[#8b95a1] mt-0.5">수거 완료</div>
          </div>
          <div className="flex-1 text-center border-r border-[#e5e8eb]">
            <div className="text-[18px] font-bold text-[#191f28]">28</div>
            <div className="text-[12px] text-[#8b95a1] mt-0.5">받은제안</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-[18px] font-bold text-[#191f28]">{user.noShowCount}</div>
            <div className="text-[12px] text-[#8b95a1] mt-0.5">노쇼</div>
          </div>
        </div>
      </div>

      {/* Quick Menu */}
      <div className="px-5 pb-4">
        <div className="flex gap-3">
          <Link
            href="/my/likes"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#f7f8fa] rounded-[12px] pressable"
          >
            <Heart className="w-[18px] h-[18px] text-[#4e5968]" strokeWidth={2} />
            <span className="text-[14px] font-medium text-[#191f28]">관심목록</span>
          </Link>
          <Link
            href="/my/history"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#f7f8fa] rounded-[12px] pressable"
          >
            <Clock className="w-[18px] h-[18px] text-[#4e5968]" strokeWidth={2} />
            <span className="text-[14px] font-medium text-[#191f28]">최근 본</span>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="h-2 bg-[#f7f8fa]" />

      {/* Tabs */}
      <div className="flex sticky top-[53px] z-40 bg-white">
        <button
          onClick={() => setActiveTab('requests')}
          className={`relative flex-1 py-3.5 text-center text-[14px] font-medium transition-colors ${
            activeTab === 'requests' ? 'text-[#191f28]' : 'text-[#8b95a1]'
          }`}
        >
          내 요청
          {activeTab === 'requests' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#191f28]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('proposals')}
          className={`relative flex-1 py-3.5 text-center text-[14px] font-medium transition-colors ${
            activeTab === 'proposals' ? 'text-[#191f28]' : 'text-[#8b95a1]'
          }`}
        >
          내 제안
          {activeTab === 'proposals' && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#191f28]" />
          )}
        </button>
      </div>
      <div className="h-px bg-[#f2f4f6]" />

      {/* Tab Content */}
      <div className="px-5">
        {activeTab === 'requests' ? (
          myRequests.length > 0 ? (
            <div className="divide-y divide-[#f2f4f6]">
              {myRequests.map((req) => (
                <Link key={req.id} href={`/request/${req.id}`}>
                  <RequestCard request={req} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[14px] text-[#8b95a1]">등록한 요청이 없어요</p>
            </div>
          )
        ) : myProposals.length > 0 ? (
          <div className="divide-y divide-[#f2f4f6]">
            {myProposals.map((proposal) => (
              <Link
                key={proposal.id}
                href={`/request/${proposal.requestId}`}
                className="flex gap-4 py-4 pressable"
              >
                <div className="relative w-[72px] h-[72px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#f7f8fa]">
                  <Image
                    src={proposal.requestImageUrl}
                    alt="Request"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <p className="text-[14px] text-[#191f28] line-clamp-1 mb-0.5">
                      {proposal.requestDescription}
                    </p>
                    <p className="text-[12px] text-[#8b95a1]">
                      {proposal.requestLocation} · {proposal.createdAt}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold text-[#191f28]">
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
            <p className="text-[14px] text-[#8b95a1]">보낸 제안이 없어요</p>
          </div>
        )}
      </div>
      </div>

      <BottomNav />
    </>
  );
}
