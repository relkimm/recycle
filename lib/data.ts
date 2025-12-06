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
    userName: '서준혁',
    userImage: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: '2',
    location: '서초동',
    price: 25000,
    proposalCount: 1,
    status: 'recruiting',
    description: '이사 후 박스 정리 필요해요. 큰 박스 10개, 작은 박스 20개 정도입니다.',
    timeAgo: '2시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle2/400/400',
    category: 'paper',
    userName: '한지우',
    userImage: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: '3',
    location: '신사동',
    price: 12000,
    proposalCount: 5,
    status: 'matched',
    description: '플라스틱, 캔 위주입니다. 이미 분리해뒀어요!',
    timeAgo: '3시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle3/400/400',
    category: 'mixed',
    userName: '윤서아',
    userImage: 'https://picsum.photos/seed/user3/100/100',
  },
  {
    id: '4',
    location: '삼성동',
    price: 30000,
    proposalCount: 0,
    status: 'recruiting',
    description: '소파, 책상 등 대형 폐기물 수거 부탁드려요. 1층이라 운반 편해요.',
    timeAgo: '5시간 전',
    imageUrl: 'https://picsum.photos/seed/recycle4/400/400',
    category: 'large',
    userName: '김도윤',
    userImage: 'https://picsum.photos/seed/user4/100/100',
  },
  {
    id: '5',
    location: '청담동',
    price: 18000,
    proposalCount: 2,
    status: 'recruiting',
    description: '종이류만 있어요. 신문, 잡지, 종이박스 등',
    timeAgo: '어제',
    imageUrl: 'https://picsum.photos/seed/recycle5/400/400',
    category: 'paper',
    userName: '이하은',
    userImage: 'https://picsum.photos/seed/user5/100/100',
  },
  {
    id: '6',
    location: '논현동',
    price: 20000,
    proposalCount: 4,
    status: 'completed',
    description: '캔, 유리병 위주로 있어요. 맥주캔이 많습니다.',
    timeAgo: '2일 전',
    imageUrl: 'https://picsum.photos/seed/recycle6/400/400',
    category: 'can',
    userName: '박시우',
    userImage: 'https://picsum.photos/seed/user6/100/100',
  },
];

export const myProposals: Proposal[] = [
  {
    id: 'p1',
    requestId: '1',
    requestDescription: '플라스틱 페트병, 용기류 많아요. 깨끗하게 씻어서 분리해뒀어요.',
    requestImageUrl: 'https://picsum.photos/seed/recycle1/400/400',
    requestLocation: '역삼동',
    proposedPrice: 12000,
    message: '바로 수거 가능합니다!',
    status: 'pending',
    createdAt: '1시간 전',
  },
  {
    id: 'p2',
    requestId: '2',
    requestDescription: '이사 후 박스 정리 필요해요. 큰 박스 10개, 작은 박스 20개 정도입니다.',
    requestImageUrl: 'https://picsum.photos/seed/recycle2/400/400',
    requestLocation: '서초동',
    proposedPrice: 22000,
    message: '오늘 저녁에 방문 가능해요',
    status: 'accepted',
    createdAt: '3시간 전',
  },
  {
    id: 'p3',
    requestId: '5',
    requestDescription: '종이류만 있어요. 신문, 잡지, 종이박스 등',
    requestImageUrl: 'https://picsum.photos/seed/recycle5/400/400',
    requestLocation: '청담동',
    proposedPrice: 15000,
    message: '내일 오전 수거 가능합니다',
    status: 'rejected',
    createdAt: '어제',
  },
];

export const users = [
  { name: '서준혁', location: '역삼동', completedDeals: 12, rating: 4.8 },
  { name: '최예린', location: '서초동', completedDeals: 28, rating: 4.9 },
  { name: '정민준', location: '신사동', completedDeals: 15, rating: 4.7 },
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
