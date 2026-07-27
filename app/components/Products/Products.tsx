/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProducts } from '@/app/lib/API/products';

import Link from 'next/link';
import ProductCard from './ProductCard';

const Products = async () => {
  const AllProducts = await getProducts();

  return (
    <div className="container mx-auto text-center bg-white">
      <p className="text-[#5a8139] font-semibold text-[16px] md:text-[18px] text-center pt-16 xl:pt-28 mb-2 md:mb-6">
        Our Products
      </p>
      <h1 className="text-5xl text-black font-bold mb-16">
        Featured Products
      </h1>

      <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5 px-2   mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6">
        {AllProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-14">
        <Link
          href="/products"
          className="inline-block border-2 border-[#5c7a29] text-[#5c7a29] font-semibold px-8 py-3 tracking-wide hover:bg-[#2e4e2a] hover:text-white transition-colors"
        >
          ALL PRODUCTS
        </Link>
      </div>
    </div>
  );
};

export default Products;