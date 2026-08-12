/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  ImagePlus,
  Mail,
  User,
  X,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { useSession } from "@/app/lib/auth-client";
import { updateUserInformation } from "@/app/lib/API/UpdateUserInfo";


const Page = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  // --------------------------------
  // Initialize user information
  // --------------------------------
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || null);
    }
  }, [user]);

  // --------------------------------
  // Upload image to ImgBB
  // --------------------------------
  const uploadImageToImgBB = async (
    file: File
  ): Promise<string> => {
    const formData = new FormData();

    formData.append(
      "key",
      process.env.NEXT_PUBLIC_IMGBB_API_KEY || ""
    );

    formData.append("image", file);

    const response = await fetch(
      "https://api.imgbb.com/1/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  // --------------------------------
  // Image select
  // --------------------------------
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Image type validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // Image size validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Save actual file
    setSelectedFile(file);

    // Create preview
    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);
  };

  // --------------------------------
  // Remove selected image
  // --------------------------------
  const removeImage = () => {
    setImage(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --------------------------------
  // Cancel changes
  // --------------------------------
  const handleCancel = () => {
    if (!user) return;

    setName(user.name || "");
    setImage(user.image || null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --------------------------------
  // Update profile
  // --------------------------------
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("User information not found");
      return;
    }

    // Name validation
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    // Check whether name changed
    const nameChanged =
      name.trim() !== (user.name || "");

    // Check whether image changed
    const imageChanged = selectedFile !== null;

    // Nothing changed
    if (!nameChanged && !imageChanged) {
      toast.error("Nothing to update");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = user.image || null;

      // --------------------------------
      // Upload new image to ImgBB
      // --------------------------------
      if (selectedFile) {
        toast.loading("Uploading image...", {
          id: "profile-update",
        });

        imageUrl = await uploadImageToImgBB(
          selectedFile
        );

        toast.dismiss("profile-update");
      }

      // --------------------------------
      // Update MongoDB
      // --------------------------------
      await updateUserInformation(
        user.id,
        name.trim(),
        imageUrl
      );

      // Update local UI
      setImage(imageUrl);
      setName(name.trim());
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(
        "Profile updated successfully!"
      );
    } catch (error) {
      console.error("Profile update error:", error);

      toast.dismiss("profile-update");

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">
          Loading profile...
        </div>
      </div>
    );
  }

  // --------------------------------
  // Not logged in
  // --------------------------------
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <User
              size={30}
              className="text-gray-400"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Please Login
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You need to login to update your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* ================================
            Page Header
        ================================= */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Update Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your name and profile picture.
          </p>
        </div>

        {/* ================================
            Main Card
        ================================= */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* ================================
              Profile Image Section
          ================================= */}
          <div className="border-b border-gray-100 bg-linear-to-r from-green-50 to-white px-5 py-7 sm:px-8">

            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* Profile Image */}
              <div className="relative shrink-0">

                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md sm:h-32 sm:w-32">

                  {image ? (
                    <Image
                      src={image}
                      width={128}
                      height={128}
                      alt="Profile picture"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User
                      size={55}
                      className="text-gray-400"
                    />
                  )}

                </div>

                {/* Camera Button */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Change profile picture"
                >
                  <Camera size={18} />
                </button>

              </div>

              {/* Image Information */}
              <div className="text-center sm:text-left">

                <h2 className="text-lg font-semibold text-gray-900">
                  Profile Picture
                </h2>

                <p className="mt-1 max-w-md text-sm leading-6 text-gray-500">
                  Upload a new profile picture. JPG, PNG
                  or WEBP. Maximum file size is 5MB.
                </p>

                {/* Image Buttons */}
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">

                  {/* Change Image */}
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ImagePlus size={16} />

                    Change Image
                  </button>

                  {/* Remove Image */}
                  {image && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={removeImage}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <X size={16} />

                      Remove
                    </button>
                  )}

                </div>

              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* ================================
              Form
          ================================= */}
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-8"
          >
            <div className="space-y-6">

              {/* ================================
                  Name
              ================================= */}
              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                </div>

              </div>

              {/* ================================
                  Email
              ================================= */}
              <div>

                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                    Cannot be changed
                  </span>

                </div>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-500 outline-none"
                  />

                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Your email address is linked to your
                  account and cannot be changed.
                </p>

              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* ================================
                  Action Buttons
              ================================= */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                {/* Cancel */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCancel}
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  Cancel
                </button>

                {/* Update */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Save size={17} />

                  {loading
                    ? "Updating..."
                    : "Update Profile"}
                </button>

              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;