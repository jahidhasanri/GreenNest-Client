"use client";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const contactData = [
  {
    id: 1,
    icon: FaMapMarkerAlt,
    title: "Physical Address",
    details: [
      "304 North Cardinal St.",
      "Dorchester Center, MA 02124",
    ],
  },
  {
    id: 2,
    icon: FaEnvelope,
    title: "Email Address",
    details: [
      "info@company.com",
      "contact@company.com",
    ],
  },
  {
    id: 3,
    icon: FaPhoneAlt,
    title: "Phone Numbers",
    details: [
      "1-555-123-4567",
      "1-800-123-4567",
    ],
  },
];

const ContactInfo = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {contactData.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group bg-[#F4F7F2] hover:bg-[#5E8838] transition-all duration-500 p-10 lg:p-12"
              >
                {/* Icon */}
                <Icon className="text-4xl text-[#5E8838] group-hover:text-white transition-colors duration-500" />

                {/* Title */}
                <h3 className="mt-8 text-3xl font-bold text-[#486A2D] group-hover:text-white transition-colors duration-500">
                  {item.title}
                </h3>

                {/* Details */}
                <div className="mt-8 space-y-3">
                  {item.details.map((text, index) => (
                    <p
                      key={index}
                      className="text-lg text-[#1D1D1D] group-hover:text-white transition-colors duration-500"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;