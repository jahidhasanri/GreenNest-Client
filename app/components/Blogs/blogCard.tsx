"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BlogCardProps {
  blogImage: string;
  category: string;
  title: string;
  description: string;
  creatorImage: string;
  creatorName: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blogImage,
  category,
  title,
  description,
  creatorImage,
  creatorName,
}) => {
  // মডাল ওপেন বা ক্লোজ স্টেট ম্যানেজ করার জন্য
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* কার্ড - যার উপর ক্লিক করলে মডাল ওপেন হবে */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="bg-white shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl flex flex-col h-full cursor-pointer"
      >
        {/* Blog Image */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden">
          <Image
            src={blogImage || "/placeholder.jpg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={false}
          />
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Category */}
          <span className="text-xs font-bold tracking-widest text-sky-700 uppercase mb-3">
            {category}
          </span>

          {/* Title */} 
          <h3 className="font-bold text-gray-800 mb-3 leading-snug text-[20px]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base mb-6 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            <Image
              src={creatorImage || "/avatar-placeholder.png"}
              alt={creatorName}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

            <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-800 uppercase">
              {creatorName}
            </span>
          </div>
        </div>
      </div>

      {/* Modal / Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-72 sm:h-80">
              <Image
                src={blogImage || "/placeholder.jpg"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <span className="text-xs font-bold tracking-widest text-sky-700 uppercase mb-2 block">
                {category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                {title}
              </h2>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
                {description}
              </p>

              {/* Author in Modal */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <Image
                  src={creatorImage || "/avatar-placeholder.png"}
                  alt={creatorName}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <span className="text-sm font-semibold tracking-wider text-gray-800 uppercase">
                  {creatorName}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;