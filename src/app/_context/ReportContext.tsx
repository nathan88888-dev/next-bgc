"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { reportService } from '@/services/reportService';
import { Report } from '@/services/types';

interface ReportContextType {
  reports: Report[];
  submitReport: (report: Omit<Report, 'id' | 'status' | 'timestamp'>) => void;
  resolveReport: (reportId: string) => void;
  dismissReport: (reportId: string) => void;
  refreshReports: () => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);

  const refreshReports = useCallback(async () => {
    try {
      const data = await reportService.getReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  }, []);

  useEffect(() => {
    refreshReports();
  }, [refreshReports]);

  const submitReport = async (reportData: Omit<Report, 'id' | 'status' | 'timestamp'>) => {
    try {
      const newReport = await reportService.createReport(reportData);
      setReports(prev => [newReport, ...prev]);
      toast.success('Report submitted. Thank you for helping keep our community safe.');
    } catch (error) {
      console.error('Failed to submit report:', error);
      toast.error('Failed to submit report');
    }
  };

  const resolveReport = async (reportId: string) => {
    try {
      await reportService.updateReportStatus(reportId, 'resolved');
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
      toast.success('Report marked as resolved');
    } catch (error) {
      console.error('Failed to resolve report:', error);
    }
  };

  const dismissReport = async (reportId: string) => {
    try {
      await reportService.updateReportStatus(reportId, 'dismissed');
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
      toast.info('Report dismissed');
    } catch (error) {
      console.error('Failed to dismiss report:', error);
    }
  };


  return (
    <ReportContext.Provider value={{ 
      reports, 
      submitReport, 
      resolveReport, 
      dismissReport,
      refreshReports
    }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
}