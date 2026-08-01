"use client";

import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter, FaYoutube } from "react-icons/fa6";

const teamMembers = [
  {
    id: 1,
    name: "Petra Matinson",
    role: "DESIGNER & FLORIST",
    image: "/images/f1.webp",
  },
  {
    id: 2,
    name: "Alicia Jackson",
    role: "SALES MANAGER",
    image: "/images/f2.webp",
  },
  {
    id: 3,
    name: "Petter Stanton",
    role: "DELIVERY & CARE",
    image: "/images/me1.webp",
  },
];

const OurTeam = () => {
  const socialIcons = [FaFacebookF, FaTwitter, FaYoutube];
  return (
    <section className="bg-white py-16 lg:py-24 ">
      <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5  mx-auto px-5">
        {/* Heading */}
        <div className="text-center">
          <p className="uppercase tracking-[3px] text-[#6A7E32] font-semibold text-sm">
            Meet
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#16311D]">
            Our Team
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group">
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={650}
                  className="w-full h-107.5 md:h-130 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Name */}
              <h3 className="mt-10 text-3xl font-bold text-[#16311D]">
                {member.name}
              </h3>

              {/* Role */}
              <p className="mt-2 text-[#6A7E32] font-semibold text-sm tracking-wide uppercase">
                {member.role}
              </p>

              {/* Social */}
              <div className="flex justify-center gap-4 mt-8">
                {socialIcons.map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-12 h-12 rounded-full bg-[#2F5D31] flex items-center justify-center transition-all duration-300 hover:bg-[#133e15] hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
