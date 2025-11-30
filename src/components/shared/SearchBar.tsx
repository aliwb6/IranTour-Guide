'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="جستجوی رویدادها... (نام، شهر، موضوع)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-white bg-white/95 backdrop-blur text-gray-800 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
