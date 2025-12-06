'use client';

import { ArrowLeft, ChevronRight, Bell, MapPin, FileText, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/lib/UserContext';

export default function SettingsPage() {
  const { user } = useUser();

  const menuItems = [
    {
      icon: Bell,
      label: '알림 설정',
      href: '/my/settings/notifications',
    },
    {
      icon: MapPin,
      label: '동네 설정',
      href: '/my/settings/location',
      description: user.location.name,
    },
    {
      icon: FileText,
      label: '이용약관',
      href: '/my/settings/terms',
    },
    {
      icon: HelpCircle,
      label: '고객센터',
      href: '/my/settings/help',
    },
  ];
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center gap-4 border-b border-gray-100">
        <Link href="/my" className="active:opacity-70">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">설정</h1>
      </header>

      {/* Menu */}
      <div className="py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-4 py-4 active:bg-gray-50"
            >
              <Icon className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <span className="text-gray-900">{item.label}</span>
                {item.description && (
                  <span className="text-sm text-gray-500 ml-2">{item.description}</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-2 bg-gray-100" />

      {/* Account */}
      <div className="py-2">
        <div className="px-4 py-3">
          <span className="text-xs text-gray-500 font-medium">계정</span>
        </div>
        <button className="flex items-center gap-4 px-4 py-4 w-full active:bg-gray-50">
          <LogOut className="w-5 h-5 text-gray-500" />
          <span className="text-gray-900">로그아웃</span>
        </button>
        <button className="flex items-center gap-4 px-4 py-4 w-full active:bg-gray-50">
          <span className="text-red-500">회원탈퇴</span>
        </button>
      </div>

      {/* Version */}
      <div className="px-4 py-4 text-center">
        <span className="text-sm text-gray-400">버전 1.0.0</span>
      </div>
    </div>
  );
}
