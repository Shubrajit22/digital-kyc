"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
      bg-gradient-to-br from-red-50 via-rose-100 to-red-50 text-center">

      <div className="bg-white shadow-xl rounded-full p-5 sm:p-7 mb-4">
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-red-700 tracking-tight">
        KYC Failed ❌
      </h1>

      <p className="text-gray-700 mt-3 max-w-md text-sm sm:text-base leading-relaxed">
        There was an issue verifying your KYC application. Please try again or contact support.
      </p>

      <p className="mt-3 text-xs sm:text-sm text-gray-600 italic">
        Reference ID: <span className="font-semibold">{ref}</span>
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-xl shadow-lg transition-all
        bg-red-600 text-white hover:bg-red-700 active:scale-95 text-sm sm:text-base"
      >
        Return Home
      </Link>
    </div>
  );
}
