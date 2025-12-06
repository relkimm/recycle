'use client';

import { ArrowLeft, ChevronRight, MessageCircle, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

const helpItems = [
  {
    icon: MessageCircle,
    label: '자주 묻는 질문',
    href: '/my/settings/help/faq',
  },
  {
    icon: Mail,
    label: '1:1 문의하기',
    href: '/my/settings/help/contact',
  },
  {
    icon: FileText,
    label: '공지사항',
    href: '/my/settings/help/notice',
  },
];

export default function HelpPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">고객센터</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Menu */}
      <div className="py-2">
        {helpItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 pressable"
            >
              <Icon className="w-5 h-5 text-[#8b95a1]" strokeWidth={2} />
              <span className="flex-1 text-[15px] text-[#191f28]">{item.label}</span>
              <ChevronRight className="w-5 h-5 text-[#b0b8c1]" />
            </Link>
          );
        })}
      </div>

      {/* Contact Info */}
      <div className="mx-5 mt-4 p-5 bg-[#f7f8fa] rounded-[14px]">
        <h3 className="text-[14px] font-semibold text-[#191f28] mb-3">운영 시간</h3>
        <p className="text-[13px] text-[#4e5968] leading-[1.6]">
          평일 09:00 - 18:00<br />
          (점심시간 12:00 - 13:00 제외)<br />
          주말 및 공휴일 휴무
        </p>
      </div>
    </div>
  );
}
