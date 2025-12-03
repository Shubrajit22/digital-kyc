"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AlreadyExistsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AlreadyExistsContent />
    </Suspense>
  );
}

function AlreadyExistsContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br 
    from-yellow-50 via-amber-100 to-yellow-50 text-center">

      {/* Icon */}
      <div className="bg-white shadow-xl rounded-full p-5 sm:p-7 mb-4">
        <svg
          className="w-14 h-14 sm:w-16 sm:h-16 text-amber-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18A2 2 0 003.53 21h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-amber-700">
        KYC Already Exists
      </h1>

      <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-md leading-relaxed">
        Our system detected that an existing KYC application is already linked to your details.
        You may continue the process if needed or review your previous application.
      </p>

      {/* SHOW APP ID HERE */}
      <p className="mt-4 text-xs sm:text-sm font-medium text-gray-600">
        Application ID: <span className="font-semibold text-amber-800">{ref}</span>
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-amber-600 text-white shadow-lg 
          hover:bg-amber-700 active:scale-95 transition text-sm sm:text-base"
        >
          Go Home
        </Link>

        <Link
          href="/kyc/pan-upload"
          className="px-6 py-3 rounded-xl border border-amber-600 text-amber-700 
          hover:bg-amber-50 active:scale-95 transition text-sm sm:text-base"
        >
          Continue KYC
        </Link>
      </div>
    </div>
  );
}
