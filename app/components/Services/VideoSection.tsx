/* eslint-disable @typescript-eslint/no-explicit-any */
"use class"
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const VideoSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Tomar YouTube video-er embed link ekhane diye dibe
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 

    return (
        <section className="relative bg-[#E9ECE9] pb-24 pt-12 px-6">
            <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5 py-10  mx-auto text-center">
                
                {/* Image & Play Button Container */}
                <div 
                    onClick={() => setIsOpen(true)}
                    className="relative w-full h-87.5 sm:h-112.5 lg:h-170 cursor-pointer group overflow-hidden shadow-lg"
                >
                    {/* Background Image */}
                    <Image 
                        src="/images/video-cover-image-2_optimized.webp" // Tomar image path ekhane dibe
                        alt="Interior design with plants"
                        fill
                        className="object-cover transition-transform duration-500 brightness-[0.85]"
                        priority
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#557C3E] rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                            <FaPlay className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                        </div>
                    </div>
                </div>

                {/* Bottom Description Text */}
                <div className="mt-20 max-w-3xl -mb-10 mx-auto">
                    <p className="text-[#64746B] text-sm sm:text-base leading-relaxed">
                        Integer at faucibus urna. Nullam condimentum leo id elit sagittis auctor. Curabitur elementum nunc a leo imperdiet nec elementum diam elementum. Etiam elementum euismod commodo. Proin eleifend eget quam ut efficitur. Mauris a accumsan mauris. Phasellus egestas et risus sit amet hendrerit. Nulla facilisi.
                    </p>
                </div>
            </div>

            {/* YouTube Video Popup Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black p-2 rounded-full transition-colors duration-200"
                        >
                            <IoClose className="w-6 h-6" />
                        </button>

                        {/* YouTube Iframe */}
                        <iframe 
                            src={videoUrl} 
                            title="YouTube video player" 
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default VideoSection;