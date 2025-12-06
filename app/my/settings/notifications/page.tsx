'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-[52px] h-[32px] rounded-full transition-colors ${
        enabled ? 'bg-[#191f28]' : 'bg-[#e5e8eb]'
      }`}
    >
      <span
        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
          enabled ? 'left-[22px]' : 'left-1'
        }`}
      />
    </button>
  );
}

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState({
    newProposal: true,
    proposalAccepted: true,
    chat: true,
    marketing: false,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">알림 설정</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Content */}
      <div className="px-5 py-2">
        {/* Activity Notifications */}
        <div className="py-4">
          <h2 className="text-[12px] font-medium text-[#8b95a1] mb-3">활동 알림</h2>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] text-[#191f28] font-medium">새로운 제안</p>
                <p className="text-[13px] text-[#8b95a1] mt-0.5">내 요청에 제안이 들어오면 알림</p>
              </div>
              <Toggle
                enabled={settings.newProposal}
                onChange={(v) => updateSetting('newProposal', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] text-[#191f28] font-medium">제안 수락</p>
                <p className="text-[13px] text-[#8b95a1] mt-0.5">내 제안이 수락되면 알림</p>
              </div>
              <Toggle
                enabled={settings.proposalAccepted}
                onChange={(v) => updateSetting('proposalAccepted', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] text-[#191f28] font-medium">채팅 메시지</p>
                <p className="text-[13px] text-[#8b95a1] mt-0.5">새로운 채팅이 오면 알림</p>
              </div>
              <Toggle
                enabled={settings.chat}
                onChange={(v) => updateSetting('chat', v)}
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-[#f2f4f6]" />

        {/* Marketing Notifications */}
        <div className="py-4">
          <h2 className="text-[12px] font-medium text-[#8b95a1] mb-3">마케팅 알림</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] text-[#191f28] font-medium">이벤트 및 혜택</p>
              <p className="text-[13px] text-[#8b95a1] mt-0.5">이벤트, 프로모션 소식 알림</p>
            </div>
            <Toggle
              enabled={settings.marketing}
              onChange={(v) => updateSetting('marketing', v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
