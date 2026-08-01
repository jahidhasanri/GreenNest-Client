"use client";

import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// import toast from "sonner";

type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully.");

      reset();
    } catch (error) {
      toast.error("Failed to send message.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 overflow-hidden">

          {/* LEFT */}

          <div className="relative bg-[#2F5D31] min-h-125 flex justify-center items-end">

            <Image
              src="/images/tree.webp"
              alt="Plant"
              width={500}
              height={650}
              className="object-contain"
              priority
            />

          </div>

          {/* RIGHT */}

          <div className="bg-[#F5F8F3] px-8 md:px-14 py-12">

            <h2 className="text-4xl font-bold text-[#14311D]">
              Send us a message
            </h2>

            <p className="mt-5 text-gray-600">
              Neque porro quisquam est, qui dolorem ipsum quia dolor
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 space-y-7 text-black"
            >

              {/* Name */}

              <div>
                <label className="font-medium">
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="mt-2 w-full h-14 px-4 bg-white outline-none border border-transparent focus:border-[#5D8838]"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}

              <div>
                <label className="font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9+\-\s()]{7,20}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="mt-2 w-full h-14 px-4 bg-white outline-none border border-transparent focus:border-[#5D8838]"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}

              <div>
                <label className="font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email",
                    },
                  })}
                  className="mt-2 w-full h-14 px-4 bg-white outline-none border border-transparent focus:border-[#5D8838]"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}

              <div>
                <label className="font-medium">
                  Your Message <span className="text-red-500">*</span>
                </label>

                <textarea
                  rows={6}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="mt-2 w-full resize-none p-4 bg-white outline-none border border-[#5D8838]"
                />

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Button */}

              <button
                disabled={loading}
                className="bg-[#5D8838] hover:bg-[#486d2b] transition text-white font-semibold px-10 h-14 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;