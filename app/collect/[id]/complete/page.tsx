'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, X } from 'lucide-react';
import { requests, categoryLabels } from '@/lib/data';
import { categoryBadgeStyles } from '@/lib/badgeStyles';
import Image from 'next/image';

export default function CompleteCollectPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--color-text-secondary)]">요청을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      alert('수거 완료 사진을 촬영해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 실제로는 API 호출
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/collect/${requestId}/submitted`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-[var(--color-border)]">
        <div className="flex items-center h-[56px] px-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-[var(--color-bg-secondary)] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-[17px] font-semibold">수거 완료 인증</h1>
        </div>
      </header>

      <div className="p-4">
        {/* 요청 정보 요약 */}
        <div className="mb-6 p-4 bg-white rounded-[12px]">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-[10px] overflow-hidden flex-shrink-0 bg-[var(--color-bg-secondary)]">
              <Image
                src={request.imageUrl}
                alt={request.description}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${categoryBadgeStyles}`}>
                  {categoryLabels[request.category].label}
                </span>
              </div>
              <p className="text-[15px] text-[var(--color-text-primary)] line-clamp-2 mb-2">
                {request.description}
              </p>
              <p className="text-[17px] font-bold text-[var(--color-text-primary)]">
                {request.price.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="mb-6 p-4 bg-[var(--color-bg-secondary)] rounded-[12px]">
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">
            수거 완료 인증 안내
          </h3>
          <ul className="space-y-2.5 text-[13px] text-[var(--color-text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-text-tertiary)] mt-0.5">•</span>
              <span>수거한 재활용품이 잘 보이도록 사진을 촬영해주세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-text-tertiary)] mt-0.5">•</span>
              <span>사진 제출 후 요청자가 확인하면 수익이 정산됩니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-text-tertiary)] mt-0.5">•</span>
              <span>허위 인증 시 패널티가 부과될 수 있습니다</span>
            </li>
          </ul>
        </div>

        {/* 사진 촬영/업로드 */}
        <div className="mb-6">
          <h3 className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-3">
            수거 완료 사진
          </h3>

          {previewImage ? (
            <div className="relative">
              <div className="w-full aspect-square rounded-[12px] overflow-hidden bg-[var(--color-bg-secondary)]">
                <Image
                  src={previewImage}
                  alt="수거 완료"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleRemoveImage}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mt-3 flex items-center gap-2 text-[var(--color-text-secondary)]">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[13px] font-medium">사진이 선택되었습니다</span>
              </div>
            </div>
          ) : (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="w-full aspect-square rounded-[12px] border-2 border-dashed border-[var(--color-border)] bg-white flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] transition-colors">
                <div className="w-16 h-16 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center mb-3">
                  <Camera className="w-8 h-8 text-[var(--color-text-secondary)]" />
                </div>
                <p className="text-[15px] font-semibold text-[var(--color-text-primary)] mb-1">
                  사진 촬영하기
                </p>
                <p className="text-[13px] text-[var(--color-text-secondary)]">
                  탭하여 카메라 실행
                </p>
              </div>
            </label>
          )}
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] safe-area-bottom">
        <div className="max-w-[560px] mx-auto p-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedImage || isSubmitting}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-[10px] font-semibold text-[16px] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '제출 중...' : '수거 완료 인증하기'}
          </button>
        </div>
      </div>

      {/* 하단 여백 */}
      <div className="h-[100px]" />
    </div>
  );
}
