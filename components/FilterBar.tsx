'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'all', label: '전체' },
  { id: 'plastic', label: '플라스틱' },
  { id: 'paper', label: '종이/박스' },
  { id: 'can', label: '캔/고철' },
  { id: 'glass', label: '유리' },
  { id: 'vinyl', label: '비닐' },
  { id: 'large', label: '대형폐기물' },
];

export default function FilterBar() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-white sticky top-[53px] z-40">
      {/* Category Tabs */}
      <div className="px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3 py-3 text-[14px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'text-[#191f28]'
                  : 'text-[#8b95a1] hover:text-[#4e5968]'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#191f28]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#f2f4f6]" />

      {/* Filter Options */}
      <div className="px-5 py-2.5 flex justify-between items-center bg-[#fafbfc]">
        <button className="flex items-center gap-1 text-[13px] text-[#4e5968] pressable">
          내 동네
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
        <button className="flex items-center gap-1 text-[13px] text-[#4e5968] pressable">
          최신순
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Border */}
      <div className="h-px bg-[#e5e8eb]" />
    </div>
  );
}
