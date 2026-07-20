"use client";

import { ReactNode } from 'react';
import { UserProvider } from '@/app/context/UserContext';
import { GroupProvider } from '@/app/context/GroupContext';
import { ReportProvider } from '@/app/context/ReportContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <GroupProvider>
        <ReportProvider>
          {children}
        </ReportProvider>
      </GroupProvider>
    </UserProvider>
  );
}
