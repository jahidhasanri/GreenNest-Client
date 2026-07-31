import React from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const OurServices = () => {
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
        <section className="bg-[#e9ede9] py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Content Area */}
                <div className="lg:col-span-5 space-y-6">
                    <span className="text-[#557C3E] uppercase text-[15px] tracking-widest text-xs font-bold block">
                        About Our Services
                    </span>
                    
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#1E2922] leading-tight">
                        We just love our work and plant nature, so we provide a high quality services
                    </h2>
                    
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed mt-2">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis etquasi.
                    </p>
                    
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem.
                    </p>
                    
                    <div>
                        <button className="inline-flex items-center gap-2 mt-2 bg-[#658B4A] hover:bg-[#41663c] text-white font-semibold px-6 py-3 rounded transition-colors duration-300 text-sm tracking-wider">
                            BROWSE <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right Cards Grid Area */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center sm:justify-items-stretch">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="bg-white w-full lg:w-83.75 lg:h-73.75 sm:max-w-none h-75 flex flex-col items-center text-center p-6 hover:bg-[#41663c] transition-shadow duration-300 mx-auto"
                        >
                            <div className="text-white mb-5 pt-4">
                                <Image 
                                    src={service.icon} 
                                    alt={service.title} 
                                    width={70}
                                    height={70}
                                    className="brightness-[0.35] sepia-[1] hue-rotate-70 saturate-400 group-hover:brightness-0 group-hover:invert group-hover:sepia-0 group-hover:hue-rotate-0 group-hover:saturate-100 transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-black font-bold mb-3 text-[20px]">
                                {service.title}
                            </h3>
                            <p className="text-black text-[14px] sm:text-[15px] w-57.5 leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OurServices;