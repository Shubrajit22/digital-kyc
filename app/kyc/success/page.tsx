"use client";
import { useSearchParams } from "next/navigation";

export default function Success() {
  const params = useSearchParams();
  const appId = params.get("appId");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Animated Checkmark */}
      <div className="bg-white shadow-xl rounded-full p-6 mb-4 animate-pop">
        <svg
          className="w-20 h-20 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-green-700">
        KYC Submitted Successfully! 🎉
      </h1>

      <p className="text-gray-700 mt-3 text-center max-w-md">
        Your KYC application has been successfully submitted and is now under
        review.  
        <br />
        <span className="font-semibold">Application ID: {appId}</span>
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-all"
      >
        Back to Home
      </a>
    </div>
  );
}
