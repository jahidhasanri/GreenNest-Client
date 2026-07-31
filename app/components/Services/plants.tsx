/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';

const Plants = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Pellentesque tincidunt tristique neque?",
            answer: "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block."
        },
        {
            question: "Suspendisse sed ultricies nisl, pharetra rutrum mauris?",
            answer: "Suspendisse sed ultricies nisl, pharetra rutrum mauris. Curabitur elementum nunc a leo imperdiet, nec elementum diam elementum."
        },
        {
            question: "Fusce at egestas libero convallis egestasullamcorper?",
            answer: "Fusce at egestas libero convallis egestas ullamcorper. Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor."
        }
    ];

    const toggleAccordion = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-28 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Image Area (Ekhane height h-150 ba chabi moto thik kora jabe) */}
                <div className="lg:col-span-6 relative w-full h-112.5 sm:h-137.5 lg:h-175">
                    <Image 
                        src="/images/services-plant-image_optimized.webp" 
                        alt="Plant on wooden table"
                        fill
                        className="object-cover rounded-none"
                        priority
                    />
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-6  space-y-6">
                    {/* Small Tag */}
                    <span className="text-[#557C3E] uppercase tracking-widest text-[15px] font-bold block">
                        PLANTS
                    </span>
                    
                    {/* Main Title */}
                    <h2 className="text-3xl sm:text-2xl lg:text-4xl font-bold text-[#1E2922] leading-tight">
                        Phasellus dignissim tellus pellentesque mollisorci
                    </h2>
                    
                    {/* Description Paragraph */}
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed">
                        Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor. Curabitur elementum nunc a leo imperdiet, nec elementum diam elementum. Etiam elementum euismod commodo.
                    </p>

                    {/* Accordion List */}
                    <div className="divide-y divide-gray-200 border-t border-b border-gray-200 my-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="py-4">
                                <button 
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center text-left font-semibold text-[#1E2922] focus:outline-none cursor-pointer"
                                >
                                    <span className="text-base sm:text-lg">{faq.question}</span>
                                    <span className="text-xl font-normal text-gray-500 ml-4">
                                        {openIndex === index ? <FiMinus /> : <FiPlus />}
                                    </span>
                                </button>
                                
                                {openIndex === index && (
                                    <p className="mt-3 text-[#64746B] text-sm sm:text-base leading-relaxed pr-6">
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* More Details Button */}
                    <div className="pt-2">
                        <Link href={'/products'}>
                        <button className="border-2 border-[#1E2922] hover:bg-[#1E2922] hover:text-white text-[#1E2922] font-bold px-8 py-3.5 transition-all duration-300 text-xs sm:text-sm tracking-widest uppercase">
                            MORE DETAILS
                        </button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Plants;