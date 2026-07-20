import { config } from './config';
import { supabase } from './supabaseClient';
import { mockReportsData } from '../data/mockReports';
import { Report } from './types';

export const reportService = {
  async getReports(): Promise<Report[]> {
    if (config.useMock) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockReportsData), 400);
      });
    }

    const { data, error } = await supabase
      .from('group_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }
    
    return data as Report[];
  },

  async createReport(report: Omit<Report, 'id' | 'status' | 'date' | 'timestamp'>): Promise<Report> {
    if (config.useMock) {
      const newReport: Report = {
        ...report,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        date: new Date().toISOString()
      };
      return newReport;
    }

    const { data, error } = await supabase
      .from('group_reports')
      .insert([report])
      .select()
      .single();

    if (error) throw error;
    return data as Report;
  },

  async updateReportStatus(reportId: string, status: 'resolved' | 'dismissed'): Promise<void> {
    if (config.useMock) {
      console.log(`Mock: Report ${reportId} status updated to ${status}`);
      return;
    }

    const { error } = await supabase
      .from('group_reports')
      .update({ status })
      .eq('id', reportId);

    if (error) throw error;
  }
};
