'use client';

import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { requests } from '@/lib/data';
import RequestCard from '@/components/RequestCard';
import LevelProgress from '@/components/LevelProgress';
import LevelBadge from '@/components/LevelBadge';

// 시뮬레이션용 사용자 데이터
const getUserById = (id: string) => {
  const userRequest = requests.find(r => r.id === id) || requests[0];
  return {
    id,
    name: userRequest.userName,
    profileImage: userRequest.userImage,
    location: userRequest.location,
    transactionCount: Math.floor(Math.random() * 30) + 10,
    noShowCount: Math.floor(Math.random() * 2),
    receivedProposalCount: Math.floor(Math.random() * 50) + 20,
  };
};

export default function UserProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const user = getUserById(id);

  // 해당 유저의 다른 요청들 (시뮬레이션)
  const userRequests = requests.filter(r => r.userName === user.name).slice(0, 3);

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white">
          <div className="px-4 py-3 flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]"
            >
              <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
            </button>
            <h1 className="text-[17px] font-bold text-[#191f28]">프로필</h1>
          </div>
          <div className="h-px bg-[#f2f4f6]" />
        </header>

        {/* Profile Section */}
        <div className="px-5 py-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden relative bg-[#f7f8fa] mb-3">
              <Image
                src={user.profileImage}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-[18px] font-bold text-[#191f28] mb-1">
              {user.name}
            </h2>
            <div className="flex items-center gap-1 text-[13px] text-[#8b95a1]">
              <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{user.location}</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-4">
            <LevelProgress matchCount={user.transactionCount} />
          </div>

          {/* Special Badges */}
          {user.noShowCount === 0 && user.transactionCount >= 10 && (
            <div className="p-4 bg-white border border-[#e5e8eb] rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[15px] font-semibold text-[#191f28]">
                  ✅ 노쇼 제로
                </span>
              </div>
              <p className="text-[13px] text-[#4e5968]">
                약속을 잘 지키는 신뢰할 수 있는 이웃이에요
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#f7f8fa]" />

        {/* User's Other Requests */}
        {userRequests.length > 0 && (
          <div className="px-5 py-5">
            <h3 className="text-[15px] font-bold text-[#191f28] mb-4">
              {user.name}님의 다른 요청
            </h3>
            <div className="divide-y divide-[#f2f4f6]">
              {userRequests.map((req) => (
                <Link key={req.id} href={`/request/${req.id}`}>
                  <RequestCard request={req} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
