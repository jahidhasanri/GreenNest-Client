import React from 'react';
import S_Banner from '../components/SharedBanner/S_Banner';
import { getAllBlogs } from '@/app/lib/API/bologs';
import BlogCard from '../components/Blogs/blogCard'; 

const Page = async () => {
    const AllBlogs = await getAllBlogs();
    
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            <S_Banner title="BLOGS" />
            
            {/* Blogs Grid Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {AllBlogs.map((blog) => (
                        // ব্র্যাকেট ব্যবহার করায় এখানে return দেওয়া হয়েছে
                        <BlogCard
                            key={blog._id}
                            blogImage={blog.blogImage}
                            category={blog.category}
                            title={blog.title}
                            description={blog.description}
                            creatorImage={blog.creatorImage}
                            creatorName={blog.creatorName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;