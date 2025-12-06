'use client';

import { X, CreditCard, Landmark, Smartphone } from 'lucide-react';
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

type PaymentTab = 'card';

export default function PaymentModal({
  isOpen,
  onClose,
  onPaymentComplete,
  proposal,
  request,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  // 카드 정보 상태
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const totalAmount = proposal.price; // 수수료 없음

  const handleCardNumberChange = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1-').slice(0, 19);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    const formatted = numbers.replace(/(\d{2})(?=\d)/, '$1/').slice(0, 5);
    setExpiry(formatted);
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // 결제 시뮬레이션 (실제로는 토스페이먼츠 API 호출)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onPaymentComplete();
  };

  const isPaymentReady = () => {
    return cardNumber.length === 19 && expiry.length === 5 && cvc.length === 3 && password.length >= 2;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[70] animate-fade-in"
        onClick={onClose}
      />

      {/* Modal - 토스페이먼츠 스타일 */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-white rounded-t-[24px] z-[80] animate-slide-up-sheet">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-[#e5e8eb] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-[#191f28]">결제</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f7f8fa] transition-colors"
          >
            <X className="w-5 h-5 text-[#4e5968]" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[75vh]">
          {/* 결제 금액 - 상단에 크게 */}
          <div className="px-5 pb-5">
            <div className="bg-gradient-to-br from-[#f7f8fa] to-[#eef0f3] rounded-[16px] p-5">
              <p className="text-[13px] text-[#8b95a1] mb-1">결제 금액</p>
              <p className="text-[32px] font-bold text-[#191f28] mb-3">
                {totalAmount.toLocaleString()}
                <span className="text-[20px] ml-1">원</span>
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#e5e8eb]">
                <div className="w-12 h-12 rounded-[10px] overflow-hidden relative bg-white flex-shrink-0">
                  <Image
                    src={request.imageUrl}
                    alt={request.description}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[#191f28] line-clamp-1 mb-0.5">
                    {request.description}
                  </p>
                  <p className="text-[12px] text-[#8b95a1]">
                    {request.location} · {proposal.userName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 입력 폼 */}
          <div className="px-5 pb-5">
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#191f28] mb-2">
                  카드번호
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="0000-0000-0000-0000"
                  className="w-full border border-[#e5e8eb] rounded-[12px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 outline-none transition-all"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[13px] font-medium text-[#191f28] mb-2">
                    유효기간
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full border border-[#e5e8eb] rounded-[12px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[13px] font-medium text-[#191f28] mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/[^\d]/g, '').slice(0, 3))}
                    placeholder="000"
                    maxLength={3}
                    className="w-full border border-[#e5e8eb] rounded-[12px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#191f28] mb-2">
                  카드 비밀번호 앞 2자리
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replace(/[^\d]/g, '').slice(0, 2))}
                  placeholder="••"
                  maxLength={2}
                  className="w-24 border border-[#e5e8eb] rounded-[12px] px-4 py-3.5 text-[15px] text-[#191f28] placeholder-[#b0b8c1] focus:border-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 outline-none transition-all"
                />
              </div>

              {/* 카드 저장 옵션 */}
              <label className="flex items-center gap-3 p-4 bg-[#f7f8fa] rounded-[12px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-[#e5e8eb] text-[#3182F6] focus:ring-2 focus:ring-[#3182F6]/20 cursor-pointer"
                />
                <span className="text-[14px] text-[#191f28]">다음에도 사용</span>
              </label>
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="px-5 pb-5">
            <div className="p-4 bg-[#fffbf0] border border-[#ffe8b3] rounded-[12px]">
              <p className="text-[12px] text-[#8b6900] leading-[1.5]">
                💡 결제하신 금액은 수거 완료 확인 전까지 안전하게 보관되며, 수거 완료 후 수거인에게 지급됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 결제 버튼 - 고정 하단 */}
        <div className="px-5 pt-3 pb-5 bg-white border-t border-[#f2f4f6]">
          <button
            onClick={handlePayment}
            disabled={!isPaymentReady() || isProcessing}
            className="w-full bg-[#3182F6] text-white py-4 rounded-[12px] text-[16px] font-bold pressable disabled:bg-[#e5e8eb] disabled:text-[#b0b8c1] disabled:cursor-not-allowed transition-all shadow-lg shadow-[#3182F6]/20 disabled:shadow-none"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                결제 진행 중...
              </span>
            ) : (
              `${totalAmount.toLocaleString()}원 결제하기`
            )}
          </button>
        </div>

        <div className="h-[env(safe-area-inset-bottom,0px)]" />
      </div>
    </>
  );
}
