"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-lg sm:text-xl">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
    px-4 bg-gradient-to-br from-green-50 to-emerald-100 text-center">

      {/* Icon */}
      <div className="bg-white shadow-xl rounded-full p-4 sm:p-6 mb-4 animate-pop">
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700">
        KYC Submitted Successfully ✔️
      </h1>

      {/* Description */}
      <p className="text-gray-700 mt-3 max-w-md text-sm sm:text-base">
        Your details have been submitted. Our team will verify your documents shortly.
      </p>

      {/* Reference */}
      <p className="mt-2 text-xs sm:text-sm text-gray-600 italic">
        Reference ID: {ref}
      </p>

      {/* Button */}
      <a
        href="/"
        className="mt-6 px-6 py-3 rounded-xl shadow-lg transition-all 
        bg-green-600 text-white hover:bg-green-700 text-sm sm:text-base"
      >
        Go to Dashboard
      </a>

    </div>
  );
}
