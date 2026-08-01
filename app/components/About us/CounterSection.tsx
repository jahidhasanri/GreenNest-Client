"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserFriends, FaLeaf, FaStar } from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: FaUserFriends,
    value: 2400,
    title: "Happy Clients",
  },
  {
    id: 2,
    icon: FaLeaf,
    value: 1450,
    title: "Products",
  },
  {
    id: 3,
    icon: FaStar,
    value: 3600,
    title: "Ratings",
  },
];

export default function CounterSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28"
      style={{
        backgroundImage: `
          linear-gradient(rgba(47,93,49,.95), rgba(47,93,49,.95)),
          url('/images/flowers-pattern-1-white.svg')
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "320px",
      }}
    >
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <div className="text-center">
          <p className="uppercase text-sm tracking-[3px] text-[#C9D1C5] font-semibold">
            About Our Services
          </p>

          <h2 className="mt-4 text-white text-3xl md:text-5xl font-bold leading-tight">
            Cras semper auctor neque vitae tempus
            <br className="hidden md:block" />
            quam pellentesque
          </h2>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-[#476F40] h-75 flex flex-col items-center justify-center"
              >
                <Icon className="text-white text-5xl mb-8" />

                <h3 className="text-white text-6xl font-bold">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={item.value}
                      duration={3}
                      separator="."
                    />
                  ) : (
                    0
                  )}
                </h3>

                <p className="mt-5 text-gray-300 text-xl font-semibold">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}