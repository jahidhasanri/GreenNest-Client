import Image from "next/image";

type BannerProps = {
  title: string;
  label?: string;
};

const S_Banner = ({ title, label = "WHAT WE DO" }: BannerProps) => {
  return (
    <div className="relative w-full h-55 sm:h-70 lg:h-100 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-image_optimized.webp"
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark green overlay — matches navbar color (#1d2b1e) */}
      <div className="absolute inset-0 bg-[#1d2b1e]/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-[#5a8139] font-semibold text-xs sm:text-sm tracking-widest mb-4">
          {label}
        </span>
        <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default S_Banner;