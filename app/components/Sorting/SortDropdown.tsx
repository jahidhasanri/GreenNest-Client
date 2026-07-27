'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'default', label: 'Default sorting' },
  { value: 'rating', label: 'Sort by average rating' },
  { value: 'latest', label: 'Sort by latest' },
  { value: 'price-asc', label: 'Sort by price: low to high' },
  { value: 'price-desc', label: 'Sort by price: high to low' },
];

const SortDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1'); // sort change korle page 1 e reset hobe

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      onChange={handleSort}
      defaultValue={searchParams.get('sort') || 'default'}
      className="border border-gray-300 rounded px-4 py-2 text-sm outline-none cursor-pointer bg-white"
    >
      {sortOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;