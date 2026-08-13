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
   <div className="bg-white ">
     <div className="container mx-auto xl:px-10 py-10 pt-20 bg-white text-black">
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
        <div className="md:max-w-full lg:max-w-210 xl:max-w-340 px-2   mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6">
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
   </div>
  );
};

export default AllProducts;