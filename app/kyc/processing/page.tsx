"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <ProcessingContent />
    </Suspense>
  );
}

function ProcessingContent() {
  const params = useSearchParams();
  const status = params.get("status") || "processing";

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-full p-6 mb-4 animate-pulse">
        <svg
          className="w-20 h-20 text-indigo-500 animate-spin"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-indigo-700">Processing KYC… ⚙️</h1>

      <p className="text-gray-700 mt-3 text-center max-w-md">
        Please wait while we verify your details.
      </p>

      <p className="mt-2 text-sm text-gray-600 italic">
        Status: {status.replace(/-/g, " ")}
      </p>
    </div>
  );
}
