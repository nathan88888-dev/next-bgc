import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export interface Filters {
  tags: string[];
  groupType: string[];
  privacy: string[];
  groupSize: string[];
  meetingFrequency: string[];
  experienceLevel: string[];
}

interface FilterSectionProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

const tagOptions = [
  'Strategy',
  'Party Games',
  'RPG',
  'Card Games',
  'Dice Games',
  'Miniatures',
  'Social Deduction',
  'Euro Games',
  'Deck Building',
  'Competitive',
  'D&D',
  'Pathfinder',
  'Casual',
  'Tournaments',
  'Gateway Games',
  'Tactical',
  'Wargames',
  'Painting',
  'Fantasy',
  'Adventure',
  'Classics',
];

const groupTypeOptions = [
  'Board Game Group',
  'DND Group',
  'Social Group',
  'RPG Group',
  'Card Game Group',
];

const privacyOptions = ['Public', 'Private'];

const groupSizeOptions = [
  { label: 'Small (5-15)', value: 'Small' },
  { label: 'Medium (16-30)', value: 'Medium' },
  { label: 'Large (31+)', value: 'Large' },
];

const meetingFrequencyOptions = ['Weekly', 'Bi-weekly', 'Monthly'];

const experienceLevelOptions = [
  'Beginner Friendly',
  'Intermediate',
  'Advanced',
  'All Levels',
];

export function FilterSection({ filters, onFilterChange, onClearFilters }: FilterSectionProps) {
  const [expandedSections, setExpandedSections] = useState({
    tags: true,
    groupType: true,
    privacy: true,
    groupSize: true,
    meetingFrequency: true,
    experienceLevel: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (
    filterType: keyof Filters,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[filterType];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFilterChange({
      ...filters,
      [filterType]: newValues,
    });
  };

  const getTotalActiveFilters = () => {
    return (
      filters.tags.length +
      filters.groupType.length +
      filters.privacy.length +
      filters.groupSize.length +
      filters.meetingFrequency.length +
      filters.experienceLevel.length
    );
  };

  const activeFiltersCount = getTotalActiveFilters();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-amber-600 hover:text-amber-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All ({activeFiltersCount})</span>
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('tags')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Tags</span>
          {expandedSections.tags ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.tags && (
          <div className="space-y-2 pl-1">
            {tagOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange('tags', option, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Group Type */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('groupType')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Group Type</span>
          {expandedSections.groupType ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.groupType && (
          <div className="space-y-2 pl-1">
            {groupTypeOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.groupType.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange('groupType', option, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Privacy */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('privacy')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Privacy</span>
          {expandedSections.privacy ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.privacy && (
          <div className="space-y-2 pl-1">
            {privacyOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.privacy.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange('privacy', option, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Group Size */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('groupSize')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Group Size</span>
          {expandedSections.groupSize ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.groupSize && (
          <div className="space-y-2 pl-1">
            {groupSizeOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.groupSize.includes(option.value)}
                  onChange={(e) =>
                    handleCheckboxChange('groupSize', option.value, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Meeting Frequency */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('meetingFrequency')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Meeting Frequency</span>
          {expandedSections.meetingFrequency ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.meetingFrequency && (
          <div className="space-y-2 pl-1">
            {meetingFrequencyOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.meetingFrequency.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange('meetingFrequency', option, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <button
          onClick={() => toggleSection('experienceLevel')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-medium text-gray-900">Experience Level</span>
          {expandedSections.experienceLevel ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.experienceLevel && (
          <div className="space-y-2 pl-1">
            {experienceLevelOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.experienceLevel.includes(option)}
                  onChange={(e) =>
                    handleCheckboxChange('experienceLevel', option, e.target.checked)
                  }
                  className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}