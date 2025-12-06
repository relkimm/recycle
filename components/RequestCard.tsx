import Image from 'next/image';
import { Request, categoryLabels } from '@/lib/data';
import { Heart, MessageCircle } from 'lucide-react';

export default function RequestCard({ request }: { request: Request }) {
  const category = categoryLabels[request.category];

  return (
    <article className="flex gap-4 py-4 pressable cursor-pointer">
      {/* Image */}
      <div className="relative w-[108px] h-[108px] flex-shrink-0 rounded-[12px] overflow-hidden bg-[var(--color-bg-secondary)]">
        <Image
          src={request.imageUrl}
          alt="Request"
          fill
          className="object-cover"
        />
        {request.status !== 'recruiting' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-[13px] font-medium">
              {request.status === 'matched' ? '매칭 완료' : '수거 완료'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
        <div>
          {/* Title */}
          <h3 className="text-[15px] text-[var(--color-text-primary)] leading-[1.4] line-clamp-2 mb-1">
            {request.description}
          </h3>

          {/* Meta */}
          <div className="flex items-center gap-1 text-[13px] text-[var(--color-text-tertiary)]">
            <span>{request.location}</span>
            <span>·</span>
            <span>{request.timeAgo}</span>
          </div>

          {/* Category Badge */}
          <div className="mt-1.5">
            <span className="inline-block px-2 py-[3px] bg-[var(--color-border-light)] rounded-[4px] text-[11px] text-[var(--color-text-secondary)] font-medium">
              {category.label}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-end mt-2">
          <span className="text-[17px] font-bold text-[var(--color-text-primary)]">
            {request.price.toLocaleString()}원
          </span>

          <div className="flex items-center gap-3">
            {request.proposalCount > 0 && (
              <div className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                <MessageCircle className="w-[15px] h-[15px]" strokeWidth={2} />
                <span className="text-[12px]">{request.proposalCount}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
              <Heart className="w-[15px] h-[15px]" strokeWidth={2} />
              <span className="text-[12px]">{Math.floor(Math.random() * 10) + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
