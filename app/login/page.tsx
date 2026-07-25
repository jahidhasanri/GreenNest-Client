"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    if (!email || !password) {
      setServerError("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (result.error) {
        setServerError(result.error.message || "Login failed");
        toast.error(result.error.message || "Login failed");
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setServerError("Something went wrong.");
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Google login failed.");
      setGoogleLoading(false);
    }
    finally {
        toast.success("Redirecting to Google...");
        setGoogleLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-6xl mt-20 mb-10 xl:mb-0 2xl:mt-0 lg:flex border rounded-xl overflow-hidden shadow-lg">

        {/* Left Image Section */}
        <div className="w-full md:hidden lg:block lg:w-1/2 h-80 md:h-125 lg:h-160 relative">
          <Image
            src="/images/peace-lily-plant-pot.jpg" 
            alt="Login Image"
            fill
            className="object-cover object-top h-full w-full md:w-1/2"
            priority
          />
        </div>

        {/* Right Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
  <div className="w-full max-w-md">
    <h2 className="text-2xl font-bold text-[#192C27] mb-2">
      Welcome Back
    </h2>
    <p className="text-[#8E98A0] mb-8">
      Please login to your account
    </p>

    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#192C27] mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 text-black py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[#192C27] mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 text-black py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2e4e2a]"
        />
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-[#8E98A0]">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="accent-[#2e4e2a]"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-[#2e4e2a] font-medium">
          Forgot password?
        </Link>
      </div>

      {serverError && (
        <p className="text-red-500 text-sm">{serverError}</p>
      )}

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-[#2e4e2a] text-white py-3 rounded-md hover:bg-[#264123] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* OR Divider */}
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="border-b w-full border-gray-300"></span>
      <span className="text-gray-400 text-sm">OR</span>
      <span className="border-b w-full border-gray-300"></span>
    </div>

    {/* Google Login Button */}
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={googleLoading}
      className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
      >
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
        {googleLoading ? "Redirecting..." : "Login with Google"}
      </span>
    </button>

    {/* Register */}
    <p className="text-center text-sm text-[#8E98A0] mt-6">
      Don’t have an account?{" "}
      <Link href="/Register" className="text-[#2e4e2a] font-medium">
        Register
      </Link>
    </p>
  </div>
</div>


      </div>
    </div>
  );
};

export default LoginPage;