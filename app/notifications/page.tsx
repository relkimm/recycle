'use client';

import { ArrowLeft, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notifications } from '@/lib/data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const router = useRouter();
  const [notificationList, setNotificationList] = useState(notifications);

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    // 알림을 읽음으로 표시
    setNotificationList((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );

    // 관련 페이지로 이동
    if (notification.type === 'proposal' || notification.type === 'system') {
      router.push(`/request/${notification.relatedId}`);
    } else if (notification.type === 'proposal_accepted' || notification.type === 'proposal_rejected') {
      router.push(`/request/${notification.relatedId}`);
    } else if (notification.type === 'chat') {
      router.push(`/chat/${notification.relatedId}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#f2f4f6]">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center -ml-2 pressable rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-[#191f28]" strokeWidth={2} />
          </button>
          <h1 className="text-[17px] font-semibold text-[#191f28]">알림</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {notificationList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-5 py-20">
            <div className="w-20 h-20 bg-[#f7f8fa] rounded-full flex items-center justify-center mb-4">
              <Bell className="w-10 h-10 text-[#d1d5db]" strokeWidth={1.5} />
            </div>
            <p className="text-[15px] text-[#8b95a1] text-center">
              알림이 없어요
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#f2f4f6]">
            {notificationList.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`w-full flex gap-3 px-5 py-4 pressable transition-colors ${
                  !notification.isRead ? 'bg-[#f0fdf4]' : 'bg-white hover:bg-[#f7f8fa]'
                }`}
              >
                {/* User Image */}
                <div className="flex-shrink-0">
                  {notification.userImage ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#f7f8fa]">
                      <Image
                        src={notification.userImage}
                        alt={notification.userName || 'User'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-[#f7f8fa] rounded-full flex items-center justify-center">
                      <Bell className="w-6 h-6 text-[#8b95a1]" strokeWidth={2} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      className={`text-[15px] font-semibold ${
                        !notification.isRead ? 'text-[#191f28]' : 'text-[#4e5968]'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    {!notification.isRead && (
                      <div className="flex-shrink-0 w-2 h-2 bg-[#16A34A] rounded-full mt-1.5" />
                    )}
                  </div>
                  <p className="text-[14px] text-[#8b95a1] leading-[1.5] mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  <span className="text-[13px] text-[#b4bac1]">
                    {notification.timestamp}
                  </span>
                </div>

                {/* Thumbnail */}
                {notification.relatedImage && (
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-[#f7f8fa]">
                    <Image
                      src={notification.relatedImage}
                      alt="Related"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
