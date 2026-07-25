"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, ImagePlus, Loader2, X } from "lucide-react";
import {
  TextField,
  Label,
  InputGroup,
  FieldError,
  Button,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile image (imgbb) state
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterForm>();


  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        {
          method: "POST",
          body: formData,
        }
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

  const handleRemoveImage = () => {
    setImagePreview("");
    setImageUrl("");
    setImageError("");
    setFileInputKey((k) => k + 1);
  };

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setServerError("");

    try {
      const result = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: imageUrl || "https://i.ibb.co.com/ZR5wBgVN/img.png",
      });

      if (result.error) {
        setServerError(result.error.message || "Registration failed");
        toast.error(result.error.message || "Registration failed");
        return;
      }

      reset();
      handleRemoveImage();
      toast.success("Account created successfully!");

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setServerError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      });

      if (data?.error) {
        toast.error(data.error.message || "Google sign up failed");
        return;
      }

      toast.success("Redirecting to Google...");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-6xl mt-20 mb-10 xl:mb-0 2xl:mt-0 lg:flex border rounded-xl overflow-hidden shadow-lg">

        {/* Left Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#192C27] mb-2">
              Create Account
            </h2>
            <p className="text-[#8E98A0] mb-8">
              Welcome! Please create your account.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-24 h-24">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    {imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <ImagePlus size={26} className="text-gray-400" />
                    )}

                    {uploadingImage && (
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                        <Loader2
                          size={24}
                          className="text-white animate-spin"
                        />
                      </div>
                    )}
                  </div>

                  {imagePreview && !uploadingImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-1 -right-1 bg-white border rounded-full p-1 hover:bg-gray-100"
                    >
                      <X size={14} className="text-gray-600" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-[#2e4e2a] text-white rounded-full p-1.5 hover:bg-[#264123] transition"
                  >
                    <ImagePlus size={14} />
                  </button>

                  <input
                    key={fileInputKey}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <span className="text-xs text-[#8E98A0]">
                  Upload profile photo (optional)
                </span>

                {imageError && (
                  <p className="text-red-500 text-xs">{imageError}</p>
                )}
              </div>

              {/* Name */}
              <TextField isInvalid={!!errors.name}>
                <Label className="block text-sm font-medium text-[#192C27] mb-1">
                  Full Name
                </Label>
                <InputGroup>
                  <InputGroup.Input
                    placeholder="Enter your name"
                    className="w-full px-4 text-black py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                </InputGroup>
                <FieldError className="text-sm text-red-500">
                  {errors.name?.message}
                </FieldError>
              </TextField>

              {/* Email */}
              <TextField isInvalid={!!errors.email}>
                <Label className="block text-sm font-medium text-[#192C27] mb-1">
                  Email
                </Label>
                <InputGroup>
                  <InputGroup.Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 text-black py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                </InputGroup>
                <FieldError className="text-sm text-red-500">
                  {errors.email?.message}
                </FieldError>
              </TextField>

              {/* Password */}
              <TextField isInvalid={!!errors.password}>
                <Label className="block text-sm font-medium text-[#192C27] mb-1">
                  Password
                </Label>
                <InputGroup>
                  <InputGroup.Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 text-black py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: passwordRegex,
                        message:
                          "Min 8 chars, uppercase, lowercase, number & special character.",
                      },
                    })}
                  />
                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>
                <FieldError className="text-sm text-red-500">
                  {errors.password?.message}
                </FieldError>
              </TextField>

              {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <Button
                  type="button"
                  onPress={() => {
                    reset();
                    setServerError("");
                    handleRemoveImage();
                  }}
                  className="w-full flex-1 cursor-pointer border border-gray-300 text-[#192C27] py-3 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  isPending={loading || uploadingImage}
                  className="w-full flex-1 cursor-pointer bg-[#2e4e2a] text-white py-3 rounded-md hover:bg-[#264123] transition disabled:opacity-60"
                >
                  {({ isPending }) =>
                    isPending
                      ? uploadingImage
                        ? "Uploading image..."
                        : "Signing up..."
                      : "Sign Up"
                  }
                </Button>
              </div>
            </form>

            {/* OR Divider */}
            <div className="flex items-center justify-center gap-3 my-4">
              <span className="border-b w-full border-gray-300"></span>
              <span className="text-gray-400 text-sm">OR</span>
              <span className="border-b w-full border-gray-300"></span>
            </div>

            {/* Google Register Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-17.7-1.5-35-4.4-51.8H272v98h146.8c-6.4 34.6-25.7 63.9-54.6 83.6v69.4h88.3c51.6-47.5 81-117.8 81-199.2z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c73.8 0 135.8-24.5 181.1-66.6l-88.3-69.4c-24.6 16.5-56.3 26.3-92.8 26.3-71.2 0-131.5-48-153.2-112.8H27.7v70.8C73.1 474 166.3 544.3 272 544.3z"
                  fill="#34A853"
                />
                <path
                  d="M118.8 314.6c-11.7-34.6-11.7-72 0-106.6V137.2H27.7c-26.3 52.6-26.3 115.2 0 167.8l91.1-70.4z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.6c39.9 0 75.8 13.7 104 40.6l77.9-77.9C408.2 24.9 346.2 0 272 0 166.3 0 73.1 70.3 27.7 174.8l91.1 70.4C140.5 155.6 200.8 107.6 272 107.6z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700 font-medium cursor-pointer">
                Register with Google
              </span>
            </button>

            {/* Login link */}
            <p className="text-center text-sm text-[#8E98A0] mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2e4e2a] font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right Register Form Section */}
        <div className="w-full md:hidden lg:block lg:w-1/2 h-80 md:h-125 lg:h-160 relative">
          <Image
            src="/images/peace-lily-plant-pot.jpg"
            alt="Register Image"
            fill
            className="object-cover object-top h-full w-full md:w-1/2"
            priority
          />
        </div>
      </div>
    </div>
  );
}