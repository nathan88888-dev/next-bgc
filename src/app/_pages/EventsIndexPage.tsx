import { useGroups } from '@/app/context/GroupContext';
import { Link } from 'react-router';
import { Calendar, ChevronRight, LayoutGrid, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { integrationService } from '@/services';
import { MeetupEvent } from '@/services/types';
import { useI18nStore } from '@/stores/i18n';

export function EventsIndexPage() {
  const { t } = useI18nStore();
  const { groups } = useGroups();
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      try {
        // Collect all group IDs that have meetup integration
        const meetupGroups = groups.filter(g => g.contactMethods?.includes('meetup'));
        
        // Fetch events for each (simulated/mock for now)
        const eventPromises = meetupGroups.map(async (group) => {
          const events = await integrationService.getMeetupEvents(group.id);
          return events.map(e => ({ ...e, groupName: group.name, groupSlug: group.slug }));
        });
        
        const results = await Promise.all(eventPromises);
        setAllEvents(results.flat().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      } catch (error) {
        console.error('Failed to fetch global events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllEvents();
  }, [groups]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5" />
            {t('events.index_pill')}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {t('events.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('events.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{t('events.loading')}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden divide-y divide-gray-50">
            {allEvents.length > 0 ? (
              allEvents.map((event) => (
                <div key={event.id} className="group p-8 hover:bg-gray-50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 mb-2 uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {t('events.next_event')}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{t('events.host')} <Link to={`/group/${event.groupSlug}`} className="text-gray-900 hover:text-amber-600 underline font-bold">{event.groupName}</Link></span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">
                        {event.description || t('events.default_desc')}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      <a
                        href={event.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all hover:-translate-y-1"
                      >
                        {t('events.join_meetup')}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/group/${event.groupSlug}`}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        {t('events.about_group')}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('events.no_events')}</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                    {t('events.no_events_desc')}
                </p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-12 text-center text-gray-400 text-sm font-medium italic">
          {t('events.aggregate_data')}
        </div>
      </div>
    </div>
  );
}
