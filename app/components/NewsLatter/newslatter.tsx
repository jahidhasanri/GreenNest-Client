"use client";

import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail("");
  };

  return (
    <div>
        <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5   mx-auto">
        <section
      className="relative bg-cover bg-center bg-no-repeat py-24 px-5"
      style={{
        backgroundImage: "url('https://startersites.io/blocksy/floreo/wp-content/uploads/2022/01/subscribe-form-cover_optimized.webp')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <p className="uppercase tracking-[4px] text-[#7fb23d] text-sm font-semibold mb-4">
          OUR NEWSLETTER
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Enter your email address to be
          <br className="hidden md:block" />
          updated with fresh news
        </h2>

        <p className="mt-6 text-gray-300 text-base sm:text-lg">
          Receive email updates and hot offers
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-105 lg:w-125 h-14 px-5 rounded-md bg-white text-gray-800 outline-none border border-transparent focus:border-green-600"
          />

          <button
            type="submit"
            className="w-full sm:w-auto h-14 px-10 rounded-md bg-[#6d9438] hover:bg-[#5b7f2f] transition duration-300 font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
    </div>
    </div>
  );
};

export default Newsletter;