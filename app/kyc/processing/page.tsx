"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Processing() {
  const router = useRouter();
  const params = useSearchParams();
  const appId = params.get("appId");

  useEffect(() => {
    // Show processing page for 3 seconds
    const timer = setTimeout(() => {
      router.replace(`/kyc/success?appId=${appId}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [appId, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="text-2xl font-semibold mt-6 text-indigo-700">
          Processing Your KYC…
        </h1>

        <p className="text-gray-600 mt-2 text-center max-w-sm">
          Please wait while we verify your identity and validate your documents.
        </p>
      </div>
    </div>
  );
}
