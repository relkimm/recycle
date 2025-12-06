'use client';

import { ArrowLeft, Camera } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useUser } from '@/lib/UserContext';

export default function ProfileEditPage() {
  const { user } = useUser();
  const [name, setName] = useState(user.name);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white min-h-screen pb-[88px]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">프로필 수정</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      <div className="px-5 py-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-10">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative group"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden relative bg-[#f7f8fa]">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#191f28] rounded-full flex items-center justify-center border-2 border-white">
              <Camera className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-[13px] font-medium text-[#8b95a1] mb-2">
              닉네임
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#e5e8eb] rounded-[10px] px-4 py-3.5 text-[15px] text-[#191f28] focus:border-[#191f28] focus:ring-1 focus:ring-[#191f28] transition-colors"
              placeholder="닉네임을 입력하세요"
            />
            <p className="text-[12px] text-[#8b95a1] mt-2">
              2~10자 이내로 입력해주세요
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[13px] font-medium text-[#8b95a1] mb-2">
              동네
            </label>
            <Link
              href="/my/settings/location"
              className="w-full border border-[#e5e8eb] rounded-[10px] px-4 py-3.5 flex justify-between items-center pressable"
            >
              <span className="text-[15px] text-[#191f28]">{user.location.name}</span>
              <span className="text-[13px] text-[#8b95a1]">변경</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white z-[60]">
        <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-[#e5e8eb]" />

        <div className="px-5 py-3">
          <button className="w-full bg-[#191f28] text-white py-4 rounded-[10px] text-[15px] font-semibold pressable">
            저장하기
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
}
