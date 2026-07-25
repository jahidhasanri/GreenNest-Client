import React from 'react';
import Image from 'next/image';

const AboutOurService = () => {
    const services = [
  {
    icon: '/images/Screenshot_5-removebg-preview.png',
    title: "Quality Plants",
    desc: "In consequat quamid sodales hendrerit eros mi lacinia.",
  },
  {
    icon: '/images/Screenshot_6-removebg-preview.png',
    title: "Plant Renovation",
    desc: "Proin tempus urna vel congue elementum euismod.",
  },
  {
    icon: '/images/Screenshot_7-removebg-preview.png',
    title: "Seed Supply",
    desc: "In consequat quam sodales hendrerit eros mileonec.",
  },
  {
    icon: '/images/Screenshot_4-removebg-preview.png',
    title: "Custom Design",
    desc: "Proin tempus urna vel congue elementum vestibulum.",
  },
];
    return (
        <div
        className="w-full"
      style={{ backgroundImage: "url('/images/flowers-pattern-1-white.svg')" }}>
        
           <div className='bg-[#2f4f2b]/95'>
             <div className="container mx-auto text-center px-2.5">
        {/* Subtitle */}
        <p className="text-[16px] font-bold text-gray-300 pt-24 xl:pt-34 mb-6 uppercase ">
          About Our Services
        </p>

        {/* Title */}
        <h2 className="text-white text-[24px] md:text-[30px] lg:text-[40px] leading-snug font-bold mb-14 lg:mb-18 xl:mb-23">
          We just love our work and plant nature, <br /> so we provide high quality products
        </h2>

        {/* Service Cards */}
        <div className="md:max-w-156 xl:max-w-322.5 mx-auto text-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center gap-6 pb-26 md:pb-28 xl:pb-30">

          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-[#41663c] w-75 h-75 flex flex-col items-center text-center hover:bg-[#41663cdc] transition-shadow duration-300"
            >
              <div className="text-white mb-7 pt-12 ">
                <Image 
                src={service.icon} 
                alt={service.title} 
                width={80}
                height={80}></Image>
                
              </div>
              <h3 className="text-white font-bold mb-5 text-[20px] ">
                {service.title}
              </h3>
              <p className="text-gray-200 text-[16px] w-57 text-center">{service.desc}</p>
            </div>
          ))}
        </div>
            </div>
           </div>
        </div>
    );
};

export default AboutOurService;