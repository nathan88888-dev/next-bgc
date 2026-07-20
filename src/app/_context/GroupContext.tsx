"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { BGCGroup, Report } from '@/services/types';
import { groupService, reportService } from '@/services';
import { toast } from 'sonner';



interface GroupContextType {
  groups: BGCGroup[];
  reports: Report[];
  refreshGroups: () => Promise<void>;
  addGroup: (group: BGCGroup) => void;
  updateGroup: (groupId: string, updates: Partial<BGCGroup>) => void;
  deleteGroup: (groupId: string) => void;
  approveGroup: (groupId: string) => void;
  rejectGroup: (groupId: string) => void;
  claimGroup: (groupId: string, userId: string) => void;
  approveClaim: (groupId: string, userId: string) => void;
  rejectClaim: (groupId: string) => void;
  addReport: (report: Omit<Report, 'id' | 'date' | 'status'>) => void;
  updateReportStatus: (reportId: string, status: 'resolved' | 'dismissed') => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);



export function GroupProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<BGCGroup[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = useCallback(async () => {
    try {
      const data = await reportService.getReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  }, []);



  const refreshGroups = useCallback(async () => {
    try {
      const data = await groupService.getGroups();
      setGroups(data);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      toast.error('Failed to load groups');
    }
  }, []);

  useEffect(() => {
    refreshGroups();
    fetchReports();
  }, [refreshGroups, fetchReports]);

  const addGroup = (group: BGCGroup) => {
    setGroups(prev => [...prev, group]);
  };

  const updateGroup = (groupId: string, updates: Partial<BGCGroup>) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, ...updates } : g));
  };

  const approveGroup = (groupId: string) => {
    updateGroup(groupId, { status: 'approved', isActive: true, isVerified: true });
    toast.success('Group approved and published');
  };

  const rejectGroup = (groupId: string) => {
    updateGroup(groupId, { status: 'rejected', isActive: false });
    toast.error('Group rejected');
  };

  const claimGroup = (groupId: string, userId: string) => {
    updateGroup(groupId, { pendingOwnerId: userId });
    toast.success('Claim submitted for approval');
  };

  const approveClaim = (groupId: string, userId: string) => {
    updateGroup(groupId, { 
      organizer: userId, 
      isClaimed: true, 
      pendingOwnerId: undefined 
    });
    toast.success('Claim approved');
  };

  const rejectClaim = (groupId: string) => {
    updateGroup(groupId, { pendingOwnerId: undefined });
    toast.info('Claim rejected');
  };

  const deleteGroup = (groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    toast.success('Group deleted successfully');
  };

  const addReport = useCallback(async (reportData: Omit<Report, 'id' | 'date' | 'status' | 'timestamp'>) => {
    try {
      const newReport = await reportService.createReport(reportData);
      setReports(prev => [...prev, newReport]);
      toast.success('Report submitted successfully');
    } catch (error) {
      toast.error('Failed to submit report');
    }
  }, []);

  const updateReportStatus = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      await reportService.updateReportStatus(reportId, status);
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
      toast.success(`Report marked as ${status}`);
    } catch (error) {
      console.error('Failed to update report status:', error);
      toast.error('Failed to update report status');
    }
  };

  return (
    <GroupContext.Provider value={{ 
      groups, 
      reports,
      refreshGroups,
      addGroup, 
      updateGroup, 
      deleteGroup,
      approveGroup, 
      rejectGroup,
      claimGroup,
      approveClaim,
      rejectClaim,
      addReport,
      updateReportStatus
    }}>
      {children}
    </GroupContext.Provider>
  );
}

export function useGroups() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupProvider');
  }
  return context;
}