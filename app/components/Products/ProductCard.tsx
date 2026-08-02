/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession,  } from "@/app/lib/auth-client";
import { AddToCart } from "@/app/lib/Action/cart";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number; // percentage, e.g. 12 means 12%
  quantity: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
const { data: session,} = useSession();
  const user = session?.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, price, discount, category, image } = product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  const rating = 4;

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //Add to cart functionality can be added here
  const handleAddToCart = async (product:any) => {
    const orderedProduct = {
      productId: product._id,
      name: product.name,
      price: discountedPrice,
      category: product.category,
      description: product.description,
      quantity: 1, // Default quantity to 1, can be modified later
      createdAt: new Date().toISOString(),
      OrderedUserInfo:{
        userName: user?.name,
        userEmail: user?.email,
      } 
    };
    try{
      await AddToCart(orderedProduct);
      toast.success("Product added to cart successfully!");

    }catch(error){
      toast.error(`Failed to add product to cart. ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }



  return (
    <div className="bg-white group  ">
      {/* Image container - full width & height, overflow hidden so zoom stays clipped */}
      <div className="relative w-full h-95 overflow-hidden  ">
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-[#5c7a29] text-white text-xs font-semibold px-3 py-1 z-10">
            SALE
          </span>
        )}
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="text-center pt-6 pb-8 px-4">
        <h3 className="font-bold text-lg text-[#0f1a1c]">{name}</h3>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-[#0f1a1c] font-semibold">
            ${discountedPrice}.00
          </span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">
              ${price}.00
            </span>
          )}
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < rating ? "text-orange-400" : "text-orange-200"}
            >
              ★
            </span>
          ))}
        </div>

        <p className="uppercase text-xs tracking-wider text-gray-500 mt-2">
          {category === "home-plant" ? "Home Plants" : "Office Plants"}
        </p>

        <div className=" flex items-center gap-2">
          <div>
            <button
              onClick={handleViewDetails}
              className="mt-4 cursor-pointer bg-[#5c7a29] hover:bg-[#4d6822] text-white font-semibold text-sm px-6 py-3 transition-colors"
            >
              view details
            </button>
          </div>
          <div>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-[#5c7a29] hover:bg-[#4d6822] cursor-pointer text-white font-semibold text-sm px-6 py-3 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-87.5 md:h-full">
                <Image
                  src={image}
                  alt={name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl text-black font-bold">Title: {name}</h2>

                  <button
                    onClick={closeModal}
                    className="text-3xl font-bold text-black hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-md text-start  uppercase text-gray-700 mt-2">
                 <span className="font-bold text-black py-4">Category:</span> {category}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#5c7a29]"> Price:
                    ${discountedPrice}.00
                  </span>

                  {discount > 0 && (
                    <span className="line-through text-gray-400 text-xl">
                      ${price}.00
                    </span>
                  )}
                </div>

                {discount > 0 && (
                  <div className="mt-2 inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                    {discount}% OFF
                  </div>
                )}

                <div className="flex font-bold text-black gap-1 mt-5 items-center"> Ratting:
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < rating
                          ? "text-orange-400 text-xl"
                          : "text-gray-300 text-xl"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className=" space-y-3">
                  
                  <p className="font-medium text-start text-black py-4">
                    <span className="font-bold text-black py-4">Stock: </span>
                    {product.quantity}
                  </p>

                  <p className="text-black text-start leading-7">
                    <span className="font-bold text-black py-4">Description: </span>
                    {product.description}
                  </p>
                </div>

                <button onClick={()=> handleAddToCart(product)} className="mt-8 cursor-pointer bg-[#5c7a29] hover:bg-[#4d6822] text-white px-8 py-3 rounded-lg">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
