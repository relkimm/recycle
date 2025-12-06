'use client';

import { ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { requests } from '@/lib/data';
import { useToast } from '@/lib/ToastContext';

// 시뮬레이션용 제안 데이터
const initialProposals = [
  {
    id: '1',
    userName: '최예린',
    userImage: 'https://picsum.photos/seed/user1/100/100',
    price: 12000,
    message: '바로 수거 가능해요!',
    transactionCount: 28,
    noShowCount: 0,
    createdAt: '5분 전',
    isLowest: true,
  },
  {
    id: '2',
    userName: '정민준',
    userImage: 'https://picsum.photos/seed/user2/100/100',
    price: 14000,
    message: '30분 내로 갈 수 있어요',
    transactionCount: 15,
    noShowCount: 0,
    createdAt: '12분 전',
    isLowest: false,
  },
  {
    id: '3',
    userName: '강소율',
    userImage: 'https://picsum.photos/seed/user3/100/100',
    price: 15000,
    message: '꼼꼼하게 수거해 드릴게요',
    transactionCount: 42,
    noShowCount: 1,
    createdAt: '30분 전',
    isLowest: false,
  },
];

export default function ProposalsPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const id = params.id as string;
  const request = requests.find((r) => r.id === id) || requests[0];

  const [acceptedProposalId, setAcceptedProposalId] = useState<string | null>(null);

  const handleAccept = (proposalId: string, userName: string) => {
    setAcceptedProposalId(proposalId);
    showToast(`${userName}님의 제안을 수락했어요!`);
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="px-4 py-3 flex items-center gap-4">
          <Link
            href={`/request/${id}`}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]"
          >
            <ArrowLeft className="w-5 h-5 text-[#191f28]" strokeWidth={2} />
          </Link>
          <h1 className="text-[17px] font-bold text-[#191f28]">받은 제안</h1>
        </div>
        <div className="h-px bg-[#f2f4f6]" />
      </header>

      {/* Request Summary */}
      <div className="px-5 py-4 border-b border-[#f2f4f6]">
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-[8px] overflow-hidden relative bg-[#f7f8fa] flex-shrink-0">
            <Image
              src={request.imageUrl}
              alt={request.description}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] text-[#191f28] line-clamp-1 mb-0.5">{request.description}</p>
            <p className="text-[13px] text-[#8b95a1]">{request.location}</p>
            <p className="text-[15px] font-bold text-[#191f28] mt-1">
              희망가 {request.price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      {/* Proposals Count */}
      <div className="px-5 py-3 bg-[#f7f8fa]">
        <span className="text-[13px] text-[#4e5968]">
          총 <span className="font-bold text-[#191f28]">{initialProposals.length}개</span>의 제안
        </span>
      </div>

      {/* Proposals List */}
      <div className="px-5">
        {initialProposals.map((proposal) => {
          const isAccepted = acceptedProposalId === proposal.id;
          const isRejected = acceptedProposalId !== null && acceptedProposalId !== proposal.id;

          return (
            <div
              key={proposal.id}
              className={`py-5 border-b border-[#f2f4f6] last:border-b-0 ${isRejected ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-full overflow-hidden relative bg-[#f7f8fa]">
                  <Image
                    src={proposal.userImage}
                    alt={proposal.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[15px] font-semibold text-[#191f28]">
                      {proposal.userName}
                    </span>
                    {isAccepted && (
                      <span className="bg-[#191f28] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                        수락됨
                      </span>
                    )}
                    {!isAccepted && proposal.isLowest && !isRejected && (
                      <span className="bg-[#191f28] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                        최저가
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-[#8b95a1]">
                    거래 {proposal.transactionCount}회 · 노쇼 {proposal.noShowCount}회 · {proposal.createdAt}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[20px] font-bold text-[#191f28] mb-1">
                  {proposal.price.toLocaleString()}원
                </div>
                {proposal.message && (
                  <p className="text-[14px] text-[#4e5968]">
                    "{proposal.message}"
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {isAccepted ? (
                  // 수락된 제안: 채팅하기 버튼만
                  <Link
                    href={`/chat/${proposal.id}`}
                    className="flex-1 py-3 bg-[#191f28] text-white text-[14px] font-semibold rounded-[10px] text-center pressable flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={2} />
                    채팅하기
                  </Link>
                ) : isRejected ? (
                  // 마감된 제안
                  <button
                    disabled
                    className="flex-1 py-3 bg-[#f2f4f6] text-[#8b95a1] text-[14px] font-medium rounded-[10px]"
                  >
                    마감됨
                  </button>
                ) : (
                  // 대기중인 제안
                  <>
                    <Link
                      href={`/chat/${proposal.id}`}
                      className="flex-1 py-3 border border-[#e5e8eb] text-[#4e5968] text-[14px] font-medium rounded-[10px] pressable text-center"
                    >
                      채팅하기
                    </Link>
                    <button
                      onClick={() => handleAccept(proposal.id, proposal.userName)}
                      className="flex-1 py-3 bg-[#191f28] text-white text-[14px] font-semibold rounded-[10px] pressable"
                    >
                      수락하기
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
