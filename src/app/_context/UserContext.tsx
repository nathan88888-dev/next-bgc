"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userService } from '@/services/userService';
import { config } from '@/services/config';


export type UserRole = 'guest' | 'user' | 'moderator' | 'admin';
export type UserStatus = 'active' | 'banned';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
}

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User | null;
  // Deprecated but kept for compatibility
  user: User | null;

  // User Management
  users: User[];
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  banUser: (userId: string) => void;
  unbanUser: (userId: string) => void;

  followedGroups: string[];
  toggleFollow: (groupId: string) => void;
  isFollowing: (groupId: string) => boolean;
}




const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('guest');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [followedGroups, setFollowedGroups] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  // Load storage states on mount to prevent SSR hydration errors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedProfile = sessionStorage.getItem('supabase_profile');
      if (cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile);
          if (profile.role) setRoleState(profile.role as UserRole);
          setCurrentUser(profile);
        } catch (e) {}
      } else {
        const savedRole = sessionStorage.getItem('bgc_user_role');
        if (savedRole) setRoleState(savedRole as UserRole);
      }

      const saved = localStorage.getItem('bgc_followed_groups');
      if (saved) {
        try {
          setFollowedGroups(JSON.parse(saved));
        } catch (e) {}
      }
      setIsInitialized(true);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    sessionStorage.setItem('bgc_user_role', newRole);
    setRoleState(newRole);
    
    if (newRole === 'guest') {
      sessionStorage.removeItem('supabase_profile');
      sessionStorage.removeItem('supabase_user');
      sessionStorage.removeItem('supabase_session');
      setCurrentUser(null);
    } else {
      const cached = sessionStorage.getItem('supabase_profile');
      if (cached) {
        const profile = JSON.parse(cached);
        profile.role = newRole;
        sessionStorage.setItem('supabase_profile', JSON.stringify(profile));
        setCurrentUser(profile);
      } else if (config.useMock && users.length > 0) {
        // Fallback for mock mode simulator
        const mockUser = users.find(u => u.role === newRole) || users[0];
        if (mockUser) {
           setCurrentUser(mockUser);
        }
      }
    }
  };

  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('bgc_followed_groups', JSON.stringify(followedGroups));
    }
  }, [followedGroups, isInitialized]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []); // Only fetch once on mount

  // Sync mock user when role or users change, but only if not logged in (profile cache empty)
  useEffect(() => {
    if (config.useMock && role !== 'guest' && !sessionStorage.getItem('supabase_profile') && users.length > 0) {
      const mockUser = users.find(u => u.role === role) || users[0];
      if (mockUser && mockUser.id !== currentUser?.id) {
        setCurrentUser(mockUser);
      }
    }
  }, [role, users, config.useMock]);

  const toggleFollow = (groupId: string) => {
    setFollowedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isFollowing = (groupId: string) => followedGroups.includes(groupId);

  // User Management Functions
  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const banUser = (userId: string) => {
    updateUser(userId, { status: 'banned' });
  };

  const unbanUser = (userId: string) => {
    updateUser(userId, { status: 'active' });
  };

  // Sync with state changes if login happens
  useEffect(() => {
    const handleStorageChange = () => {
      const cached = sessionStorage.getItem('supabase_profile');
      if (cached) setCurrentUser(JSON.parse(cached));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const cachedProfile = sessionStorage.getItem('supabase_profile');
    const cachedUser = sessionStorage.getItem('supabase_user');
    
    console.group('---- User Authentication State ----');
    console.log('Current User (Enriched):', currentUser);
    console.log('Supabase Profile (Cache):', cachedProfile ? JSON.parse(cachedProfile) : null);
    console.log('Supabase Auth User (Cache):', cachedUser ? JSON.parse(cachedUser) : null);
    console.groupEnd();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{
      role,
      setRole,
      user: currentUser, // Alias for backward compatibility
      currentUser,
      users,
      updateUser,
      deleteUser,
      banUser,
      unbanUser,
      followedGroups,
      toggleFollow,
      isFollowing
    }}>
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