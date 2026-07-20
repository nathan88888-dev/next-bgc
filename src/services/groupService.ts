import { config } from './config';
import { supabase } from './supabaseClient';
import { mockGroups } from '../data/mockGroups';
import { BGCGroup } from './types';

export const groupService = {
  async getGroups(): Promise<BGCGroup[]> {
    if (config.useMock) {
      console.log('Using mock data for getGroups');
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockGroups), 500); // Simulate network delay
      });
    }

    const { data, error } = await supabase
      .from('groups')
      .select('*, group_social_links(*)')
      .order('id', { ascending: true });

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    console.log('Supabase Data:', data);
    
    return (data as any[]).map(group => {
      if (group.group_social_links) {
        group.socialLinks = group.group_social_links;
        delete group.group_social_links;
      }
      return group as BGCGroup;
    });
  },

  async getGroupById(id: string): Promise<BGCGroup | null> {
    if (config.useMock) {
      console.log('Using mock data for getGroupById', id);
      return new Promise((resolve) => {
        const group = mockGroups.find(g => g.id === id) || null;
        setTimeout(() => resolve(group), 300);
      });
    }

    const { data, error } = await supabase
      .from('groups')
      .select('*, group_social_links(*)')
      .eq('id', id)
      .single();
 
    if (error) {
      console.error('Supabase Error:', error);
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    const group = data as any;
    
    // Map database snake_case to frontend camelCase
    if (group.group_social_links) {
      group.socialLinks = group.group_social_links;
      delete group.group_social_links;
    }
    
    return group as BGCGroup;
  },

  async getGroupBySlug(slug: string): Promise<BGCGroup | null> {
    if (config.useMock) {
      console.log('Using mock data for getGroupBySlug', slug);
      return new Promise((resolve) => {
        const group = mockGroups.find(g => g.slug === slug) || null;
        setTimeout(() => resolve(group), 300);
      });
    }

    const { data, error } = await supabase
      .from('groups')
      .select('*, group_social_links(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    const group = data as any;
    
    if (group.group_social_links) {
      group.socialLinks = group.group_social_links;
      delete group.group_social_links;
    }
    
    return group as BGCGroup;
  }
};
