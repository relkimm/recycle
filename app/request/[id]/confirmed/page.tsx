'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-[var(--color-text-primary)]" />
        </div>

        <h1 className="text-[24px] font-bold text-[var(--color-text-primary)] mb-3">
          수거가 완료되었습니다!
        </h1>

        <p className="text-[15px] text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          결제가 완료되었습니다.
          <br />
          깨끗한 환경을 만들어주셔서 감사합니다.
        </p>

        <div className="space-y-2">
          <button
            onClick={() => router.push('/my')}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-[10px] font-semibold text-[16px] hover:opacity-90 transition-opacity"
          >
            내 페이지로 가기
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full py-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-[10px] font-medium text-[16px] hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
}
