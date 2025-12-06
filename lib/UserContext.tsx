'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  profileImage: string;
  location: {
    id: string;
    name: string;
  };
  transactionCount: number;
  noShowCount: number;
}

interface UserContextType {
  user: UserProfile;
  updateLocation: (location: { id: string; name: string }) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
  name: '김철수',
  profileImage: 'https://picsum.photos/seed/me/200/200',
  location: {
    id: '1',
    name: '역삼동',
  },
  transactionCount: 12,
  noShowCount: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateLocation = (location: { id: string; name: string }) => {
    setUser((prev) => ({
      ...prev,
      location,
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateLocation, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
