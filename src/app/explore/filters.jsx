'use client';

import { useState } from 'react';
import { Sliders, Filter as FilterIcon, Clock, DollarSign, Calendar, Users, Star, MapPin } from 'lucide-react';

export default function ExploreFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    duration: [],
    budget: [],
    travelers: [],
    rating: null,
    amenities: [],
    season: [],
    destinations: [],
  });

  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...filters,
      [category]: Array.isArray(filters[category]) 
        ? filters[category].includes(value)
          ? filters[category].filter(item => item !== value)
          : [...filters[category], value]
        : value
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  

  const FilterSection = ({ title, icon: Icon, options, category, type = 'checkbox' }) => (
    <div className="py-4 border-b border-gray-200 dark:border-gray-700">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type={type}
              name={category}
              value={option.value}
              checked={Array.isArray(filters[category])
                ? filters[category].includes(option.value)
                : filters[category] === option.value}
              onChange={() => handleFilterChange(category, option.value)}
              className="rounded border-gray-300 dark:border-gray-700 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
          <FilterIcon className="w-5 h-5" />
          Filters
        </h2>
        <button
          onClick={() => setFilters({})}
          className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300"
        >
          Reset All
        </button>
      </div>

      <FilterSection
        title="Duration"
        icon={Clock}
        category="duration"
        options={[
          { value: 'short', label: 'Short Trip (1-3 days)' },
          { value: 'medium', label: 'Medium Trip (4-7 days)' },
          { value: 'long', label: 'Long Trip (8-14 days)' },
          { value: 'extended', label: 'Extended Trip (15+ days)' }
        ]}
      />

      <FilterSection
        title="Budget Per Person"
        icon={DollarSign}
        category="budget"
        options={[
          { value: 'budget', label: 'Budget ($0-$500)' },
          { value: 'moderate', label: 'Moderate ($501-$1500)' },
          { value: 'luxury', label: 'Luxury ($1501-$3000)' },
          { value: 'ultra', label: 'Ultra-Luxury ($3000+)' }
        ]}
      />

      <FilterSection
        title="Number of Travelers"
        icon={Users}
        category="travelers"
        options={[
          { value: 'solo', label: 'Solo' },
          { value: 'couple', label: '2 People' },
          { value: 'small', label: '3-4 People' },
          { value: 'group', label: '5+ People' }
        ]}
      />

      <FilterSection
        title="Rating"
        icon={Star}
        category="rating"
        type="radio"
        options={[
          { value: '4.5', label: '4.5 & Up' },
          { value: '4.0', label: '4.0 & Up' },
          { value: '3.5', label: '3.5 & Up' },
        ]}
      />

      <FilterSection
        title="Season"
        icon={Calendar}
        category="season"
        options={[
          { value: 'spring', label: 'Spring' },
          { value: 'summer', label: 'Summer' },
          { value: 'autumn', label: 'Autumn' },
          { value: 'winter', label: 'Winter' }
        ]}
      />

      <FilterSection
        title="Amenities"
        icon={Sliders}
        category="amenities"
        options={[
          { value: 'guide', label: 'Local Guide' },
          { value: 'transport', label: 'Transportation' },
          { value: 'meals', label: 'Meals Included' },
          { value: 'accommodation', label: 'Accommodation' },
          { value: 'activities', label: 'Activities' }
        ]}
      />

      <FilterSection
        title="Destinations"
        icon={MapPin}
        category="destinations"
        options={[
          { value: 'asia', label: 'Asia' },
          { value: 'europe', label: 'Europe' },
          { value: 'namerica', label: 'North America' },
          { value: 'samerica', label: 'South America' },
          { value: 'africa', label: 'Africa' },
          { value: 'oceania', label: 'Oceania' }
        ]}
      />
    </div>
  );
}