import { Report } from '@/services/types';

export const mockReportsData: Report[] = [
  {
    id: '1',
    groupId: '16',
    groupName: 'Las Vegas Game Night',
    reason: 'Inaccurate Location',
    description: 'The venue listed has been closed for 2 months. They now meet at The Dice Tower.',
    reporterEmail: 'user@example.com',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'pending'
  },
  {
    id: '2',
    groupId: '2',
    groupName: 'Austin Party Gamers',
    reporterName: 'Concerned User',
    reason: 'Spam',
    description: 'This group seems to be posting spam events every hour.',
    status: 'pending',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
];
