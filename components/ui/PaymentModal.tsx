'use client';

import { X, CreditCard, Landmark, Smartphone, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  proposal: {
    id: string;
    userName: string;
    userImage: string;
    price: number;
  };
  request: {
    description: string;
    imageUrl: string;
    location: string;
  };
}

type PaymentMethod = 'card' | 'bank' | 'kakaopay' | 'naverpay' | null;

export default function PaymentModal({
  isOpen,
  onClose,
  onPaymentComplete,
  proposal,
  request,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'select' | 'confirm'>('select');

  if (!isOpen) return null;

  const platformFee = Math.round(proposal.price * 0.05); // 5% 수수료
  const totalAmount = proposal.price + platformFee;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: '신용/체크카드',
      icon: CreditCard,
      description: '모든 카드 사용 가능',
    },
    {
      id: 'bank' as PaymentMethod,
      name: '계좌이체',
      icon: Landmark,
      description: '수수료 없음',
    },
    {
      id: 'kakaopay' as PaymentMethod,
      name: '카카오페이',
      icon: Smartphone,
      description: '간편결제',
    },
    {
      id: 'naverpay' as PaymentMethod,
      name: '네이버페이',
      icon: Smartphone,
      description: '간편결제',
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setIsProcessing(true);

    // 결제 시뮬레이션 (실제로는 PG사 API 호출)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    onPaymentComplete();
  };

  const handleNext = () => {
    if (step === 'select' && selectedMethod) {
      setStep('confirm');
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setStep('select');
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[70] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-white rounded-t-[20px] z-[80] animate-slide-up-sheet max-h-[90vh] overflow-y-auto">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white z-10">
          <div className="w-10 h-1 bg-[#e5e8eb] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-[#f2f4f6] sticky top-[20px] bg-white z-10">
          <h2 className="text-[17px] font-bold text-[#191f28]">
            {step === 'select' ? '결제 수단 선택' : '결제 확인'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f7f8fa]"
          >
            <X className="w-5 h-5 text-[#4e5968]" />
          </button>
        </div>

        {step === 'select' ? (
          // Step 1: 결제 수단 선택
          <>
            {/* Request Info */}
            <div className="px-5 py-4 bg-[#f7f8fa]">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-[8px] overflow-hidden relative bg-white flex-shrink-0">
                  <Image
                    src={request.imageUrl}
                    alt={request.description}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#191f28] line-clamp-1 mb-1">
                    {request.description}
                  </p>
                  <p className="text-[13px] text-[#8b95a1]">{request.location}</p>
                </div>
              </div>
            </div>

            {/* 수거인 정보 */}
            <div className="px-5 py-4 border-b border-[#f2f4f6]">
              <p className="text-[13px] text-[#8b95a1] mb-2">수거인</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-[#f7f8fa] flex-shrink-0">
                  <Image
                    src={proposal.userImage}
                    alt={proposal.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[15px] font-semibold text-[#191f28]">
                  {proposal.userName}
                </span>
              </div>
            </div>

            {/* 결제 수단 리스트 */}
            <div className="px-5 py-5">
              <p className="text-[13px] font-medium text-[#191f28] mb-3">결제 수단</p>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-[12px] border-2 transition-all pressable ${
                      selectedMethod === method.id
                        ? 'border-[#191f28] bg-[#f7f8fa]'
                        : 'border-[#e5e8eb] bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-[#191f28]' : 'bg-[#f2f4f6]'
                      }`}
                    >
                      <method.icon
                        className={`w-5 h-5 ${
                          selectedMethod === method.id ? 'text-white' : 'text-[#8b95a1]'
                        }`}
                        strokeWidth={2}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[15px] font-semibold text-[#191f28]">
                        {method.name}
                      </p>
                      <p className="text-[13px] text-[#8b95a1]">{method.description}</p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 ${
                        selectedMethod === method.id ? 'text-[#191f28]' : 'text-[#8b95a1]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 금액 요약 */}
            <div className="px-5 py-4 bg-[#f7f8fa] border-t border-[#e5e8eb]">
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#4e5968]">수거 비용</span>
                  <span className="text-[#191f28]">
                    {proposal.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#4e5968]">플랫폼 수수료 (5%)</span>
                  <span className="text-[#191f28]">{platformFee.toLocaleString()}원</span>
                </div>
              </div>
              <div className="h-px bg-[#e5e8eb] my-3" />
              <div className="flex justify-between">
                <span className="text-[15px] font-semibold text-[#191f28]">총 결제 금액</span>
                <span className="text-[18px] font-bold text-[#191f28]">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 안내 문구 */}
            <div className="px-5 py-4 bg-[#fffbf0] border-t border-[#ffe8b3]">
              <p className="text-[12px] text-[#8b6900] leading-[1.5]">
                💡 결제하신 금액은 수거 완료 확인 전까지 안전하게 보관되며, 수거 완료 후
                수거인에게 지급됩니다.
              </p>
            </div>

            {/* Next Button */}
            <div className="px-5 py-5">
              <button
                onClick={handleNext}
                disabled={!selectedMethod}
                className="w-full bg-[#191f28] text-white py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] disabled:cursor-not-allowed transition-colors"
              >
                다음
              </button>
            </div>
          </>
        ) : (
          // Step 2: 결제 확인
          <>
            {/* 최종 확인 정보 */}
            <div className="px-5 py-5 space-y-4">
              {/* 결제 수단 */}
              <div>
                <p className="text-[13px] text-[#8b95a1] mb-2">결제 수단</p>
                <div className="flex items-center gap-3 p-4 bg-[#f7f8fa] rounded-[12px]">
                  {paymentMethods.find((m) => m.id === selectedMethod)?.icon && (
                    <>
                      {(() => {
                        const Icon = paymentMethods.find((m) => m.id === selectedMethod)!.icon;
                        return <Icon className="w-5 h-5 text-[#191f28]" />;
                      })()}
                    </>
                  )}
                  <span className="text-[15px] font-semibold text-[#191f28]">
                    {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                  </span>
                </div>
              </div>

              {/* 수거 정보 */}
              <div>
                <p className="text-[13px] text-[#8b95a1] mb-2">수거 정보</p>
                <div className="p-4 bg-[#f7f8fa] rounded-[12px] space-y-2">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-[8px] overflow-hidden relative bg-white flex-shrink-0">
                      <Image
                        src={request.imageUrl}
                        alt={request.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-[#191f28] line-clamp-1 mb-1">
                        {request.description}
                      </p>
                      <p className="text-[13px] text-[#8b95a1]">{request.location}</p>
                    </div>
                  </div>
                  <div className="h-px bg-[#e5e8eb]" />
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative bg-white flex-shrink-0">
                      <Image
                        src={proposal.userImage}
                        alt={proposal.userName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#8b95a1]">수거인</p>
                      <p className="text-[14px] font-semibold text-[#191f28]">
                        {proposal.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 결제 금액 */}
              <div>
                <p className="text-[13px] text-[#8b95a1] mb-2">결제 금액</p>
                <div className="p-4 bg-[#f7f8fa] rounded-[12px] space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#4e5968]">수거 비용</span>
                    <span className="text-[#191f28]">
                      {proposal.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#4e5968]">플랫폼 수수료 (5%)</span>
                    <span className="text-[#191f28]">{platformFee.toLocaleString()}원</span>
                  </div>
                  <div className="h-px bg-[#e5e8eb]" />
                  <div className="flex justify-between">
                    <span className="text-[15px] font-semibold text-[#191f28]">
                      총 결제 금액
                    </span>
                    <span className="text-[18px] font-bold text-[#191f28]">
                      {totalAmount.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 약관 동의 */}
              <div className="p-4 bg-[#f7f8fa] rounded-[12px]">
                <p className="text-[12px] text-[#4e5968] leading-[1.5]">
                  결제 진행 시 <span className="font-semibold">서비스 이용약관</span> 및{' '}
                  <span className="font-semibold">환불 정책</span>에 동의하는 것으로
                  간주됩니다.
                </p>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="px-5 pb-5 space-y-2">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#191f28] text-white py-4 rounded-[10px] text-[15px] font-semibold pressable disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? '결제 진행 중...' : `${totalAmount.toLocaleString()}원 결제하기`}
              </button>
              <button
                onClick={handleBack}
                disabled={isProcessing}
                className="w-full bg-white border border-[#e5e8eb] text-[#4e5968] py-4 rounded-[10px] text-[15px] font-medium pressable disabled:opacity-50"
              >
                이전
              </button>
            </div>
          </>
        )}

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
