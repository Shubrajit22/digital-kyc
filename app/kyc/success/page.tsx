"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-lg font-medium">
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4
      bg-gradient-to-br from-green-50 via-emerald-100 to-green-50 text-center">

      <div className="bg-white shadow-2xl rounded-full p-5 sm:p-7 mb-4 animate-[pop_0.4s_ease-out]">
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

      <h1 className="text-3xl sm:text-4xl font-bold text-green-700 tracking-tight">
        KYC Submitted Successfully 
      </h1>

      <p className="text-gray-700 mt-3 max-w-md text-sm sm:text-base leading-relaxed">
        Your KYC has been submitted successfully. Our team will review and verify 
        your documents shortly.
      </p>

      <p className="mt-3 text-xs sm:text-sm text-gray-600 italic">
        Reference ID: <span className="font-semibold">{ref}</span>
      </p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-xl shadow-lg transition-all duration-200
        bg-green-600 text-white hover:bg-green-700 active:scale-95 text-sm sm:text-base"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
