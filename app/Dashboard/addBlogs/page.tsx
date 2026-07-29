/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react'; 
import { createBlog } from '@/app/lib/Action/blogs';
import { toast } from 'sonner';

const AddBlogPage = () => {
    const [loading, setLoading] = useState(false);
    
    // Form reference for reliable resetting
    const formRef = useRef<HTMLFormElement>(null);
    
    // States for image files and previews
    const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
    const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);

    const [creatorImageFile, setCreatorImageFile] = useState<File | null>(null);
    const [creatorImagePreview, setCreatorImagePreview] = useState<string | null>(null);

    // Handle Blog Image Selection
    const handleBlogImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBlogImageFile(file);
            setBlogImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle Creator Image Selection
    const handleCreatorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCreatorImageFile(file);
            setCreatorImagePreview(URL.createObjectURL(file));
        }
    };

    // Clear Images Helper
    const handleRemoveImages = () => {
        setBlogImageFile(null);
        setBlogImagePreview(null);
        setCreatorImageFile(null);
        setCreatorImagePreview(null);
    };

    // Upload Image to ImgBB Helper Function
    const uploadToImgBB = async (imageFile: File) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            return data.data.url; 
        } else {
            throw new Error('Image upload failed');
        }
    };

    // Handle Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formElements = e.currentTarget.elements as HTMLFormControlsCollection & {
                title: HTMLInputElement;
                category: HTMLSelectElement;
                creatorName: HTMLInputElement;
                description: HTMLTextAreaElement;
            };

            const title = formElements.title.value;
            const category = formElements.category.value;
            const creatorName = formElements.creatorName.value;
            const description = formElements.description.value;

            let blogImageUrl = '';
            let creatorImageUrl = '';

            // 1. Convert Blog Image to ImgBB link if file selected
            if (blogImageFile) {
                blogImageUrl = await uploadToImgBB(blogImageFile);
            }

            // 2. Convert Creator Image to ImgBB link if file selected
            if (creatorImageFile) {
                creatorImageUrl = await uploadToImgBB(creatorImageFile);
            }

            const blogData = {
                title,
                category,
                blogImage: blogImageUrl,
                creatorName,
                creatorImage: creatorImageUrl,
                description,
                createdAt: new Date().toISOString(),
            };

            await createBlog(blogData);
            
            toast.success("Blog posted successfully!");
            
            // Safe reset using formRef and clearing image states
            if (formRef.current) {
                formRef.current.reset();
            }
            handleRemoveImages();

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong during image upload or submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-green-100 p-8 sm:p-12">
                
                {/* Form Header */}
                <div className="text-center mb-10">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                        Green Nest Admin
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Create a New Blog Post
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                        Share eco-friendly tips, plant care guides, and green stories with your community.
                    </p>
                </div>

                {/* Form Start */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Row 1: Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
                            <input 
                                name="title"
                                type="text" 
                                placeholder="e.g., 5 Indoor Plants for Clean Air" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-gray-800 transition"
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select 
                                name="category"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-gray-800 transition"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="plant-care">Nature</option>
                                <option value="indoor-plants">Interior</option>
                                <option value="gardening-tips">Gardening Tips</option>
                                <option value="eco-friendly">Home decor</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Blog Image Upload & Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image File</label>
                            <div className="relative flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-12 px-4 border border-gray-200 rounded-xl cursor-pointer bg-white/50 hover:bg-green-50/50 transition">
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <Upload className="w-5 h-5 text-green-600" />
                                        <span className="text-sm truncate">
                                            {blogImageFile ? blogImageFile.name : "Choose blog image..."}
                                        </span>
                                    </div>
                                    <input type="file" onChange={handleBlogImageChange} className="hidden" accept="image/*" required />
                                </label>
                            </div>
                        </div>

                        {/* Blog Image Preview */}
                        {blogImagePreview && (
                            <div className="flex items-center space-x-4 bg-green-50/50 p-2 rounded-xl border border-green-200">
                                <img src={blogImagePreview} alt="Blog Preview" className="w-16 h-12 object-cover rounded-lg shadow-sm" />
                                <span className="text-xs text-gray-600 truncate flex-1">Preview Loaded</span>
                                <button 
                                    type="button" 
                                    onClick={() => { setBlogImageFile(null); setBlogImagePreview(null); }}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Row 3: Creator Name & Creator Image Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Creator Name</label>
                            <input 
                                name="creatorName"
                                type="text" 
                                placeholder="e.g., John Doe" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-gray-800 transition"
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Creator Photo File</label>
                            <div className="relative flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-12 px-4 border border-gray-200 rounded-xl cursor-pointer bg-white/50 hover:bg-green-50/50 transition">
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <Upload className="w-5 h-5 text-green-600" />
                                        <span className="text-sm truncate">
                                            {creatorImageFile ? creatorImageFile.name : "Choose creator photo..."}
                                        </span>
                                    </div>
                                    <input type="file" onChange={handleCreatorImageChange} className="hidden" accept="image/*" required />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Creator Image Preview */}
                    {creatorImagePreview && (
                        <div className="flex items-center space-x-4 bg-green-50/50 p-2 rounded-xl border border-green-200 w-fit">
                            <img src={creatorImagePreview} alt="Creator Preview" className="w-12 h-12 object-cover rounded-full shadow-sm" />
                            <span className="text-xs text-gray-600">Creator Photo Preview</span>
                            <button 
                                type="button" 
                                onClick={() => { setCreatorImageFile(null); setCreatorImagePreview(null); }}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blog Description / Content</label>
                        <textarea 
                            name="description"
                            rows={5}
                            placeholder="Write your detailed blog content here..." 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/50 text-gray-800 transition resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-green-600/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Uploading & Publishing...</span>
                                </>
                            ) : (
                                <span>Publish Blog Post</span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddBlogPage;