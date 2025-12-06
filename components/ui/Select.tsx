'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = '선택하세요',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {label && (
        <label className="block text-[13px] font-medium text-[#191f28] mb-2">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 border rounded-[10px] text-[15px] transition-all pressable ${
          isOpen
            ? 'border-[#191f28] ring-1 ring-[#191f28]'
            : 'border-[#e5e8eb]'
        }`}
      >
        <span className={selectedOption ? 'text-[#191f28]' : 'text-[#b0b8c1]'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#8b95a1] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-[#e5e8eb] rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                  value === option.value
                    ? 'bg-[#f7f8fa] text-[#191f28] font-medium'
                    : 'text-[#4e5968] hover:bg-[#f7f8fa]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
