import { MeetupEvent, DiscordInfo, SocialPost } from '@/services/types';

export const mockMeetupEvents: MeetupEvent[] = [
  {
    id: '1',
    title: 'Weekly Game Night - Strategy Games',
    date: '2026-01-25',
    time: '6:30 PM',
    location: 'The Board Room Cafe',
    attendees: 12,
    spots: 16,
  },
  {
    id: '2',
    title: 'Dungeons & Dragons Campaign',
    date: '2026-01-28',
    time: '7:00 PM',
    location: 'Downtown Community Center',
    attendees: 6,
    spots: 6,
  },
  {
    id: '3',
    title: 'Casual Board Game Afternoon',
    date: '2026-02-01',
    time: '2:00 PM',
    location: 'Central Library Meeting Room',
    attendees: 8,
    spots: 12,
  },
  {
    id: '4',
    title: 'Settlers of Catan Tournament',
    date: '2026-02-05',
    time: '6:00 PM',
    location: 'The Board Room Cafe',
    attendees: 15,
    spots: 16,
  },
  {
    id: '5',
    title: 'Party Game Night',
    date: '2026-02-08',
    time: '7:30 PM',
    location: 'Member Host Home',
    attendees: 10,
    spots: 12,
  },
];

export const mockDiscordInfo: DiscordInfo = {
  serverName: 'SF Bay Area Board Gamers',
  memberCount: 248,
  onlineCount: 42,
  channels: [
    { name: 'general-chat', category: 'General' },
    { name: 'game-night-planning', category: 'Events' },
    { name: 'rules-questions', category: 'Help' },
    { name: 'trade-sell', category: 'Marketplace' },
  ],
  recentMessages: [
    { author: 'GameMaster42', message: 'Who\'s coming to Friday\'s game night?', timestamp: '2 hours ago' },
    { author: 'BoardGameBeth', message: 'I can bring Wingspan and Ticket to Ride!', timestamp: '1 hour ago' },
    { author: 'DiceRoller99', message: 'Count me in! What time?', timestamp: '45 minutes ago' },
  ],
};

export const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'facebook',
    author: 'Bay Area Board Gamers',
    content: 'Had an amazing turnout last night! 18 people showed up for our strategy game night. Highlights included a 6-player game of Scythe and an intense Wingspan tournament. Thanks everyone!',
    timestamp: '2 days ago',
    likes: 34,
    comments: 8,
  },
  {
    id: '2',
    platform: 'facebook',
    author: 'Bay Area Board Gamers',
    content: 'This Saturday: Bring your favorite party games! We\'re planning a casual afternoon session perfect for newcomers. RSVP in the comments 🎲',
    timestamp: '4 days ago',
    likes: 21,
    comments: 12,
  },
  {
    id: '3',
    platform: 'facebook',
    author: 'Bay Area Board Gamers',
    content: 'New to the group? Check out our beginner-friendly game library including Catan, Carcassonne, and Ticket to Ride. All games provided!',
    timestamp: '1 week ago',
    likes: 18,
    comments: 5,
  },
];
