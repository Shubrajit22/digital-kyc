"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref") || "N/A";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="bg-white shadow-xl rounded-full p-6 mb-4 animate-pop">
        <svg
          className="w-20 h-20 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-green-700">KYC Submitted Successfully ✔️</h1>

      <p className="text-gray-700 mt-3 text-center max-w-md">
        Your details have been submitted. Our team will verify the documents shortly.
      </p>

      <p className="mt-2 text-sm text-gray-600 italic">
        Reference ID: {ref}
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-lg transition-all"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
