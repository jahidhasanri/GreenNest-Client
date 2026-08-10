
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none text-green-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-500 text-base sm:text-lg leading-relaxed">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"
        >
          <span>←</span>
          Return Home
        </Link>
      </div>
    </main>
  );
}
