import Image from 'next/image';

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
  const { name, price, discount, category, image } = product;

  const discountedPrice = discount
    ? Math.round(price - (price * discount) / 100)
    : price;

  const rating = 4;

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
          className=" w-full transition-transform duration-300 group-hover:scale-110"
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
              className={i < rating ? 'text-orange-400' : 'text-orange-200'}
            >
              ★
            </span>
          ))}
        </div>

        <p className="uppercase text-xs tracking-wider text-gray-500 mt-2">
          {category === 'home-plant' ? 'Home Plants' : 'Office Plants'}
        </p>

        <button className="mt-4 bg-[#5c7a29] hover:bg-[#4d6822] text-white font-semibold text-sm px-6 py-3 transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;