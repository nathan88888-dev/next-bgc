import { useState, useMemo } from 'react';
import { Search, MapPin, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router';
import { GroupCard } from '@/app/components/GroupCard';
import { FilterSection, Filters } from '@/app/components/FilterSection';
import { mockGroups, BGCGroup } from '@/data/mockGroups';

type SortOption = 'distance' | 'members' | 'activity';

export function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    groupType: [],
    privacy: [],
    groupSize: [],
    meetingFrequency: [],
    experienceLevel: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('members');
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setFilters({
      tags: [],
      groupType: [],
      privacy: [],
      groupSize: [],
      meetingFrequency: [],
      experienceLevel: [],
    });
  };

  // Filter and sort groups
  const filteredGroups = useMemo(() => {
    let results = mockGroups;

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.location.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply tag filters
    if (filters.tags.length > 0) {
      results = results.filter((group) =>
        group.tags.some((tag) => filters.tags.includes(tag))
      );
    }

    // Apply group type filters
    if (filters.groupType.length > 0) {
      results = results.filter((group) => filters.groupType.includes(group.groupType));
    }

    // Apply privacy filters
    if (filters.privacy.length > 0) {
      results = results.filter((group) => filters.privacy.includes(group.privacy));
    }

    // Apply group size filters
    if (filters.groupSize.length > 0) {
      results = results.filter((group) => filters.groupSize.includes(group.groupSize));
    }

    // Apply meeting frequency filters
    if (filters.meetingFrequency.length > 0) {
      results = results.filter((group) =>
        filters.meetingFrequency.includes(group.meetingFrequency)
      );
    }

    // Apply experience level filters
    if (filters.experienceLevel.length > 0) {
      results = results.filter((group) =>
        filters.experienceLevel.includes(group.experienceLevel)
      );
    }

    // Sort results
    if (sortBy === 'members') {
      results = [...results].sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'activity') {
      // Sort by meeting frequency (weekly > bi-weekly > monthly)
      const frequencyOrder = { Weekly: 3, 'Bi-weekly': 2, Monthly: 1 };
      results = [...results].sort(
        (a, b) => frequencyOrder[b.meetingFrequency] - frequencyOrder[a.meetingFrequency]
      );
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  const activeFilterCount =
    filters.tags.length +
    filters.groupType.length +
    filters.privacy.length +
    filters.groupSize.length +
    filters.meetingFrequency.length +
    filters.experienceLevel.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Discover Board Game Communities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with local gaming groups, find your next adventure, and join a vibrant
              community of board game enthusiasts
            </p>
          </div>
        </div>
      </div>

      {/* Search and Action Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groups or games..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full lg:w-auto">
              <Link 
                to="/submit-group"
                className="flex-1 lg:flex-none px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium whitespace-nowrap text-center"
              >
                Submit Your Group
              </Link>
              <Link 
                to="/claim-group"
                className="flex-1 lg:flex-none px-6 py-3 bg-white border-2 border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium whitespace-nowrap text-center"
              >
                Claim a Group
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <select
              value={filters.groupType.join(',')}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  groupType: value ? [value] : [],
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
            >
              <option value="">All Group Types</option>
              <option value="Board Game Group">Board Game Group</option>
              <option value="DND Group">DND Group</option>
              <option value="Social Group">Social Group</option>
              <option value="RPG Group">RPG Group</option>
              <option value="Card Game Group">Card Game Group</option>
            </select>

            <select
              value={filters.privacy.join(',')}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  privacy: value ? [value] : [],
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
            >
              <option value="">All Privacy Levels</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <select
              value={filters.experienceLevel.join(',')}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  experienceLevel: value ? [value] : [],
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
            >
              <option value="">All Experience Levels</option>
              <option value="Beginner Friendly">Beginner Friendly</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>

            <select
              value={filters.meetingFrequency.join(',')}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({
                  ...filters,
                  meetingFrequency: value ? [value] : [],
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white cursor-pointer text-sm"
            >
              <option value="">All Frequencies</option>
              <option value="Weekly">Weekly</option>
              <option value="Bi-weekly">Bi-weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Section */}
        <div>
          {/* Results Header */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{filteredGroups.length}</span> groups
            </p>
          </div>

          {/* Groups List */}
          {filteredGroups.length > 0 ? (
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No communities found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any communities matching your search criteria. Try adjusting your
                filters or search terms.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}