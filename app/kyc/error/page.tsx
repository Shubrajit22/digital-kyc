"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const reason = params.get("reason") || "unknown";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-rose-100">
      {/* Animated Error Icon */}
      <div className="bg-white shadow-xl rounded-full p-6 mb-4 animate-pop">
        <svg
          className="w-20 h-20 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-red-700">KYC Failed ❌</h1>

      <p className="text-gray-700 mt-3 text-center max-w-md">
        Something went wrong while verifying your documents.
      </p>

      <p className="mt-2 text-sm text-gray-600 italic">
        Reason: {reason.replace(/-/g, " ")}
      </p>

      <div className="flex gap-4 mt-6">
        <a
          href="/"
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg transition-all"
        >
          Try Again
        </a>

        <a
          href="/kyc/basic-details"
          className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 shadow-lg transition-all"
        >
          Resubmit Form
        </a>
      </div>
    </div>
  );
}
