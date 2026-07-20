import { useGroups } from '@/app/context/GroupContext';
import { Link } from 'react-router';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import { useI18nStore } from '@/stores/i18n';

export function GroupsIndexPage() {
  const { t } = useI18nStore();
  const { groups } = useGroups();
  const sortedGroups = [...groups].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <LayoutGrid className="w-3.5 h-3.5" />
            {t('groups_index.pill')}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {t('groups_index.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            {t('groups_index.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden divide-y divide-gray-50">
          {sortedGroups.map((group) => (
            <Link
              key={group.id}
              to={`/group/${group.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50 transition-all duration-300"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-1">
                  {group.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                  {group.location.city}, {group.location.state} • {group.groupType}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {group.description}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
                <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                  {t('groups_index.member_count', { count: group.memberCount })}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm font-medium italic">
          {t('groups_index.footer', { count: groups.length })}
        </div>
      </div>
    </div>
  );
}
