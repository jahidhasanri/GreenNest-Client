"use client";

import Image from "next/image";

const Inspiration = () => {
  return (
    <div className="bg-white">
      <section className="py-16 lg:py-24">
      <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5 mx-auto px-5">
        <div className="grid grid-cols-12 overflow-hidden">
          {/* Left Image */}
          <div className="relative col-span-5 min-h-87.5 lg:min-h-155">
            <Image
              src="/images/male.webp"
              alt="CEO"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right Content */}
          <div
            className="relative col-span-7 flex items-center bg-[#2F5D31] px-8 py-12 sm:px-12 lg:px-20 lg:py-20"
            style={{
              backgroundImage:
                "url('/images/flowers-pattern-1-white.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "320px",
          
            }}
          >
              <div className="absolute inset-0 bg-[#2F5D31]/85"></div>
            <div className="relative z-10 ">
              <h2 className="text-white font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
                Nature is a life
                <br />
                inspiration
              </h2>

              <p className="mt-8 text-gray-100 leading-8 text-base lg:text-lg max-w-xl">
                Floreo – sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo.
              </p>

              <h4 className="mt-10 font-semibold text-white text-lg">
                Peter Stanton, CEO
              </h4>

              <Image
                src="https://startersites.io/blocksy/floreo/wp-content/uploads/2022/01/signature.svg"
                alt="Signature"
                width={220}
                height={90}
                className="mt-8 w-44 sm:w-52 lg:w-56"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Inspiration;