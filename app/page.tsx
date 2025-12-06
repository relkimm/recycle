import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import RequestCard from '@/components/RequestCard';
import BottomNav from '@/components/BottomNav';
import { requests } from '@/lib/data';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="flex-1 bg-[var(--color-bg)] overflow-y-auto">
        <Header />
        <FilterBar />

        {/* Request List */}
        <div className="px-5 pb-5">
          {requests.length > 0 ? (
            <div className="divide-y divide-[var(--color-border-light)]">
              {requests.map((req) => (
                <Link key={req.id} href={`/request/${req.id}`}>
                  <RequestCard request={req} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 bg-[var(--color-bg-secondary)] rounded-full flex items-center justify-center mb-5">
                <Package className="w-10 h-10 text-[var(--color-text-disabled)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-semibold text-[var(--color-text-primary)] mb-2">
                아직 동네에 요청이 없어요
              </h3>
              <p className="text-[14px] text-[var(--color-text-tertiary)] mb-6">
                첫 번째로 분리수거 요청을 등록해볼까요?
              </p>
              <Link
                href="/request/new"
                className="bg-[var(--color-primary)] text-white px-5 py-3 rounded-[10px] text-[15px] font-semibold pressable"
              >
                요청 등록하기
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
}
