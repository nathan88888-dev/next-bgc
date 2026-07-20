import { config } from './config';
import { supabase } from './supabaseClient';
import { 
  mockMeetupEvents, 
  mockDiscordInfo, 
  mockSocialPosts
} from '../data/mockIntegrations';
import { MeetupEvent, DiscordInfo, SocialPost } from './types';


export const integrationService = {
  async getMeetupEvents(groupId: string): Promise<MeetupEvent[]> {
    if (config.useMock) {
      console.log('Using mock data for getMeetupEvents', groupId);
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockMeetupEvents), 400);
      });
    }

    const { data, error } = await supabase
      .from('meetup_events')
      .select('*')
      .eq('groupId', groupId);

    if (error) {
      console.error('Supabase Error (Events):', error);
      return [];
    }
    
    return data as MeetupEvent[];
  },

  async getDiscordInfo(groupId: string): Promise<DiscordInfo | null> {
    if (config.useMock) {
      console.log('Using mock data for getDiscordInfo', groupId);
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockDiscordInfo), 400);
      });
    }

    const { data, error } = await supabase
      .from('discord_info')
      .select('*')
      .eq('groupId', groupId)
      .maybeSingle();

    if (error) {
      console.error('Supabase Error (Discord):', error);
      return null;
    }
    
    return data as DiscordInfo;
  },

  async getSocialPosts(groupId: string, platform: string): Promise<SocialPost[]> {
    if (config.useMock) {
      console.log(`Using mock data for getSocialPosts (${platform})`, groupId);
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockSocialPosts), 400);
      });
    }

    const { data, error } = await supabase
      .from('social_posts')
      .select('*')
      .eq('groupId', groupId)
      .eq('platform', platform);

    if (error) {
      console.error('Supabase Error (Social):', error);
      return [];
    }
    
    return data as SocialPost[];
  }
};
