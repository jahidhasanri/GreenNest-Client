/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense } from "react";
import { getAllProducts } from "@/app/lib/API/products";
import SearchBar from "../components/Searchbar/SearchBar";
import SortDropdown from "../components/Sorting/SortDropdown";
import ProductCard from "../components/Products/ProductCard";
import Pagination from "../components/pagination/Pagination";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    page?: string;
  }>;
}

const AllProducts = async ({ searchParams }: PageProps) => {
  const { search, sort, page } = await searchParams;

  console.log("Page Search Params:", {
    search,
    sort,
    page,
  });

  const data = await getAllProducts({
    search,
    sort,
    page,
  });

  const { products, totalPages, totalProducts, currentPage } = data;
  console.log("Pagination Data:", {
  totalPages,
  currentPage,
});

  return (
    <div className="container mx-auto px-4 py-10 mt-20 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <Suspense>
          <SearchBar />
        </Suspense>

        <p className="uppercase text-xs tracking-wider text-gray-500">
          Showing all {totalProducts} results
        </p>

        <Suspense>
          <SortDropdown />
        </Suspense>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-20">
          No products found.
        </p>
      )}

      <Suspense>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
};

export default AllProducts;