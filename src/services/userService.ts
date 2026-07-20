import { config } from './config';
import { supabase } from './supabaseClient';
import { mockUsersData } from '../data/mockUsers';
import { User } from '../app/context/UserContext';

export const userService = {
  async getUsers(): Promise<User[]> {
    if (config.useMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockUsersData), 400);
      });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    
    return data as User[];
  },

  async updateUserStatus(userId: string, status: 'active' | 'banned'): Promise<void> {
    if (config.useMock) {
      console.log(`Mock: User ${userId} status updated to ${status}`);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId);

    if (error) throw error;
  }
};
