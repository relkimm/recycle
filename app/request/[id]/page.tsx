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

  const handleShare = async () => {
    const shareData = {
      title: request.description,
      text: `${request.description}\n${request.price.toLocaleString()}원 · ${request.location}`,
      url: window.location.href,
    };

    try {
      // Web Share API 지원 여부 확인
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('공유되었어요!');
      } else {
        // Web Share API 미지원 시 클립보드에 복사
        await navigator.clipboard.writeText(window.location.href);
        showToast('링크가 복사되었어요!');
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우 등
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error);
        // 클립보드 복사로 fallback
        try {
          await navigator.clipboard.writeText(window.location.href);
          showToast('링크가 복사되었어요!');
        } catch (clipboardError) {
          console.error('Clipboard copy failed:', clipboardError);
          showToast('공유에 실패했어요');
        }
      }
    }
  };

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Floating Header */}
        <header className="absolute top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.12)] pressable"
          >
            <Share className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Image Gallery Carousel */}
      <div className="relative h-[340px] bg-[#f7f8fa]">
        <div
          className="flex h-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
        >
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 snap-center"
              style={{ minWidth: '100%', width: '100%' }}
            >
              <Image
                src={imageUrl}
                alt={`Request Image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        {totalImages > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[12px] px-2.5 py-1 rounded-full font-medium z-10">
            {currentImageIndex + 1}/{totalImages}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-5 pb-4">
        {/* User Profile */}
        <Link
          href={`/user/${request.id}`}
          className="flex items-center gap-3 pb-4 pressable -mx-2 px-2 py-2 rounded-[12px] hover:bg-[#f7f8fa] transition-colors"
        >
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
              {request.location} · 매칭 12회
            </div>
          </div>
          <span className="text-[13px] text-[#8b95a1]">프로필 보기</span>
        </Link>

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
      </div>
      </div>

      {/* Bottom Action */}
      <div className="flex-shrink-0 w-full bg-white z-[60]">
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
    </>
  );
}
