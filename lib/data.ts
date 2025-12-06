export type Category = 'plastic' | 'paper' | 'can' | 'glass' | 'vinyl' | 'large' | 'mixed';

export interface Request {
  id: string;
  location: string;
  price: number;
  proposalCount: number;
  status: 'recruiting' | 'matched' | 'completed';
  description: string;
  timeAgo: string;
  imageUrl: string;
  images?: string[];
  category: Category;
  userName: string;
  userImage: string;
  authorId: string; // 작성자 ID ('me'이면 현재 사용자가 작성한 글)
}

export interface Proposal {
  id: string;
  requestId: string;
  requestDescription: string;
  requestImageUrl: string;
  requestLocation: string;
  proposedPrice: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export const categoryLabels: Record<Category, { label: string; icon: string }> = {
  plastic: { label: '플라스틱', icon: '🧴' },
  paper: { label: '종이/박스', icon: '📦' },
  can: { label: '캔/고철', icon: '🥫' },
  glass: { label: '유리', icon: '🍾' },
  vinyl: { label: '비닐', icon: '🛍️' },
  large: { label: '대형폐기물', icon: '🛋️' },
  mixed: { label: '혼합', icon: '♻️' },
};

export const requests: Request[] = [
  // 내가 작성한 글 (모집중)
  {
    id: '1',
    location: '역삼동',
    price: 15000,
    proposalCount: 3,
    status: 'recruiting',
    description: '플라스틱 페트병, 용기류 많아요. 깨끗하게 씻어서 분리해뒀어요.',
    timeAgo: '30분 전',
    imageUrl: 'https://picsum.photos/seed/recycle1/400/400',
    images: [
      'https://picsum.photos/seed/recycle1/400/400',
      'https://picsum.photos/seed/recycle1-2/400/400',
      'https://picsum.photos/seed/recycle1-3/400/400',
    ],
    category: 'plastic',
    userName: '김철수',
    userImage: 'https://picsum.photos/seed/me/200/200',
    authorId: 'me',
  },
  // 내가 작성한 글 (매칭완료)
  {
    id: '2',
    location: '역삼동',
    price: 25000,
    proposalCount: 7,
    status: 'matched',
    description: '이사 후 박스 정리 필요해요. 큰 박스 10개, 작은 박스 20개 정도입니다.',
    timeAgo: '1시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle2/400/400',
    category: 'paper',
    userName: '김철수',
    userImage: 'https://picsum.photos/seed/me/200/200',
    authorId: 'me',
  },
  // 내가 작성한 글 (수거완료)
  {
    id: '3',
    location: '역삼동',
    price: 20000,
    proposalCount: 4,
    status: 'completed',
    description: '캔, 유리병 위주로 있어요. 맥주캔이 많습니다.',
    timeAgo: '2일 전',
    imageUrl: 'https://picsum.photos/seed/recycle3/400/400',
    category: 'can',
    userName: '김철수',
    userImage: 'https://picsum.photos/seed/me/200/200',
    authorId: 'me',
  },
  // 다른 사람 글 (모집중 - 플라스틱)
  {
    id: '4',
    location: '서초동',
    price: 12000,
    proposalCount: 2,
    status: 'recruiting',
    description: '플라스틱 병, 용기 있어요. 이미 깨끗이 씻어뒀습니다.',
    timeAgo: '2시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle4/400/400',
    category: 'plastic',
    userName: '한지우',
    userImage: 'https://picsum.photos/seed/user2/100/100',
    authorId: 'user2',
  },
  // 다른 사람 글 (모집중 - 혼합)
  {
    id: '5',
    location: '신사동',
    price: 18000,
    proposalCount: 5,
    status: 'recruiting',
    description: '플라스틱, 캔 위주입니다. 이미 분리해뒀어요!',
    timeAgo: '3시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle5/400/400',
    category: 'mixed',
    userName: '윤서아',
    userImage: 'https://picsum.photos/seed/user3/100/100',
    authorId: 'user3',
  },
  // 다른 사람 글 (모집중 - 대형폐기물)
  {
    id: '6',
    location: '삼성동',
    price: 35000,
    proposalCount: 0,
    status: 'recruiting',
    description: '소파, 책상 등 대형 폐기물 수거 부탁드려요. 1층이라 운반 편해요.',
    timeAgo: '4시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle6/400/400',
    category: 'large',
    userName: '김도윤',
    userImage: 'https://picsum.photos/seed/user4/100/100',
    authorId: 'user4',
  },
  // 다른 사람 글 (모집중 - 종이)
  {
    id: '7',
    location: '청담동',
    price: 16000,
    proposalCount: 3,
    status: 'recruiting',
    description: '종이류만 있어요. 신문, 잡지, 종이박스 등',
    timeAgo: '5시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle7/400/400',
    category: 'paper',
    userName: '이하은',
    userImage: 'https://picsum.photos/seed/user5/100/100',
    authorId: 'user5',
  },
  // 다른 사람 글 (모집중 - 유리)
  {
    id: '8',
    location: '논현동',
    price: 10000,
    proposalCount: 1,
    status: 'recruiting',
    description: '소주병, 와인병 등 유리병만 있어요. 깨지지 않게 잘 포장했습니다.',
    timeAgo: '6시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle8/400/400',
    category: 'glass',
    userName: '박시우',
    userImage: 'https://picsum.photos/seed/user6/100/100',
    authorId: 'user6',
  },
  // 다른 사람 글 (모집중 - 비닐)
  {
    id: '9',
    location: '강남역',
    price: 8000,
    proposalCount: 0,
    status: 'recruiting',
    description: '비닐봉지, 에어캡 등 비닐류 있어요.',
    timeAgo: '7시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle9/400/400',
    category: 'vinyl',
    userName: '최예린',
    userImage: 'https://picsum.photos/seed/user7/100/100',
    authorId: 'user7',
  },
  // 다른 사람 글 (매칭완료)
  {
    id: '10',
    location: '선릉역',
    price: 22000,
    proposalCount: 8,
    status: 'matched',
    description: '종이박스, 책 등 종이류 많아요. 2층이에요.',
    timeAgo: '어제',
    imageUrl: 'https://picsum.photos/seed/recycle10/400/400',
    category: 'paper',
    userName: '정민준',
    userImage: 'https://picsum.photos/seed/user8/100/100',
    authorId: 'user8',
  },
  // 다른 사람 글 (수거완료)
  {
    id: '11',
    location: '압구정동',
    price: 30000,
    proposalCount: 6,
    status: 'completed',
    description: '냉장고, 세탁기 등 대형 가전 수거 부탁드려요.',
    timeAgo: '3일 전',
    imageUrl: 'https://picsum.photos/seed/recycle11/400/400',
    category: 'large',
    userName: '강서연',
    userImage: 'https://picsum.photos/seed/user9/100/100',
    authorId: 'user9',
  },
  // 내가 제안한 글 (모집중)
  {
    id: '12',
    location: '역삼동',
    price: 14000,
    proposalCount: 4,
    status: 'recruiting',
    description: '플라스틱 용기, 페트병 등 있어요. 깨끗하게 씻어놨습니다.',
    timeAgo: '8시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle12/400/400',
    category: 'plastic',
    userName: '송하늘',
    userImage: 'https://picsum.photos/seed/user10/100/100',
    authorId: 'user10',
  },
  // 내가 제안한 글 (매칭완료 - 내가 선택됨)
  {
    id: '13',
    location: '삼성역',
    price: 28000,
    proposalCount: 9,
    status: 'matched',
    description: '이사 준비 중이에요. 종이박스 30개 정도 있습니다.',
    timeAgo: '1일 전',
    imageUrl: 'https://picsum.photos/seed/recycle13/400/400',
    category: 'paper',
    userName: '오지훈',
    userImage: 'https://picsum.photos/seed/user11/100/100',
    authorId: 'user11',
  },
];

export const myProposals: Proposal[] = [
  {
    id: 'p1',
    requestId: '12',
    requestDescription: '플라스틱 용기, 페트병 등 있어요. 깨끗하게 씻어놨습니다.',
    requestImageUrl: 'https://picsum.photos/seed/recycle12/400/400',
    requestLocation: '역삼동',
    proposedPrice: 12000,
    message: '바로 수거 가능합니다!',
    status: 'pending',
    createdAt: '1시간 전',
  },
  {
    id: 'p2',
    requestId: '13',
    requestDescription: '이사 준비 중이에요. 종이박스 30개 정도 있습니다.',
    requestImageUrl: 'https://picsum.photos/seed/recycle13/400/400',
    requestLocation: '삼성역',
    proposedPrice: 25000,
    message: '오늘 저녁에 방문 가능해요',
    status: 'accepted',
    createdAt: '3시간 전',
  },
  {
    id: 'p3',
    requestId: '7',
    requestDescription: '종이류만 있어요. 신문, 잡지, 종이박스 등',
    requestImageUrl: 'https://picsum.photos/seed/recycle7/400/400',
    requestLocation: '청담동',
    proposedPrice: 15000,
    message: '내일 오전 수거 가능합니다',
    status: 'rejected',
    createdAt: '어제',
  },
  {
    id: 'p4',
    requestId: '5',
    requestDescription: '플라스틱, 캔 위주입니다. 이미 분리해뒀어요!',
    requestImageUrl: 'https://picsum.photos/seed/recycle5/400/400',
    requestLocation: '신사동',
    proposedPrice: 16000,
    message: '내일 오후 수거 가능합니다',
    status: 'pending',
    createdAt: '2일 전',
  },
];

export const users = [
  { name: '서준혁', location: '역삼동', completedDeals: 12, rating: 4.8 },
  { name: '최예린', location: '서초동', completedDeals: 28, rating: 4.9 },
  { name: '정민준', location: '신사동', completedDeals: 15, rating: 4.7 },
];

export type NotificationType = 'proposal' | 'proposal_accepted' | 'proposal_rejected' | 'chat' | 'review' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedId?: string; // requestId, chatRoomId 등
  relatedImage?: string;
  userName?: string;
  userImage?: string;
}

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'proposal',
    title: '새로운 제안이 도착했어요',
    message: '한지우님이 "이사 후 박스 정리 필요해요" 요청에 22,000원을 제안했어요',
    timestamp: '5분 전',
    isRead: false,
    relatedId: '2',
    relatedImage: 'https://picsum.photos/seed/recycle2/400/400',
    userName: '한지우',
    userImage: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: 'n2',
    type: 'chat',
    title: '새로운 채팅 메시지',
    message: '윤서아: 네, 내일 오전 10시에 방문하겠습니다!',
    timestamp: '10분 전',
    isRead: false,
    relatedId: 'c2',
    relatedImage: 'https://picsum.photos/seed/recycle3/400/400',
    userName: '윤서아',
    userImage: 'https://picsum.photos/seed/user3/100/100',
  },
  {
    id: 'n3',
    type: 'proposal_accepted',
    title: '제안이 수락되었어요',
    message: '서준혁님이 회원님의 제안을 수락했어요. 채팅을 시작해보세요!',
    timestamp: '1시간 전',
    isRead: false,
    relatedId: '1',
    relatedImage: 'https://picsum.photos/seed/recycle1/400/400',
    userName: '서준혁',
    userImage: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: 'n4',
    type: 'system',
    title: '내 근처 새로운 요청',
    message: '역삼동에 "플라스틱 페트병, 용기류" 요청이 등록되었어요',
    timestamp: '2시간 전',
    isRead: true,
    relatedId: '1',
    relatedImage: 'https://picsum.photos/seed/recycle1/400/400',
  },
  {
    id: 'n5',
    type: 'proposal_rejected',
    title: '제안이 거절되었어요',
    message: '이하은님이 다른 제안을 선택했어요',
    timestamp: '3시간 전',
    isRead: true,
    relatedId: '5',
    relatedImage: 'https://picsum.photos/seed/recycle5/400/400',
    userName: '이하은',
    userImage: 'https://picsum.photos/seed/user5/100/100',
  },
  {
    id: 'n6',
    type: 'review',
    title: '거래 후기를 남겨주세요',
    message: '박시우님과의 거래는 어떠셨나요? 후기를 남겨주세요',
    timestamp: '어제',
    isRead: true,
    relatedId: '6',
    relatedImage: 'https://picsum.photos/seed/recycle6/400/400',
    userName: '박시우',
    userImage: 'https://picsum.photos/seed/user6/100/100',
  },
];

