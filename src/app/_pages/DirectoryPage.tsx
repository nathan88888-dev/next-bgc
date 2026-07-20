import { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, Map as MapIcon, List, Navigation } from 'lucide-react';
import { Link } from 'react-router';
import { GroupCard } from '@/app/components/GroupCard';
import dynamic from 'next/dynamic';
const MapView = dynamic(() => import('@/app/components/MapView').then(mod => mod.MapView), { ssr: false });
import { Filters } from '@/app/components/FilterSection';
import { useGroups } from '@/app/context/GroupContext';
import { BGCGroup } from '@/services/types';
import { toast } from 'sonner';
import { useI18nStore } from '@/stores/i18n';

type SortOption = 'distance' | 'members' | 'activity';

export function DirectoryPage() {
  const { groups: mockGroups } = useGroups();
  const { t } = useI18nStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchZip, setSearchZip] = useState('');
  const [searchRadius, setSearchRadius] = useState('25');
  const [searchCenter, setSearchCenter] = useState<{ lat: number, lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [filters, setFilters] = useState<Filters>({
    tags: [],
    groupType: [],
    privacy: [],
    groupSize: [],
    meetingFrequency: [],
    experienceLevel: [],
    languages: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('members');

  // Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState(10);
  const ITEMS_PER_PAGE = 10;

  // Haversine formula to calculate distance in miles
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleZipSearch = async () => {
    if (searchZip.length !== 5) {
      toast.error(t('directory.errors.zip'));
      return;
    }
    setIsLocating(true);
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${searchZip}`);
      if (response.ok) {
        const data = await response.json();
        const lat = parseFloat(data.places[0].latitude);
        const lng = parseFloat(data.places[0].longitude);
        setSearchCenter({ lat, lng });
        toast.success(t('directory.searching_near', { 
          place: data.places[0]['place name'], 
          state: data.places[0]['state abbreviation'] 
        }));
      } else {
        toast.error(t('directory.errors.zip_not_found'));
        setSearchCenter(null);
      }
    } catch {
      toast.error(t('directory.errors.location_fetch'));
      setSearchCenter(null);
    } finally {
      setIsLocating(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({ tags: [], groupType: [], privacy: [], groupSize: [], meetingFrequency: [], experienceLevel: [], languages: [] });
    setSearchQuery('');
    setSearchZip('');
    setSearchCenter(null);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Filter and sort groups
  const filteredGroups = useMemo(() => {
    let results = mockGroups;

    if (searchCenter) {
      results = results.filter((group) => {
        if (!group.location?.coordinates) return false;
        const distance = calculateDistance(searchCenter.lat, searchCenter.lng, group.location.coordinates.lat, group.location.coordinates.lng);
        return distance <= parseInt(searchRadius);
      });
      results = results.map((group: any) => ({
        ...group,
        distance: group.location?.coordinates ? calculateDistance(searchCenter.lat, searchCenter.lng, group.location.coordinates.lat, group.location.coordinates.lng) : Infinity
      }));
    }

    if (searchQuery) {
      results = results.filter((group: BGCGroup) =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.location?.city?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        group.location?.state?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    }

    const filterConditions = [
      { key: 'tags', match: (g: BGCGroup, f: string[]) => f.some(tag => g.tags?.includes(tag)) },
      { key: 'groupType', match: (g: BGCGroup, f: string[]) => f.includes(g.groupType) },
      { key: 'privacy', match: (g: BGCGroup, f: string[]) => f.includes(g.privacy) },
      { key: 'groupSize', match: (g: BGCGroup, f: string[]) => f.includes(g.groupSize) },
      { key: 'meetingFrequency', match: (g: BGCGroup, f: string[]) => f.includes(g.meetingFrequency) },
      { key: 'experienceLevel', match: (g: BGCGroup, f: string[]) => f.includes(g.experienceLevel) },
      { key: 'languages', match: (g: BGCGroup, f: string[]) => f.some(lang => g.languages?.includes(lang)) },
    ] as const;

    filterConditions.forEach(({ key, match }) => {
      const activeFilters = filters[key as keyof Filters] as string[];
      if (activeFilters.length > 0) {
        results = results.filter(g => match(g as BGCGroup, activeFilters));
      }
    });

    if (searchCenter && sortBy === 'distance') {
      results = [...results].sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0));
    } else if (sortBy === 'members') {
      results = [...results].sort((a: any, b: any) => b.memberCount - a.memberCount);
    } else if (sortBy === 'activity') {
      const frequencyOrder: Record<string, number> = { Weekly: 3, 'Bi-weekly': 2, Monthly: 1 };
      results = [...results].sort((a: any, b: any) => (frequencyOrder[b.meetingFrequency] || 0) - (frequencyOrder[a.meetingFrequency] || 0));
    }

    return results;
  }, [mockGroups, searchQuery, filters, sortBy, searchCenter, searchRadius]);

  const displayedGroups = filteredGroups.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGroups.length;
  const loadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);

  const activeFilterCount =
    filters.tags.length + filters.groupType.length + filters.privacy.length +
    filters.groupSize.length + filters.meetingFrequency.length +
    filters.experienceLevel.length + filters.languages.length +
    (searchCenter ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('directory.discover')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('directory.header_subtext')}</p>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('directory.search_placeholder_games')}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-sm font-medium"
              />
            </div>

            <div className="flex w-full lg:w-auto gap-2">
              <div className="relative w-full lg:w-32">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchZip}
                  onChange={(e) => { const val = e.target.value.replace(/\D/g, '').slice(0, 5); setSearchZip(val); }}
                  placeholder={t('directory.zip_code')}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-sm"
                />
              </div>

              <select
                value={searchRadius}
                onChange={(e) => setSearchRadius(e.target.value)}
                className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 text-sm cursor-pointer"
              >
                <option value="5">5 mi</option>
                <option value="10">10 mi</option>
                <option value="25">25 mi</option>
                <option value="50">50 mi</option>
              </select>

              <button
                onClick={handleZipSearch}
                disabled={searchZip.length !== 5 || isLocating}
                className="w-12 h-[46px] bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLocating ? (
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Navigation className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex gap-2 w-full lg:w-auto">
              <Link
                to="/submit-group"
                className="w-full lg:w-40 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-bold text-sm whitespace-nowrap text-center flex-shrink-0"
              >
                {t('directory.submit_group')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-gray-600">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium">{t('directory.filters')}:</span>
              </div>

              <select
                value={filters.groupType.join(',')}
                onChange={(e) => { const v = e.target.value; setFilters({ ...filters, groupType: v ? [v] : [] }); }}
                className="w-44 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
              >
                <option value="">{t('directory.all_categories')}</option>
                <option value="Board Game Group">{t('enums.group_type.Board Game Group')}</option>
                <option value="DND Group">{t('enums.group_type.DND Group')}</option>
                <option value="Social Group">{t('enums.group_type.Social Group')}</option>
                <option value="RPG Group">{t('enums.group_type.RPG Group')}</option>
                <option value="Card Game Group">{t('enums.group_type.Card Game Group')}</option>
                <option value="Other">{t('enums.group_type.Other')}</option>
              </select>

              <select
                value={filters.tags.join(',')}
                onChange={(e) => { const v = e.target.value; setFilters({ ...filters, tags: v ? [v] : [] }); }}
                className="w-36 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
              >
                <option value="">{t('directory.all_playstyles')}</option>
                <option value="Strategy">{t('enums.playstyle.Strategy')}</option>
                <option value="Casual">{t('enums.playstyle.Casual')}</option>
                <option value="Social">{t('enums.playstyle.Social')}</option>
                <option value="RPG">{t('enums.playstyle.RPG')}</option>
                <option value="Card Games">{t('enums.playstyle.Card Games')}</option>
                <option value="Miniatures">{t('enums.playstyle.Miniatures')}</option>
                <option value="Competitive">{t('enums.playstyle.Competitive')}</option>
                <option value="Cooperative">{t('enums.playstyle.Cooperative')}</option>
                <option value="Light">{t('enums.playstyle.Light')}</option>
                <option value="Medium">{t('enums.playstyle.Medium')}</option>
                <option value="Heavy">{t('enums.playstyle.Heavy')}</option>
                <option value="Party">{t('enums.playstyle.Party')}</option>
              </select>

              <select
                value={filters.meetingFrequency.join(',')}
                onChange={(e) => { const v = e.target.value; setFilters({ ...filters, meetingFrequency: v ? [v] : [] }); }}
                className="w-36 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
              >
                <option value="">{t('directory.all_frequencies')}</option>
                <option value="Weekly">{t('enums.frequency.Weekly')}</option>
                <option value="Bi-weekly">{t('enums.frequency.Bi-weekly')}</option>
                <option value="Monthly">{t('enums.frequency.Monthly')}</option>
                <option value="Ad Hoc">{t('enums.frequency.Ad Hoc')}</option>
                <option value="Custom">{t('enums.frequency.Custom')}</option>
              </select>

              <select
                value={filters.experienceLevel.join(',')}
                onChange={(e) => { const v = e.target.value; setFilters({ ...filters, experienceLevel: v ? [v] : [] }); }}
                className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
              >
                <option value="">{t('directory.all_experience')}</option>
                <option value="Beginner Friendly">{t('enums.experience.Beginner Friendly')}</option>
                <option value="Intermediate">{t('enums.experience.Intermediate')}</option>
                <option value="Advanced">{t('enums.experience.Advanced')}</option>
                <option value="All Levels">{t('enums.experience.All Levels')}</option>
              </select>

              <select
                value={filters.languages.join(',')}
                onChange={(e) => { const v = e.target.value; setFilters({ ...filters, languages: v ? [v] : [] }); }}
                className="w-36 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
              >
                <option value="">{t('directory.all_languages')}</option>
                <option value="English">{t('enums.language.English')}</option>
                <option value="Chinese">{t('enums.language.Chinese')}</option>
                <option value="Spanish">{t('enums.language.Spanish')}</option>
                <option value="Japanese">{t('enums.language.Japanese')}</option>
              </select>

              {activeFilterCount > 0 && (
                <button onClick={handleClearFilters} className="px-4 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium whitespace-nowrap">
                  {t('directory.clear_filters')} ({activeFilterCount})
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button
                onClick={() => setViewMode('list')}
                className={`w-20 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <List className="w-4 h-4 flex-shrink-0" />
                {t('directory.list')}
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`w-20 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <MapIcon className="w-4 h-4 flex-shrink-0" />
                {t('directory.map')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <main className="w-full">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {t('directory.groups_found')}: {filteredGroups.length}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('directory.sort_by_label')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm font-bold text-gray-700 bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  <option value="members">{t('directory.sort.popularity')}</option>
                  {searchCenter && <option value="distance">{t('directory.sort.nearest')}</option>}
                  <option value="activity">{t('directory.sort.frequency')}</option>
                </select>
              </div>
            </div>
          </div>

          {displayedGroups.length > 0 ? (
            viewMode === 'list' ? (
              <div className="space-y-4">
                {displayedGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
                {hasMore && (
                  <div className="pt-8 pb-12 flex justify-center">
                    <button
                      onClick={loadMore}
                      className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                      {t('directory.loading')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-[600px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm sticky top-24">
                <MapView
                  groups={filteredGroups}
                  center={searchCenter ? [searchCenter.lat, searchCenter.lng] : undefined}
                  zoom={searchCenter ? 11 : 4}
                />
              </div>
            )
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('directory.no_groups_title')}</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-8">{t('directory.no_groups_text')}</p>
              <button onClick={handleClearFilters} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200">
                {t('directory.clear_filters')}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
