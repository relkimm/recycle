'use client';

import { ArrowLeft, MapPin, Check, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import Link from 'next/link';

const nearbyLocations = [
  { id: '1', name: '역삼동', distance: '현재 위치' },
  { id: '2', name: '삼성동', distance: '0.5km' },
  { id: '3', name: '논현동', distance: '0.8km' },
  { id: '4', name: '청담동', distance: '1.2km' },
  { id: '5', name: '신사동', distance: '1.5km' },
  { id: '6', name: '압구정동', distance: '2.0km' },
];

export default function LocationSettingPage() {
  const router = useRouter();
  const { user, updateLocation } = useUser();
  const [selectedLocation, setSelectedLocation] = useState(user.location.id);
  const [isLocating, setIsLocating] = useState(false);

  const handleCurrentLocation = () => {
    setIsLocating(true);
    // 위치 조회 시뮬레이션
    setTimeout(() => {
      setIsLocating(false);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-[88px]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">동네 설정</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Map Preview */}
      <div className="relative h-[200px] bg-[#f7f8fa] flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-10 h-10 text-[#191f28] mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-[14px] text-[#4e5968]">지도 영역</p>
        </div>
        {/* 실제 지도 연동 시 카카오맵 등 사용 */}
      </div>

      {/* Current Location Button */}
      <div className="px-5 py-4 border-b border-[#f2f4f6]">
        <button
          onClick={handleCurrentLocation}
          disabled={isLocating}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#f7f8fa] rounded-[10px] text-[14px] font-medium text-[#191f28] pressable disabled:opacity-50"
        >
          <Navigation className={`w-4 h-4 ${isLocating ? 'animate-pulse' : ''}`} strokeWidth={2} />
          {isLocating ? '위치 찾는 중...' : '현재 위치로 찾기'}
        </button>
      </div>

      {/* Location List */}
      <div className="px-5">
        <p className="text-[12px] text-[#8b95a1] py-3">근처 동네</p>
        <div className="divide-y divide-[#f2f4f6]">
          {nearbyLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location.id)}
              className="w-full flex items-center justify-between py-4 pressable"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#8b95a1]" strokeWidth={2} />
                <div className="text-left">
                  <span className="text-[15px] text-[#191f28] font-medium">
                    {location.name}
                  </span>
                  <span className="text-[13px] text-[#8b95a1] ml-2">
                    {location.distance}
                  </span>
                </div>
              </div>
              {selectedLocation === location.id && (
                <Check className="w-5 h-5 text-[#191f28]" strokeWidth={2.5} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-white z-[60]">
        <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-[#e5e8eb]" />

        <div className="px-5 py-3">
          <button
            onClick={() => {
              const location = nearbyLocations.find((l) => l.id === selectedLocation);
              if (location) {
                updateLocation({ id: location.id, name: location.name });
                router.back();
              }
            }}
            className="w-full bg-[#191f28] text-white py-4 rounded-[10px] text-[15px] font-semibold text-center pressable"
          >
            선택 완료
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </div>
  );
}
