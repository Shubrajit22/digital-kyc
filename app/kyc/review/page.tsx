"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function ReviewPage() {
  const router = useRouter();
  const { details, files } = useKyc();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();

      // BASIC DETAILS
      fd.append("fullName", details.fullName || "");
      fd.append("email", details.email || "");
      fd.append("phone", details.phone || "");
      fd.append("panNumber", details.panNumber || "");
      fd.append("aadhaarNumber", details.aadhaarNumber || "");

      // FILES
      if (files.pan) fd.append("panFile", files.pan);
      if (files.aadhaarFront) fd.append("aadhaarFront", files.aadhaarFront);
      if (files.aadhaarBack) fd.append("aadhaarBack", files.aadhaarBack);
      if (files.photo) fd.append("photo", files.photo);
      if (files.signature) fd.append("signature", files.signature);

      const res = await fetch("/api/kyc/submit", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (data.ok) {
        router.push(`/kyc/processing?appId=${data.appId}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred. Try again.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white pb-14 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Complete Your KYC</h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Secure and Simple Verification Process
        </p>
      </div>

      <Steps current={5} />

      {/* Card */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl 
      p-6 sm:p-8 md:p-10 space-y-10">

        {/* Heading */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Review Your Information
          </h2>
          <p className="text-sm text-slate-600">
            Please verify all details before submission
          </p>
        </div>

        {/* PERSONAL INFORMATION */}
        <ReviewSection title="Personal Information">
          <ReviewItem label="Full Name" value={details.fullName} />
          <ReviewItem label="Email Address" value={details.email} />
          <ReviewItem label="Mobile Number" value={details.phone} />
        </ReviewSection>

        {/* PAN CARD */}
        <ReviewSection title="PAN Card Details">
          <ReviewItem label="PAN Number" value={details.panNumber || "—"} />
          <ReviewItem label="Uploaded File" value={files.pan?.name || "No file uploaded"} />
        </ReviewSection>

        {/* AADHAAR */}
        <ReviewSection title="Aadhaar Card Details">
          <ReviewItem label="Aadhaar Number" value={details.aadhaarNumber || "—"} />
          <ReviewItem label="Front Side File" value={files.aadhaarFront?.name || "No file uploaded"} />
          <ReviewItem label="Back Side File" value={files.aadhaarBack?.name || "No file uploaded"} />
        </ReviewSection>

        {/* PHOTO & SIGN */}
        <ReviewSection title="Photo & Signature">
          <ReviewItem label="Photograph File" value={files.photo?.name || "No file uploaded"} />
          <ReviewItem label="Signature File" value={files.signature?.name || "No file uploaded"} />
        </ReviewSection>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.push("/kyc/photo-signature")}
            className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white 
            text-slate-700 hover:bg-slate-50 transition shadow cursor-pointer"
          >
            ← Back
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className={`px-10 py-3 rounded-xl font-semibold shadow-md transition cursor-pointer
              ${
                loading
                  ? "bg-slate-300 text-slate-500"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
              }`}
          >
            {loading ? "Submitting..." : "Submit KYC →"}
          </button>
        </div>

      </div>
    </main>
  );
}

/* --------------------- COMPONENTS --------------------- */

function ReviewSection({ title, children }: any) {
  return (
    <section className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-6 space-y-5">
      <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">{children}</div>
    </section>
  );
}

function ReviewItem({ label, value }: any) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900 break-all">{value}</p>
    </div>
  );
}
