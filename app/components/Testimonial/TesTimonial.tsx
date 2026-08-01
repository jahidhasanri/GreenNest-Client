/* eslint-disable react-hooks/refs */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Jiza Sikuanza",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "In consequat, quam id sodales hendrerit, eros mi leo, nec lacinia risus neque tristique augue.",
  },
  {
    id: 2,
    name: "Peter Monier",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Vestibulum euismod accumsan duiac iaculis sem. Proin tempus urna vel congue elementum.",
  },
  {
    id: 3,
    name: "Sara Carter",
    image: "https://i.pravatar.cc/150?img=13",
    review:
      "Donec consequat massa vel risus luctus, quis gravida augue pharetra. Aliquam erat volutpat.",
  },
  {
    id: 4,
    name: "John Smith",
    image: "https://i.pravatar.cc/150?img=14",
    review:
      "Suspendisse potenti. Curabitur sed ligula non sapien luctus hendrerit vitae sed arcu.",
  },
  {
    id: 5,
    name: "Emma Watson",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Praesent ac sem vitae urna feugiat aliquet. Nulla facilisi. Vivamus feugiat risus at erat.",
  },
  {
    id: 6,
    name: "David James",
    image: "https://i.pravatar.cc/150?img=16",
    review:
      "Maecenas luctus lorem sed augue faucibus, non tristique libero consequat.",
  },
  {
    id: 7,
    name: "Sophia Lee",
    image: "https://i.pravatar.cc/150?img=17",
    review:
      "Vestibulum feugiat sapien nec arcu luctus, sed pellentesque lectus fermentum.",
  },
  {
    id: 8,
    name: "Michael Brown",
    image: "https://i.pravatar.cc/150?img=18",
    review:
      "Curabitur non magna quis risus faucibus ultrices. Integer tempus erat sit amet massa.",
  },
];

const TesTimonial = () => {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [autoplay.current],
  );

  return (
    <section
      className="py-20 bg-[#2f5d31] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/leaves.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-5">
        <p className="uppercase tracking-[4px] text-center text-gray-300 text-sm">
          Testimonials
        </p>

        <h2 className="text-center text-white font-bold text-4xl mt-4 mb-14">
          Client's support is the Best Reward
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="min-w-full md:min-w-[50%] lg:min-w-[25%] px-3"
              >
                <div className="bg-[#476f40] h-full p-10 flex flex-col justify-between rounded-sm">
                  <div>
                    <div className="text-6xl text-white leading-none mb-6">
                      ❞
                    </div>

                    <p className="text-gray-100 leading-8">{item.review}</p>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-white">
                      {item.name}
                    </h3>

                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="mt-5 rounded-full object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TesTimonial;
