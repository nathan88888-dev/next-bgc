export interface BGCGroup {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  bannerImage?: string;
  memberCount: number;
  meetingFrequency: 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Ad Hoc' | 'Custom';
  description: string;
  privacy: 'Public' | 'Private';
  location: {
    city: string;
    state: string;
    zipCode?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  primaryVenue?: string;
  tags: string[];
  groupType: 'Board Game Group' | 'DND Group' | 'Social Group' | 'RPG Group' | 'Card Game Group' | 'Other';
  groupSize: 'Small' | 'Medium' | 'Large';
  experienceLevel: 'Beginner Friendly' | 'Intermediate' | 'Advanced' | 'All Levels';
  languages?: string[];
  isClaimed: boolean;
  isVerified: boolean;
  isActive: boolean;
  organizer?: string;
  contactMethods?: ('meetup' | 'discord' | 'whatsapp' | 'facebook' | 'website' | 'email' | 'bgg' | 'reddit' | 'instagram' | 'telegram' | 'warhorn' | 'twitter' | 'aftergame')[];
  socialLinks?: GroupSocialLink[];
  meetupDetails?: {
    privacy: 'Public' | 'Private';
  };
  catchline?: string;
  status?: 'pending' | 'approved' | 'rejected';
  pendingOwnerId?: string;
  rejectionReason?: string;
}

export interface GroupSocialLink {
  id: string;
  groupId: string;
  platform: string;
  url: string;
  metadata?: any;
  createdAt?: string;
}

export interface Report {
  id: string;
  groupId: string;
  groupName: string;
  reporterName?: string;
  reporterEmail?: string;
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp?: string;
  date?: string;
}

export interface MeetupEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  spots: number;
}

export interface DiscordChannel {
  name: string;
  category: string;
}

export interface DiscordMessage {
  author: string;
  message: string;
  timestamp: string;
}

export interface DiscordInfo {
  serverName: string;
  memberCount: number;
  onlineCount: number;
  channels: DiscordChannel[];
  recentMessages: DiscordMessage[];
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram';
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}
