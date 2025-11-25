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

  const CheckIcon = () => (
    <svg
      className="w-4 h-4 text-green-600 inline-block"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const submit = async () => {
    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("fullName", details.fullName || "");
    fd.append("email", details.email || "");
    fd.append("phone", details.phone || "");
    fd.append("panNumber", details.panNumber || "");
    fd.append("aadhaarNumber", details.aadhaarNumber || "");
    fd.append("panFile", files.pan as File);
    fd.append("aadhaarFront", files.aadhaarFront as File);
    fd.append("aadhaarBack", files.aadhaarBack as File);
    fd.append("photo", files.photo as File);
    fd.append("signature", files.signature as File);

    const res = await fetch(`/api/kyc/submit`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setLoading(false);

    if (!data.ok) {
      setError(data.message || "Something went wrong.");
      return;
    }

    router.push(`/kyc/processing?appId=${data.appId}`);
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
        <section className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M12 9a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
            <ReviewItem label="Full Name" value={details.fullName} />
            <ReviewItem label="Email Address" value={details.email} />
            <ReviewItem label="Mobile Number" value={details.phone} />
          </div>
        </section>

        {/* PAN CARD */}
        <section className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            PAN Card Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
            <ReviewItem label="PAN Number" value={details.panNumber || "—"} />
            <ReviewItem label="Document Uploaded" value={files.pan?.name} icon={<CheckIcon />} />
          </div>
        </section>

        {/* AADHAAR */}
        <section className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Aadhaar Card Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
            <ReviewItem label="Aadhaar Number" value={details.aadhaarNumber || "—"} />
            <ReviewItem label="Front Side" value={files.aadhaarFront?.name} icon={<CheckIcon />} />
            <ReviewItem label="Back Side" value={files.aadhaarBack?.name} icon={<CheckIcon />} />
          </div>
        </section>

        {/* PHOTO & SIGN */}
        <section className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 7h4l2-3h6l2 3h4v12H3V7z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="3.5"/>
            </svg>
            Photo & Signature
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
            <ReviewItem label="Photograph" value={files.photo?.name} icon={<CheckIcon />} />
            <ReviewItem label="Signature" value={files.signature?.name} icon={<CheckIcon />} />
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 pt-4">
          <button
            onClick={() => router.push("/kyc/photo-signature")}
            className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white 
            text-slate-700 hover:bg-slate-50 transition shadow"
          >
            ← Back
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="px-10 py-3 rounded-xl font-semibold shadow-md transition 
            bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>Submit KYC →</>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}

/* --- COMPONENT FOR EACH ROW --- */
function ReviewItem({ label, value, icon }: any) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900 break-all flex items-center gap-1">
        {icon} {value}
      </p>
    </div>
  );
}
