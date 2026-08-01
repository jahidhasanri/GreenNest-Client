/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const BeautifulNature = () => {
    return (
        <section className="bg-white py-24 px-6 md:px-12 lg:px-20">
            <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content Area */}
                <div className="lg:col-span-6 space-y-6">
                    <span className="text-[#557C3E] uppercase tracking-widest text-xs font-bold block">
                        BEAUTIFUL NATURE
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2922] leading-tight">
                        Quisque ornare commodo placerat class torquent
                    </h2>
                    
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis etquasi.
                    </p>
                    
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem.
                    </p>
                    
                    <div>
                        <button className="inline-flex items-center gap-2 cursor-pointer bg-[#658B4A] hover:bg-[#557C3E] text-white font-semibold px-6 py-3 rounded transition-colors duration-300 text-sm tracking-wider">
                            SHOW MORE <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right Images Grid Area */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Big/Tall Image on Left Side of Grid */}
                    <div className="relative w-full h-121.5 lg:h-91.5">
                        <Image 
                            src="/images/im1.webp" // Tomar tall image path ekhane diye dibe
                            alt="Green plant leaves with water drops"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Two Stacked Images on Right Side of Grid */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full  h-53.75 lg:h-75.5">
                            <Image 
                                src="/images/im2.webp" // Tomar top image path ekhane diye dibe
                                alt="Succulent plant"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-full  h-53.75 lg:h-75.5">
                            <Image 
                                src="/images/im3.webp" // Tomar bottom image path ekhane diye dibe
                                alt="Person tending to a potted plant"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default BeautifulNature;