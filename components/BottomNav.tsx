'use client';

import { Home, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/request/new', icon: Plus, label: '등록', isCenter: true },
  { href: '/my', icon: User, label: '마이' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-shrink-0 w-full bg-white z-50 border-t border-[#f2f4f6]">
      {/* Shadow */}
      <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />

      <div className="flex justify-around items-center h-[56px] px-4">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center -mt-4"
              >
                <div className="w-[52px] h-[52px] bg-[#191f28] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.25)] pressable">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-5 transition-colors ${
                isActive ? 'text-[#191f28]' : 'text-[#b0b8c1]'
              }`}
            >
              <Icon
                className="w-[22px] h-[22px]"
                strokeWidth={isActive ? 2.5 : 2}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe Area */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  );
}
