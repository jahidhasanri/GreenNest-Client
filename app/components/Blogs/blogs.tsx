
import React from 'react';
import BlogCard from './blogCard'; // Path check kore niben
import { getAllBlogs } from '@/app/lib/API/bologs';
import Link from 'next/link';

// TypeScript interface for Blog object
interface Blog {
    _id: string;
    blogImage: string;
    category: string;
    title: string;
    description: string;
    creatorImage: string;
    creatorName: string;
}

const Blogs = async () => {
    // Fetch all blogs (parameter chara call korai better)
    const AllBlogs = await getAllBlogs();

    return (
        <div className="bg-white pt-10 md:pt-16 lg:pt-12 pb-16">
                <div className='md:max-w-full lg:max-w-210 xl:max-w-322.5 mx-auto flex justify-between mb-14'>

                    <div><h1 className='text-[40px] text-black font-bold'>Latest From Our Blog</h1></div>
                    <div><Link href='/Blogs'><button  className='w-31.25 h-11 text-black border-2 border-black cursor-pointer'>All Posts</button></Link></div>

                </div>
            <div className="md:max-w-full lg:max-w-210 xl:max-w-322.5  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6">
                {/* Map through the blogs and render BlogCard */}
                {AllBlogs && AllBlogs.length > 0 ? (
                    AllBlogs.map((blog: Blog) => (
                        <BlogCard
                            key={blog._id}
                            blogImage={blog.blogImage}
                            category={blog.category}
                            title={blog.title}
                            description={blog.description}
                            creatorImage={blog.creatorImage}
                            creatorName={blog.creatorName}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No blogs found.
                    </div>
                )}

            </div>
        </div>
    );
};

export default Blogs;