'use client';

import { ArrowLeft, Search, X, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { requests } from '@/lib/data';
import RequestCard from '@/components/RequestCard';

const recentSearches = ['플라스틱', '박스 정리', '대형폐기물', '캔'];
const popularSearches = ['이사 박스', '플라스틱 페트병', '가구 수거', '종이류'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredRequests = query
    ? requests.filter((r) =>
        r.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white min-h-screen">
      {/* 검색 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/" className="active:opacity-70">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              placeholder="분리수거 요청 검색"
              className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setIsSearching(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </header>

      {!isSearching ? (
        <div className="px-4 py-4">
          {/* 최근 검색어 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-500">최근 검색어</h2>
              <button className="text-xs text-gray-400">전체 삭제</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => {
                    setQuery(search);
                    setIsSearching(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* 인기 검색어 */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-3">
              인기 검색어
            </h2>
            <div className="space-y-0">
              {popularSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => {
                    setQuery(search);
                    setIsSearching(true);
                  }}
                  className="flex items-center gap-3 w-full py-3 text-left border-b border-gray-50 last:border-b-0"
                >
                  <span className="w-5 text-center text-sm font-bold text-gray-900">
                    {index + 1}
                  </span>
                  <span className="text-gray-900">{search}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <Link key={req.id} href={`/request/${req.id}`}>
                <RequestCard request={req} />
              </Link>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 mb-1">
                &apos;{query}&apos; 검색 결과가 없어요
              </p>
              <p className="text-sm text-gray-400">
                다른 검색어로 다시 시도해보세요
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
