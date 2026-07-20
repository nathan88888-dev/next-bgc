import { User } from '@/app/context/UserContext';

export const mockUsersData: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    joinedDate: '2022-11-01',
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2023-03-20',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    status: 'banned',
    joinedDate: '2023-02-10',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    status: 'active',
    joinedDate: '2023-05-05',
  }
];
