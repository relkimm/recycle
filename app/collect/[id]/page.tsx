'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, MessageCircle } from 'lucide-react';
import { requests, categoryLabels, chatRooms } from '@/lib/data';
import { categoryBadgeStyles } from '@/lib/badgeStyles';
import Image from 'next/image';

export default function CollectPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;

  const request = requests.find((r) => r.id === requestId);
  const chatRoom = chatRooms.find((room) => room.requestId === requestId);

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-text-secondary)]">요청을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleComplete = () => {
    router.push(`/collect/${requestId}/complete`);
  };

  const handleChat = () => {
    if (chatRoom) {
      router.push(`/chat/${chatRoom.id}`);
    } else {
      alert('채팅방을 찾을 수 없습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[var(--color-border)]">
        <div className="flex items-center h-[56px] px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-[17px] font-semibold">수거 진행</h1>
        </div>
      </header>

      {/* 요청자 정보 - 간소화 */}
      <div className="p-4 bg-white">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--color-bg-secondary)] flex-shrink-0">
            <Image
              src={request.userImage}
              alt={request.userName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-[var(--color-text-primary)]">
              {request.userName}
            </p>
            <p className="text-[12px] text-[var(--color-text-tertiary)]">{request.timeAgo}</p>
          </div>
          <p className="text-[17px] font-bold text-[var(--color-text-primary)]">
            {request.price.toLocaleString()}원
          </p>
        </div>

        {/* 이미지 갤러리 */}
        {request.images && request.images.length > 0 && (
          <div className="mb-4 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2">
              {request.images.map((img, idx) => (
                <div key={idx} className="w-32 h-32 flex-shrink-0 rounded-[10px] overflow-hidden">
                  <Image
                    src={img}
                    alt={`수거물 ${idx + 1}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 카테고리 & 설명 */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-medium ${categoryBadgeStyles}`}>
            {categoryLabels[request.category].label}
          </span>
        </div>
        <p className="text-[15px] text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">
          {request.description}
        </p>
      </div>

      {/* 수거 안내 - 간소화 */}
      <div className="mt-4 p-4 bg-[var(--color-bg-secondary)]">
        <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
          약속 시간에 방문해 재활용품을 수거한 후, 수거 완료 인증 사진을 촬영해주세요.
        </p>
      </div>

      {/* 하단 고정 영역 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] safe-area-bottom">
        <div className="max-w-[560px] mx-auto">
          <div className="p-4 space-y-3">
            {/* 채팅하기 버튼 */}
            <button
              onClick={handleChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-[10px] font-medium text-[15px] hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              채팅하기
            </button>

            {/* 수거 완료 버튼 */}
            <button
              onClick={handleComplete}
              className="w-full py-4 bg-[var(--color-primary)] text-white rounded-[10px] font-semibold text-[16px] hover:opacity-90 transition-opacity"
            >
              수거 완료 인증하기
            </button>
          </div>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[140px]" />
    </div>
  );
}
