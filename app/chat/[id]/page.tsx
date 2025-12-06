'use client';

import { ArrowLeft, Send, MoreVertical, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { chatRooms, chatMessages } from '@/lib/data';
import { useState } from 'react';

export default function ChatRoomPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('');
  // 채팅방 ID 또는 제안 ID로 찾기 (시뮬레이션용)
  const chatRoom = chatRooms.find((room) => room.id === params.id) || chatRooms[0];
  const messages = chatMessages[chatRoom.id] || [];

  if (!chatRoom) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-[15px] text-[#8b95a1]">채팅방을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      // 실제로는 메시지 전송 로직
      console.log('메시지 전송:', message);
      setMessage('');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex-shrink-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Link
              href="/chat"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]"
            >
              <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
            </Link>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-[#f7f8fa] flex-shrink-0">
                <Image
                  src={chatRoom.otherUser.image}
                  alt={chatRoom.otherUser.name}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <h1 className="text-[17px] font-bold text-[#191f28]">
                {chatRoom.otherUser.name}
              </h1>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <MoreVertical className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </button>
        </div>
        <div className="h-px bg-[#f2f4f6]" />

        {/* Request Info */}
        <Link
          href={`/request/${chatRoom.requestId}`}
          className="px-5 py-3 bg-[#f7f8fa] border-b border-[#f2f4f6] flex items-center gap-3 pressable"
        >
          <div className="w-[44px] h-[44px] rounded-[8px] overflow-hidden bg-white flex-shrink-0">
            <Image
              src={chatRoom.requestImageUrl}
              alt="요청 이미지"
              width={44}
              height={44}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] text-[#4e5968] line-clamp-1">
              {chatRoom.requestDescription}
            </p>
          </div>
          <ArrowLeft className="w-4 h-4 text-[#8b95a1] rotate-180 flex-shrink-0" strokeWidth={2} />
        </Link>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] ${
                msg.senderId === 'me'
                  ? 'bg-[#191f28] text-white'
                  : 'bg-[#f7f8fa] text-[#191f28]'
              } px-4 py-2.5 rounded-[16px] ${
                msg.senderId === 'me' ? 'rounded-br-[4px]' : 'rounded-bl-[4px]'
              }`}
            >
              <p className="text-[14px] leading-[1.5] break-words">{msg.message}</p>
              <p
                className={`text-[11px] mt-1 ${
                  msg.senderId === 'me' ? 'text-white/60' : 'text-[#8b95a1]'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-[#f2f4f6] px-5 py-3">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f7f8fa] flex-shrink-0">
            <ImageIcon className="w-5 h-5 text-[#8b95a1]" strokeWidth={2} />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-[#f7f8fa] rounded-[20px] px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="메시지를 입력하세요"
              className="flex-1 bg-transparent text-[14px] text-[#191f28] placeholder:text-[#8b95a1] outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 ${
              message.trim()
                ? 'bg-[#191f28] text-white'
                : 'bg-[#e5e8eb] text-[#b0b8c1]'
            }`}
          >
            <Send className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  );
}
