'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link href="/my/settings" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]">
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">이용약관</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Content */}
      <div className="px-5 py-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-[15px] font-semibold text-[#191f28] mb-3">제1조 (목적)</h2>
            <p className="text-[14px] text-[#4e5968] leading-[1.7]">
              이 약관은 분리수거 매칭 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#191f28] mb-3">제2조 (정의)</h2>
            <p className="text-[14px] text-[#4e5968] leading-[1.7]">
              1. "서비스"라 함은 회사가 제공하는 분리수거 매칭 플랫폼을 의미합니다.<br />
              2. "이용자"라 함은 본 약관에 따라 서비스를 이용하는 회원을 의미합니다.<br />
              3. "요청자"라 함은 분리수거 서비스를 요청하는 이용자를 의미합니다.<br />
              4. "수거자"라 함은 분리수거 서비스를 제공하는 이용자를 의미합니다.
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#191f28] mb-3">제3조 (서비스 이용)</h2>
            <p className="text-[14px] text-[#4e5968] leading-[1.7]">
              1. 이용자는 서비스를 통해 분리수거 요청을 등록하거나 제안할 수 있습니다.<br />
              2. 매칭 성사 후 노쇼(약속 불이행) 시 서비스 이용에 제한이 있을 수 있습니다.<br />
              3. 허위 정보 등록 시 서비스 이용이 제한됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
