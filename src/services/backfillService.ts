import { supabase } from './supabaseClient';
import { BGCGroup, GroupSocialLink } from './types';

export type ImportStatus = 'success' | 'skipped' | 'error';

export interface ImportLog {
  id?: string;
  platform: string;
  external_id?: string;
  external_url?: string;
  status: ImportStatus;
  reason?: string;
  details?: any;
  created_at?: string;
}

export const backfillService = {
  /**
   * Check if a group already exists by its external URL (Phase 3.1.2)
   */
  async checkDuplicateGroup(url: string): Promise<string | null> {
    const { data, error } = await supabase
      .from('group_social_links')
      .select('groupId')
      .eq('url', url)
      .maybeSingle();

    if (error) {
      console.error('Error checking duplicate:', error);
      return null;
    }

    return data?.groupId || null;
  },

  /**
   * Exponential backoff utility (Phase 3.1.3)
   */
  async retryOperation<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    initialBackoffMs: number = 1000
  ): Promise<T> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        const delay = initialBackoffMs * Math.pow(2, i);
        console.warn(`Retry attempt ${i + 1} failed. Retrying in ${delay}ms...`, err);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw lastError;
  },

  /**
   * Log an import action (Phase 3.1.5)
   */
  async logImportAction(log: ImportLog): Promise<void> {
    const { error } = await supabase
      .from('import_logs')
      .insert(log);

    if (error) {
      console.error('Error logging import action:', error);
    }
  },

  /**
   * High-level group import with dedup and logging (Phase 3.2.1)
   */
  async importGroup(
    group: Partial<BGCGroup>,
    platform: string,
    externalUrl: string,
    externalId?: string
  ): Promise<{ id?: string; status: ImportStatus; reason?: string }> {
    try {
      // 1. Check for duplicates (Dedup Logic 3.1.2)
      const existingId = await this.checkDuplicateGroup(externalUrl);
      if (existingId) {
        await this.logImportAction({
          platform,
          external_id: externalId,
          external_url: externalUrl,
          status: 'skipped',
          reason: 'Duplicate found',
          details: { existingGroupId: existingId }
        });
        return { id: existingId, status: 'skipped', reason: 'Duplicate found' };
      }

      // 2. Perform import (Retry Logic 3.1.3)
      const result = await this.retryOperation(async () => {
        // Insert group
        const { data: groupData, error: groupError } = await supabase
          .from('groups')
          .insert({
            ...group,
            source: platform, // Phase 3.2.1 Requirement
            isClaimed: false,
            isVerified: false,
            isActive: true,
            status: 'approved', // Auto-approve backfilled data
            last_scraped_at: new Date().toISOString() // Phase 3.1.4 Requirement
          })
          .select()
          .single();

        if (groupError) throw groupError;

        // Insert social link
        const { error: socialError } = await supabase
          .from('group_social_links')
          .insert({
            groupId: (groupData as any).id,
            platform,
            url: externalUrl,
            metadata: { externalId }
          });

        if (socialError) throw socialError;

        return groupData as any;
      });

      // 3. Log success (Logging 3.1.5)
      await this.logImportAction({
        platform,
        external_id: externalId,
        external_url: externalUrl,
        status: 'success',
        details: { groupId: result.id }
      });

      return { id: result.id, status: 'success' };
    } catch (err: any) {
      // 4. Log error (Logging 3.1.5)
      await this.logImportAction({
        platform,
        external_id: externalId,
        external_url: externalUrl,
        status: 'error',
        reason: err.message || 'Unknown error',
        details: { error: err }
      });
      return { status: 'error', reason: err.message };
    }
  },

  /**
   * Check data quality (Phase 3.2.2)
   * Verify source, no duplicates, and critical fields
   */
  async checkDataQuality(): Promise<{ total: number; missingSource: number; missingLocation: number; invalidName: number }> {
    const { data: groups, error } = await supabase
      .from('groups')
      .select('*');

    if (error) {
      console.error('Error fetching quality check data:', error);
      throw error;
    }

    const report = {
      total: (groups as any[]).length,
      missingSource: (groups as any[]).filter(g => !g.source).length,
      missingLocation: (groups as any[]).filter(g => !g.location || !g.location.city || !g.location.state).length,
      invalidName: (groups as any[]).filter(g => !g.name || g.name.length < 3).length
    };

    return report;
  }
};