export interface ChatRoom {
  id: string;
  requestId: string;
  requestDescription: string;
  requestImageUrl: string;
  otherUser: {
    name: string;
    image: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const chatRooms: ChatRoom[] = [
  {
    id: 'c1',
    requestId: '2',
    requestDescription: '이사 후 박스 정리 필요해요. 큰 박스 10개, 작은 박스 20개 정도입니다.',
    requestImageUrl: 'https://picsum.photos/seed/recycle2/400/400',
    otherUser: {
      name: '한지우',
      image: 'https://picsum.photos/seed/user2/100/100',
    },
    lastMessage: '네, 내일 오전 10시에 방문하겠습니다!',
    lastMessageTime: '5분 전',
    unreadCount: 2,
    isActive: true,
  },
  {
    id: 'c2',
    requestId: '3',
    requestDescription: '플라스틱, 캔 위주입니다. 이미 분리해뒀어요!',
    requestImageUrl: 'https://picsum.photos/seed/recycle3/400/400',
    otherUser: {
      name: '윤서아',
      image: 'https://picsum.photos/seed/user3/100/100',
    },
    lastMessage: '감사합니다~',
    lastMessageTime: '1시간 전',
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 'c3',
    requestId: '1',
    requestDescription: '플라스틱 페트병, 용기류 많아요. 깨끗하게 씻어서 분리해뒀어요.',
    requestImageUrl: 'https://picsum.photos/seed/recycle1/400/400',
    otherUser: {
      name: '서준혁',
      image: 'https://picsum.photos/seed/user1/100/100',
    },
    lastMessage: '위치가 어디신가요?',
    lastMessageTime: '어제',
    unreadCount: 1,
    isActive: true,
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  c1: [
    {
      id: 'm1',
      chatRoomId: 'c1',
      senderId: 'other',
      message: '안녕하세요! 제안 감사합니다.',
      timestamp: '오후 2:30',
      isRead: true,
    },
    {
      id: 'm2',
      chatRoomId: 'c1',
      senderId: 'me',
      message: '네 안녕하세요! 내일 오전 중 수거 가능할까요?',
      timestamp: '오후 2:32',
      isRead: true,
    },
    {
      id: 'm3',
      chatRoomId: 'c1',
      senderId: 'other',
      message: '네 가능합니다. 몇 시쯤 오실 수 있나요?',
      timestamp: '오후 2:35',
      isRead: true,
    },
    {
      id: 'm4',
      chatRoomId: 'c1',
      senderId: 'me',
      message: '10시 정도 괜찮으실까요?',
      timestamp: '오후 2:36',
      isRead: true,
    },
    {
      id: 'm5',
      chatRoomId: 'c1',
      senderId: 'other',
      message: '네, 내일 오전 10시에 방문하겠습니다!',
      timestamp: '오후 2:38',
      isRead: false,
    },
  ],
  c2: [
    {
      id: 'm6',
      chatRoomId: 'c2',
      senderId: 'other',
      message: '제안 수락했습니다!',
      timestamp: '오전 11:20',
      isRead: true,
    },
    {
      id: 'm7',
      chatRoomId: 'c2',
      senderId: 'me',
      message: '감사합니다. 오늘 오후 3시에 방문하겠습니다.',
      timestamp: '오전 11:22',
      isRead: true,
    },
    {
      id: 'm8',
      chatRoomId: 'c2',
      senderId: 'other',
      message: '감사합니다~',
      timestamp: '오전 11:25',
      isRead: true,
    },
  ],
  c3: [
    {
      id: 'm9',
      chatRoomId: 'c3',
      senderId: 'me',
      message: '안녕하세요. 수거 도와드릴 수 있습니다.',
      timestamp: '어제',
      isRead: true,
    },
    {
      id: 'm10',
      chatRoomId: 'c3',
      senderId: 'other',
      message: '위치가 어디신가요?',
      timestamp: '어제',
      isRead: false,
    },
  ],
};
