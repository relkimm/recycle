'use client';

import { ArrowLeft, Share, Heart, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { requests, categoryLabels } from '@/lib/data';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProposalModal from '@/components/ui/ProposalModal';
import { useToast } from '@/lib/ToastContext';
import { useUser } from '@/lib/UserContext';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useUser();
  const id = params.id as string;
  const request = requests.find((r) => r.id === id) || requests[0];
  const category = categoryLabels[request.category];

  // 내 글인지 확인 (실제로는 userId로 비교)
  const isMyRequest = request.userName === user.name;

  const [isLiked, setIsLiked] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = request.images || [request.imageUrl];
  const totalImages = images.length;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentImageIndex(newIndex);
  };

  const handleProposalSubmit = (price: number, message: string) => {
    console.log('Proposal submitted:', { price, message });
    setProposalSubmitted(true);
    setIsProposalModalOpen(false);
    showToast('제안이 완료되었어요!');
    // 실제로는 API 호출
  };

  return (
    <div className="bg-white min-h-screen pb-[88px]">
      {/* Floating Header */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
        </Link>
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            <Share className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Image Gallery Carousel */}
      <div className="relative h-[340px] bg-[#f7f8fa] overflow-hidden">
        <div
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((imageUrl, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0 snap-center">
              <Image
                src={imageUrl}
                alt={`Request Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {totalImages > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[12px] px-2.5 py-1 rounded-full font-medium">
            {currentImageIndex + 1}/{totalImages}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 pb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden relative bg-[#f7f8fa]">
            <Image
              src={request.userImage}
              alt="User"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-semibold text-[#191f28]">
              {request.userName}
            </div>
            <div className="text-[13px] text-[#8b95a1]">
              {request.location} · 거래 12회
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#f2f4f6] -mx-5" />

        {/* Request Info */}
        <div className="py-5">
          {/* Category */}
          <span className="inline-block px-2.5 py-1 bg-[#f2f4f6] rounded-[6px] text-[12px] text-[#4e5968] font-medium mb-3">
            {category.label}
          </span>

          {/* Title */}
          <h1 className="text-[18px] font-semibold text-[#191f28] leading-[1.4] mb-2">
            {request.description}
          </h1>

          {/* Meta */}
          <div className="text-[13px] text-[#8b95a1] mb-5">
            {request.timeAgo}
          </div>

          {/* Price */}
          <div className="text-[24px] font-bold text-[#191f28] mb-5">
            {request.price.toLocaleString()}원
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-[14px] text-[#4e5968]">
              <Clock className="w-[18px] h-[18px] text-[#8b95a1]" strokeWidth={2} />
              <span>오늘 중 수거 희망</span>
            </div>
            <div className="flex items-center gap-2.5 text-[14px] text-[#4e5968]">
              <MapPin className="w-[18px] h-[18px] text-[#8b95a1]" strokeWidth={2} />
              <span>{request.location} OO아파트 앞</span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-[15px] text-[#4e5968] leading-[1.6]">
            박스 3개, 플라스틱 다수 있습니다.
            <br />
            깨끗하게 씻어서 정리해뒀어요.
          </p>
        </div>

        {/* Proposals CTA (본인 글인 경우) */}
        {isMyRequest && request.proposalCount > 0 && (
          <>
            <div className="h-2 bg-[#f7f8fa] -mx-5" />
            <div className="py-5">
              <Link
                href={`/request/${id}/proposals`}
                className="flex items-center justify-between p-4 bg-[#f7f8fa] rounded-[14px] pressable"
              >
                <div>
                  <p className="text-[15px] font-semibold text-[#191f28] mb-0.5">
                    {request.proposalCount}개의 제안이 도착했어요
                  </p>
                  <p className="text-[13px] text-[#8b95a1]">
                    최저가 12,000원부터
                  </p>
                </div>
                <span className="text-[14px] font-medium text-[#191f28]">확인하기 →</span>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white z-[60]">
        <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-[#e5e8eb]" />

        <div className="px-5 py-3 flex gap-3">
          {isMyRequest ? (
            // 내 글인 경우: 제안 확인하기 버튼
            <Link
              href={`/request/${id}/proposals`}
              className="flex-1 bg-[#191f28] text-white py-3.5 rounded-[10px] text-[15px] font-semibold text-center pressable"
            >
              제안 확인하기 {request.proposalCount > 0 && `(${request.proposalCount})`}
            </Link>
          ) : (
            // 다른 사람 글인 경우: 관심 + 제안하기
            <>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-12 h-12 border border-[#e5e8eb] rounded-[10px] flex items-center justify-center pressable"
              >
                <Heart
                  className={`w-[22px] h-[22px] ${isLiked ? 'text-[#f04452] fill-[#f04452]' : 'text-[#8b95a1]'}`}
                  strokeWidth={2}
                />
              </button>
              {proposalSubmitted ? (
                <button
                  disabled
                  className="flex-1 bg-[#e5e8eb] text-[#8b95a1] py-3.5 rounded-[10px] text-[15px] font-semibold"
                >
                  제안 완료
                </button>
              ) : (
                <button
                  onClick={() => setIsProposalModalOpen(true)}
                  className="flex-1 bg-[#191f28] text-white py-3.5 rounded-[10px] text-[15px] font-semibold pressable"
                >
                  제안하기
                </button>
              )}
            </>
          )}
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>

      {/* Proposal Modal */}
      {!isMyRequest && (
        <ProposalModal
          isOpen={isProposalModalOpen}
          onClose={() => setIsProposalModalOpen(false)}
          onSubmit={handleProposalSubmit}
          request={{
            description: request.description,
            imageUrl: request.imageUrl,
            price: request.price,
            location: request.location,
          }}
        />
      )}
    </div>
  );
}
