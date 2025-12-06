// 배지 색상 시스템 통일

export const statusBadgeStyles = {
  // 거래 상태 (요청, 제안 등)
  pending: 'bg-[#fff8e6] text-[#f59e0b] border-[#f59e0b]/20',
  recruiting: 'bg-[#e8f5e9] text-[#16a34a] border-[#16a34a]/20',
  matched: 'bg-[#e0f2fe] text-[#0284c7] border-[#0284c7]/20',
  completed: 'bg-[#e8f5e9] text-[#16a34a] border-[#16a34a]/20',

  // 제안 상태
  accepted: 'bg-[var(--color-primary)] text-[var(--color-bg)]',
  rejected: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border-[var(--color-border)]',

  // 수익 상태
  available: 'bg-[#e8f5e9] text-[#16a34a] border-[#16a34a]/20',
  withdrawn: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border-[var(--color-border)]',

  // 환불
  refunded: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border-[var(--color-border)]',
};

export const statusLabels = {
  // 거래 상태
  pending: '대기중',
  recruiting: '모집중',
  matched: '매칭완료',
  completed: '수거완료',

  // 제안 상태
  accepted: '수락됨',
  rejected: '거절됨',

  // 수익 상태
  available: '출금 가능',
  withdrawn: '출금 완료',

  // 환불
  refunded: '환불 완료',
};

export type StatusType = keyof typeof statusBadgeStyles;

// 카테고리 뱃지 스타일 (통일된 회색)
export const categoryBadgeStyles = 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]';

export type CategoryType = 'plastic' | 'paper' | 'can' | 'glass' | 'vinyl' | 'large' | 'mixed';
