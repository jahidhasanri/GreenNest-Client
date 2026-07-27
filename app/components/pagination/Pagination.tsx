'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-9 h-9 rounded text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-[#5c7a29] text-white'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-300 rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;