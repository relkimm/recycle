'use client';

import { Bell, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/lib/UserContext';
import { notifications } from '@/lib/data';

export default function Header() {
  const { user } = useUser();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="px-5 py-3 flex justify-between items-center">
        {/* Location */}
        <Link href="/my/settings/location" className="flex items-center gap-0.5 pressable">
          <span className="text-[18px] font-bold text-[#191f28]">{user.location.name}</span>
          <ChevronDown className="w-5 h-5 text-[#4e5968]" strokeWidth={2.5} />
        </Link>

        {/* Actions */}
        <div className="flex items-center">
          <Link
            href="/search"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa] transition-colors"
          >
            <Search className="w-[22px] h-[22px] text-[#191f28]" strokeWidth={2} />
          </Link>
          <Link
            href="/notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa] transition-colors"
          >
            <Bell className="w-[22px] h-[22px] text-[#191f28]" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-[6px] h-[6px] bg-[#f04452] rounded-full" />
            )}
          </Link>
        </div>
      </div>

      {/* Border */}
      <div className="h-px bg-[#f2f4f6]" />
    </header>
  );
}
