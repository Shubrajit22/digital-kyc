"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useKyc } from "../KycContext";

export default function ProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <ProcessingInner />
    </Suspense>
  );
}

function ProcessingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { details, files } = useKyc();
  const [message, setMessage] = useState("Submitting your details…");

  useEffect(() => {
    async function submitKyc() {
      try {
        // ❌ Missing required data? → ERROR PAGE
        if (
          !details.fullName ||
          !details.email ||
          !details.phone ||
          !details.panNumber ||
          !details.aadhaarNumber ||
          !files.pan ||
          !files.aadhaarFront ||
          !files.aadhaarBack ||
          !files.photo ||
          !files.signature
        ) {
          router.replace("/kyc/error?reason=missing-data");
          return;
        }

        // Build FormData
        const fd = new FormData();
        fd.append("fullName", details.fullName);
        fd.append("email", details.email);
        fd.append("phone", details.phone);
        fd.append("panNumber", details.panNumber);
        fd.append("aadhaarNumber", details.aadhaarNumber);

        fd.append("panFile", files.pan);
        fd.append("aadhaarFront", files.aadhaarFront);
        fd.append("aadhaarBack", files.aadhaarBack);
        fd.append("photo", files.photo);
        fd.append("signature", files.signature);

        // Submit to backend
        const res = await fetch("/api/kyc/submit", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();

        // ✅ DB save success → SUCCESS PAGE
        if (data.ok && data.appId) {
          router.replace(`/kyc/success?ref=${data.appId}`);
          return;
        }

        // ❌ DB save failed → ERROR PAGE
        router.replace(`/kyc/error?reason=submit-failed`);
      } catch (err) {
        console.error("Processing error:", err);
        router.replace(`/kyc/error?reason=network-error`);
      }
    }

    submitKyc();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 text-center">

      <div className="bg-white rounded-2xl shadow-xl px-8 py-10 max-w-md w-full space-y-4">

        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>

        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
          Processing Your KYC…
        </h1>

        <p className="text-sm text-slate-600">{message}</p>

        <p className="text-xs text-slate-400">Please do not refresh the page.</p>
      </div>

    </main>
  );
}
