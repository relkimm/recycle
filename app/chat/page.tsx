'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { chatRooms } from '@/lib/data';

export default function ChatPage() {
  return (
    <div className="bg-white min-h-screen pb-[100px]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-5 py-4">
          <h1 className="text-[20px] font-bold text-[#191f28]">채팅</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Content */}
      {chatRooms.length > 0 ? (
        <div className="divide-y divide-[#f2f4f6]">
          {chatRooms.map((room) => (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className="flex gap-3 px-5 py-4 pressable"
            >
              <div className="relative flex-shrink-0">
                <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-[#f7f8fa]">
                  <Image
                    src={room.otherUser.image}
                    alt={room.otherUser.name}
                    width={52}
                    height={52}
                    className="object-cover"
                  />
                </div>
                {room.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#f04452] rounded-full flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white">
                      {room.unreadCount}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[15px] font-semibold text-[#191f28]">
                    {room.otherUser.name}
                  </h3>
                  <span className="text-[12px] text-[#8b95a1] flex-shrink-0 ml-2">
                    {room.lastMessageTime}
                  </span>
                </div>
                <p className="text-[13px] text-[#4e5968] line-clamp-1 mb-1">
                  {room.lastMessage}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] rounded-[6px] overflow-hidden bg-[#f7f8fa] flex-shrink-0">
                    <Image
                      src={room.requestImageUrl}
                      alt="요청 이미지"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[12px] text-[#8b95a1] line-clamp-1 flex-1">
                    {room.requestDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <MessageCircle className="w-12 h-12 text-[#e5e8eb] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[15px] text-[#8b95a1] mb-1">아직 채팅이 없어요</p>
          <p className="text-[13px] text-[#b0b8c1]">요청에 제안을 보내보세요!</p>
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
