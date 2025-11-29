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
      <div className="kashi-search flex items-center gap-3">
        <button
          type="submit"
          className="text-2xl md:text-3xl hover:scale-110 transition"
          aria-label="Search"
        >
          🔍
        </button>
        <input
          type="text"
          placeholder="جستجوی رویدادها... (نام، شهر، موضوع)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>
    </form>
  );
}
