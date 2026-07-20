import { config } from './config';
import { supabase } from './supabaseClient';

export const authService = {
  async signUp(email: string, password: string, metadata: any) {
    if (config.useMock) {
      console.log('Mock Sign Up:', email);
      return { data: { user: { id: 'mock-user-id', email } }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    return { data, error };
  },

  async signIn(email: string, password: string) {
    if (config.useMock) {
      console.log('Mock Sign In:', email);
      const mockUser = { id: 'mock-user-id', email, name: 'Mock User', role: 'user', status: 'active', joinedDate: '2024-01-01' };
      return { 
        data: { 
          user: mockUser, 
          session: {}, 
          profile: mockUser
        }, 
        error: null 
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { data, error };

    // Fetch profile info
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      // We still return the auth data even if profile fetch fails
      return { data: { ...data, profile: null }, error: null };
    }

    return { data: { ...data, profile }, error: null };
  },

  async signOut() {
    if (config.useMock) {
      console.log('Mock Sign Out');
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    if (config.useMock) {
      return { data: { user: { id: 'mock-user-id', email: 'mock@example.com' } }, error: null };
    }

    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  async signInWithProvider(provider: 'google' | 'facebook' | 'discord') {
    if (config.useMock) {
      console.log('Mock Provider Sign In:', provider);
      return { data: { provider }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    return { data, error };
  },

  async resetPasswordForEmail(email: string) {
    if (config.useMock) {
      console.log('Mock Password Reset:', email);
      return { data: {}, error: null };
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { data, error };
  },

  async updatePassword(password: string) {
    if (config.useMock) {
      console.log('Mock Password Update');
      return { data: {}, error: null };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password
    });

    return { data, error };
  }
};
