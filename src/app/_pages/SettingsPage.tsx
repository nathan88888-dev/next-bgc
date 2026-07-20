import { Settings, Bell, Lock, Eye, Monitor } from 'lucide-react';
import { useI18nStore } from '@/stores/i18n';

export function SettingsPage() {
  const { t } = useI18nStore();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">{t('settings.title')}</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {/* Notifications */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">{t('settings.notifications.title')}</h3>
                <p className="text-sm text-gray-500 mb-4">{t('settings.notifications.desc')}</p>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-amber-500 focus:ring-amber-500" />
                    <span className="text-sm text-gray-700">{t('settings.notifications.newsletter')}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}