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
    <div className="bg-[var(--color-bg)] sticky top-[var(--header-height)] z-40">
      {/* Category Tabs */}
      <div className="px-5 overflow-x-auto no-scrollbar">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3 py-3 text-[14px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
              }`}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border-light)]" />

      {/* Filter Options */}
      <div className="px-5 py-2.5 flex justify-between items-center bg-[#fafbfc]">
        <button className="flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] pressable">
          내 동네
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
        <button className="flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] pressable">
          최신순
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Border */}
      <div className="h-px bg-[var(--color-border)]" />
    </div>
  );
}
