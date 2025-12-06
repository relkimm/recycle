'use client';

import { X, Camera, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Select from '@/components/ui/Select';
import { useUser } from '@/lib/UserContext';

const categories = [
  { id: 'plastic', label: '플라스틱' },
  { id: 'paper', label: '종이/박스' },
  { id: 'can', label: '캔/고철' },
  { id: 'glass', label: '유리' },
  { id: 'vinyl', label: '비닐' },
  { id: 'large', label: '대형폐기물' },
  { id: 'mixed', label: '혼합' },
];

const timeOptions = [
  { value: 'today', label: '오늘 중' },
  { value: 'tomorrow_am', label: '내일 오전' },
  { value: 'tomorrow_pm', label: '내일 오후' },
  { value: 'this_week', label: '이번 주 내' },
];

export default function NewRequestPage() {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<{
    minPrice: number;
    maxPrice: number;
    category: string;
    description: string;
    detailedDescription: string;
  } | null>(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [pickupTime, setPickupTime] = useState('today');
  const [location, setLocation] = useState(user.location);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (images.length + newImages.length >= 5) return;
      const url = URL.createObjectURL(file);
      newImages.push(url);
    });

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    if (images.length === 0 && newImages.length > 0) {
      analyzeImages();
    }
  };

  const analyzeImages = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const recommendations = [
      {
        minPrice: 12000,
        maxPrice: 18000,
        category: 'plastic',
        description: '플라스틱 용기류가 많이 보여요',
        detailedDescription: '플라스틱 용기 약 15개, 페트병 10개 정도 있습니다. 깨끗하게 세척되어 있고 라벨도 제거된 상태예요.'
      },
      {
        minPrice: 15000,
        maxPrice: 25000,
        category: 'paper',
        description: '박스와 종이류가 있네요',
        detailedDescription: '택배 박스 5~7개 정도와 종이류가 있어요. 박스는 접어서 묶어두었습니다.'
      },
      {
        minPrice: 20000,
        maxPrice: 30000,
        category: 'mixed',
        description: '여러 종류가 섞여있어요',
        detailedDescription: '플라스틱, 종이, 캔 등 여러 종류가 섞여 있습니다. 대략 20~25개 정도 되는 것 같아요.'
      },
      {
        minPrice: 25000,
        maxPrice: 40000,
        category: 'large',
        description: '대형 폐기물이 포함되어 있어요',
        detailedDescription: '의자 1개, 선반 1개 등 대형 폐기물이 있어요. 크기가 있어서 차량이 필요할 것 같습니다.'
      },
    ];
    const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

    setAiRecommendation(recommendation);
    setSelectedCategory(recommendation.category);
    setPrice(recommendation.minPrice.toLocaleString());
    setDescription(recommendation.detailedDescription);
    setIsAnalyzing(false);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    if (images.length === 1) {
      setAiRecommendation(null);
      setDescription('');
      setPrice('');
      setSelectedCategory('');
    }
  };

  return (
    <>
      <div className="flex-1 bg-white overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <X className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">요청 등록하기</h1>
          <div className="w-10" />
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      <div className="px-5 py-6 space-y-8">
        {/* Photo Upload */}
        <section>
          <label className="block text-[13px] font-medium text-[#191f28] mb-3">
            사진 <span className="text-[#8b95a1] font-normal">({images.length}/5)</span>
          </label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-[80px] h-[80px] flex-shrink-0 border-2 border-dashed border-[#e5e8eb] rounded-[10px] flex flex-col items-center justify-center text-[#8b95a1] hover:border-[#b0b8c1] transition-colors"
            >
              <Camera className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[11px]">추가</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {images.map((src, index) => (
              <div key={index} className="relative w-[80px] h-[80px] flex-shrink-0 overflow-visible">
                <Image
                  src={src}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="rounded-[10px] object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-[#191f28] text-white rounded-full flex items-center justify-center text-[12px] font-medium shadow-md"
                >
                  ×
                </button>
                {index === 0 && (
                  <span className="absolute bottom-1 left-1 bg-[#191f28] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                    대표
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[#8b95a1] mt-2">
            분리수거할 물품 사진을 올려주세요
          </p>
        </section>

        {/* AI Analysis */}
        {isAnalyzing && (
          <section className="bg-[#f7f8fa] rounded-[12px] p-5 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#e5e8eb] rounded-full flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-[#4e5968] animate-spin" />
            </div>
            <div>
              <div className="text-[15px] font-medium text-[#191f28]">AI가 분석 중이에요</div>
              <div className="text-[13px] text-[#8b95a1]">잠시만 기다려주세요...</div>
            </div>
          </section>
        )}

        {/* AI Recommendation */}
        {aiRecommendation && !isAnalyzing && (
          <section className="bg-[#f7f8fa] border border-[#e5e8eb] rounded-[12px] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#4e5968]" strokeWidth={2} />
              <span className="text-[14px] font-semibold text-[#191f28]">AI 추천</span>
            </div>
            <div className="text-[22px] font-bold text-[#191f28] mb-1">
              {aiRecommendation.minPrice.toLocaleString()}원 ~ {aiRecommendation.maxPrice.toLocaleString()}원
            </div>
            <p className="text-[13px] text-[#4e5968]">
              {aiRecommendation.description}
            </p>
          </section>
        )}

        {/* Category */}
        <section>
          <label className="block text-[13px] font-medium text-[#191f28] mb-3">
            카테고리
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-[14px] font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#191f28] text-white'
                    : 'bg-[#f7f8fa] text-[#4e5968] hover:bg-[#f0f1f3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Description */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-[13px] font-medium text-[#191f28]">
              상세 설명
            </label>
            {description && aiRecommendation && (
              <div className="flex items-center gap-1 text-[11px] text-[#8b95a1]">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                <span>AI가 작성했어요</span>
              </div>
            )}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="수거자에게 전달할 내용을 적어주세요&#10;예) 플라스틱 10개, 박스 5개 정도 있어요"
            className="w-full border border-[#e5e8eb] rounded-[10px] p-4 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#191f28] focus:ring-1 focus:ring-[#191f28] h-[120px] resize-none transition-all"
          />
          {description && aiRecommendation && (
            <p className="text-[12px] text-[#8b95a1] mt-2">
              자유롭게 수정해보세요!
            </p>
          )}
        </section>

        {/* Price */}
        <section>
          <label className="block text-[13px] font-medium text-[#191f28] mb-3">
            희망 금액
          </label>
          <div className="relative">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9,]/g, ''))}
              placeholder="금액을 입력하세요"
              className="w-full border border-[#e5e8eb] rounded-[10px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#191f28] focus:ring-1 focus:ring-[#191f28] pr-12 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b95a1] text-[15px]">
              원
            </span>
          </div>
          {aiRecommendation && (
            <p className="text-[12px] text-[#8b95a1] mt-2">
              AI 추천가: {aiRecommendation.minPrice.toLocaleString()}원 ~ {aiRecommendation.maxPrice.toLocaleString()}원
            </p>
          )}
        </section>

        {/* Pickup Time */}
        <section>
          <Select
            label="수거 희망 시간"
            options={timeOptions}
            value={pickupTime}
            onChange={setPickupTime}
          />
        </section>

        {/* Location */}
        <section>
          <label className="block text-[13px] font-medium text-[#191f28] mb-3">
            수거 장소
          </label>
          <Link
            href="/request/new/location"
            className="w-full border border-[#e5e8eb] rounded-[10px] px-4 py-3.5 flex justify-between items-center mb-3 pressable"
          >
            <span className="text-[15px] text-[#191f28]">{location.name}</span>
            <span className="text-[13px] text-[#8b95a1]">변경</span>
          </Link>
          <input
            type="text"
            placeholder="상세 주소 (예: OO아파트 101동 앞)"
            className="w-full border border-[#e5e8eb] rounded-[10px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#191f28] focus:ring-1 focus:ring-[#191f28] transition-all"
          />
        </section>
      </div>
      </div>

      {/* Submit Button */}
      <div className="flex-shrink-0 w-full bg-white z-[60]">
        <div className="absolute inset-x-0 -top-3 h-3 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-[#e5e8eb]" />

        <div className="px-5 py-3">
          <button
            disabled={images.length === 0 || isAnalyzing}
            className="w-full bg-[#191f28] text-white py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] disabled:cursor-not-allowed transition-colors"
          >
            요청 등록하기
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
