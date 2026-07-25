"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ImagePlus,
  Loader2,
  X,
  Sprout,
  Tag,
  Layers,
  FileText,
  Percent,
  DollarSign,
  Boxes,
} from "lucide-react";

type ProductForm = {
  name: string;
  price: number;
  discount: number;
  description: string;
  category: string;
  quantity: number;
};

const categories = [
  { value: "office-plant", label: "Office Plant" },
  { value: "cafe-plant", label: "Cafe Plant" },
  { value: "home-plant", label: "Home Plant" },
  { value: "cactus", label: "Cactus" },
  { value: "potted-plant", label: "Potted Plant" },
];

const AddProducts = () => {
  const [submitting, setSubmitting] = useState(false);

  // Image upload (imgbb) state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be smaller than 5MB");
      return;
    }

    setImageError("");
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const json = await res.json();

      if (!json.success) {
        throw new Error(json?.error?.message || "Image upload failed");
      }

      setImageUrl(json.data.display_url || json.data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Image upload failed";
      setImageError(message);
      toast.error(message);
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadImage(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageUrl("");
    setImageError("");
    setFileInputKey((k) => k + 1);
  };

  const onSubmit = async (data: ProductForm) => {
    if (!imageUrl) {
      setImageError("Please upload a product image");
      toast.error("Please upload a product image");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount) || 0,
        quantity: Number(data.quantity),
        image: imageUrl,
      };

      console.log(payload)
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.message || "Failed to add product");
      }

      toast.success("Product added successfully!");
      reset();
      handleRemoveImage();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // const discountedPreview = (price: number, discount: number) => {
  //   if (!price) return null;
  //   const final = price - (price * (discount || 0)) / 100;
  //   return final.toFixed(2);
  // };

  return (
    <div className="min-h-screen bg-[#F5F7F3] py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-[#2e4e2a] flex items-center justify-center shrink-0">
            <Sprout size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#192C27]">
              Add New Product
            </h1>
            <p className="text-[#8E98A0] text-sm sm:text-base">
              Fill in the details below to list a new plant in your store.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Image upload */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-6">
                <h2 className="text-sm font-semibold text-[#192C27] mb-4 flex items-center gap-2">
                  <ImagePlus size={16} className="text-[#5a8139]" />
                  Product Image
                </h2>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative aspect-square w-full rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-colors
                    ${
                      dragActive
                        ? "border-[#5a8139] bg-[#5a8139]/5"
                        : "border-gray-300 bg-[#F5F7F3] hover:border-[#5a8139]/60"
                    }`}
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400 px-4 text-center">
                      <ImagePlus size={32} />
                      <p className="text-sm font-medium">
                        Click or drag an image here
                      </p>
                      <p className="text-xs">PNG, JPG up to 5MB</p>
                    </div>
                  )}

                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2
                        size={28}
                        className="text-white animate-spin"
                      />
                    </div>
                  )}

                  {imagePreview && !uploadingImage && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                      }}
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 hover:bg-white shadow"
                    >
                      <X size={16} className="text-gray-700" />
                    </button>
                  )}

                  <input
                    key={fileInputKey}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {imageError && (
                  <p className="text-red-500 text-xs mt-2">{imageError}</p>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 w-full text-sm font-medium text-[#2e4e2a] border border-[#2e4e2a]/30 rounded-lg py-2 hover:bg-[#2e4e2a]/5 transition"
                >
                  {imagePreview ? "Change image" : "Upload image"}
                </button>
              </div>
            </div>

            {/* Right: Form fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-sm font-semibold text-[#192C27] mb-5 flex items-center gap-2">
                  <FileText size={16} className="text-[#5a8139]" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#192C27] mb-1.5">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Golden Pothos"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("name", {
                        required: "Product name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#192C27] mb-1.5 flex items-center gap-1.5">
                      <Layers size={14} className="text-[#5a8139]" />
                      Category
                    </label>
                    <select
                      defaultValue=""
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("category", {
                        required: "Please select a category",
                      })}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#192C27] mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the plant — light needs, care tips, what makes it special..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 20,
                          message: "Description should be at least 20 characters",
                        },
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-sm font-semibold text-[#192C27] mb-5 flex items-center gap-2">
                  <DollarSign size={16} className="text-[#5a8139]" />
                  Pricing & Inventory
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Price */}
                  <div>
                    <label className=" text-sm font-medium text-[#192C27] mb-1.5 flex items-center gap-1.5">
                      <Tag size={14} className="text-[#5a8139]" />
                      Price (৳)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price can't be negative" },
                      })}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-sm font-medium text-[#192C27] mb-1.5 flex items-center gap-1.5">
                      <Percent size={14} className="text-[#5a8139]" />
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("discount", {
                        min: { value: 0, message: "Minimum is 0%" },
                        max: { value: 100, message: "Maximum is 100%" },
                      })}
                    />
                    {errors.discount && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.discount.message}
                      </p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-[#192C27] mb-1.5 flex items-center gap-1.5">
                      <Boxes size={14} className="text-[#5a8139]" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="0"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[#192C27] text-sm focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]/40 focus:border-[#2e4e2a] transition"
                      {...register("quantity", {
                        required: "Quantity is required",
                        min: { value: 0, message: "Can't be negative" },
                      })}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    handleRemoveImage();
                  }}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-[#192C27] text-sm font-medium hover:bg-gray-100 transition"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-8 py-3 rounded-lg bg-[#2e4e2a] text-white text-sm font-medium hover:bg-[#264123] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  {submitting ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;