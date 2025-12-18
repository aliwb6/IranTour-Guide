'use client';

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarFiltersProps {
  cities: string[];
  types: string[];
  selectedCity: string;
  selectedType: string;
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
}

export default function CalendarFilters({
  cities,
  types,
  selectedCity,
  selectedType,
  onCityChange,
  onTypeChange,
}: CalendarFiltersProps) {
  const hasActiveFilters = selectedCity || selectedType;

  const clearFilters = () => {
    onCityChange('');
    onTypeChange('');
  };

  const typeLabels: Record<string, string> = {
    NATIONAL: 'ملی',
    RELIGIOUS: 'مذهبی',
    ECONOMIC: 'اقتصادی',
    ARTISTIC: 'هنری',
    SCIENTIFIC: 'علمی',
    TOURISM: 'گردشگری',
    SPORTS: 'ورزشی',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">فیلترها</h3>
        </div>
        {hasActiveFilters && (
          <Button onClick={clearFilters} variant="outline" size="sm">
            <X className="w-4 h-4 ml-2" />
            پاک کردن همه
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شهر
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="">همه شهرها</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع رویداد
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="rtl"
          >
            <option value="">همه انواع</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {typeLabels[type] || type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
