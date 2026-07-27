'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1'); // search korle page 1 e reset hobe

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border border-gray-300 rounded overflow-hidden w-full md:w-72"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 w-full outline-none text-sm"
      />
      <button
        type="submit"
        className="bg-[#5c7a29] hover:bg-[#4d6822] text-white px-4 py-2 text-sm transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;