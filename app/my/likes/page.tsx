'use client';

import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { requests } from '@/lib/data';

export default function LikesPage() {
  // 관심목록 시뮬레이션 (실제로는 좋아요한 항목만 필터링)
  const likedRequests = requests.slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">관심목록</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Content */}
      {likedRequests.length > 0 ? (
        <div className="px-5 divide-y divide-[#f2f4f6]">
          {likedRequests.map((req) => (
            <Link
              key={req.id}
              href={`/request/${req.id}`}
              className="flex gap-4 py-4 pressable"
            >
              <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-[10px] overflow-hidden bg-[#f7f8fa]">
                <Image
                  src={req.imageUrl}
                  alt={req.description}
                  fill
                  className="object-cover"
                />
                <button
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.preventDefault();
                    // 좋아요 취소 로직
                  }}
                >
                  <Heart className="w-4 h-4 text-[#f04452] fill-[#f04452]" strokeWidth={2} />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <p className="text-[15px] text-[#191f28] font-medium line-clamp-2 mb-1">
                    {req.description}
                  </p>
                  <p className="text-[13px] text-[#8b95a1]">
                    {req.location} · {req.timeAgo}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-bold text-[#191f28]">
                    {req.price.toLocaleString()}원
                  </span>
                  {req.proposalCount > 0 && (
                    <span className="text-[12px] text-[#8b95a1]">
                      제안 {req.proposalCount}개
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Heart className="w-12 h-12 text-[#e5e8eb] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[15px] text-[#8b95a1]">관심 등록한 요청이 없어요</p>
          <Link
            href="/"
            className="inline-block mt-4 px-5 py-2.5 bg-[#191f28] text-white text-[14px] font-medium rounded-[8px] pressable"
          >
            둘러보기
          </Link>
        </div>
      )}
    </div>
  );
}
