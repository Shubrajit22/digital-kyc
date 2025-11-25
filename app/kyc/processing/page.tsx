"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-lg sm:text-xl">
          Loading...
        </div>
      }
    >
      <ProcessingContent />
    </Suspense>
  );
}

function ProcessingContent() {
  const params = useSearchParams();
  const status = params.get("status") || "processing";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
    bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Icon */}
      <div className="bg-white shadow-xl rounded-full p-4 sm:p-6 mb-4 animate-pulse">
        <svg
          className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500 animate-spin"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700 text-center">
        Processing KYC… ⚙️
      </h1>

      {/* Description */}
      <p className="text-gray-700 mt-3 text-center max-w-md text-sm sm:text-base">
        Please wait while we verify your details.
      </p>

      {/* Status */}
      <p className="mt-2 text-xs sm:text-sm text-gray-600 italic text-center">
        Status: {status.replace(/-/g, " ")}
      </p>
    </div>
  );
}
