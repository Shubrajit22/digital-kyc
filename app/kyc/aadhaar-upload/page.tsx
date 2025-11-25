"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function AadhaarUploadPage() {
  const router = useRouter();
  const { files, setFiles, details, setDetails, setStepCompleted } = useKyc();

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles({ ...files, aadhaarFront: file });
    file.type.startsWith("image/")
      ? setFrontPreview(URL.createObjectURL(file))
      : setFrontPreview(null);
  };

  const onBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles({ ...files, aadhaarBack: file });
    file.type.startsWith("image/")
      ? setBackPreview(URL.createObjectURL(file))
      : setBackPreview(null);
  };

  const canNext =
    details.aadhaarNumber?.length === 12 &&
    files.aadhaarFront &&
    files.aadhaarBack;

  const next = async () => {
    if (!canNext) return;
    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("aadhaarNumber", details.aadhaarNumber || "");
    fd.append("aadhaarFront", files.aadhaarFront as File);
    fd.append("aadhaarBack", files.aadhaarBack as File);
    fd.append("fullName", details.fullName || "");

    const res = await fetch(`/api/kyc/validate-aadhaar`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setLoading(false);

    if (!data.ok) {
      setError(
        data.message || "Aadhaar validation failed. Please re-upload."
      );
      return;
    }

    setStepCompleted(3);
    router.push("/kyc/photo-signature");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white pb-14 px-4 sm:px-6">

      {/* Heading */}
      <div className="text-center py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Complete Your KYC
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Secure and Simple Verification Process
        </p>
      </div>

      <Steps current={3} />

      {/* Main Card */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 md:p-10 space-y-10">

        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white grid place-items-center rounded-xl shadow">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Aadhaar Card Details
          </h2>
        </div>

        <p className="text-sm text-slate-600 -mt-3">
          Upload both front and back side of your Aadhaar card
        </p>

        {/* Aadhaar Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Aadhaar Number *
          </label>
          <input
            type="text"
            maxLength={12}
            value={details.aadhaarNumber || ""}
            onChange={(e) =>
              setDetails({
                ...details,
                aadhaarNumber: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="Enter 12-digit Aadhaar number"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 
            focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Uploads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Front Upload */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Aadhaar Front Side *
            </label>

            <label className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
            bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-8 sm:p-10 text-center">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={onFrontChange}
              />

              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 grid place-items-center rounded-full">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                </div>

                {files.aadhaarFront ? (
                  <span className="font-medium text-blue-600">
                    {files.aadhaarFront.name}
                  </span>
                ) : (
                  <>
                    <span className="font-semibold text-slate-700">
                      Click to upload front side
                    </span>
                    <span className="text-xs text-slate-500">
                      JPEG, PNG or PDF (Max 5MB)
                    </span>
                  </>
                )}
              </div>
            </label>

            {frontPreview && (
              <img
                src={frontPreview}
                className="max-h-48 sm:max-h-64 w-full rounded-xl border border-slate-200 shadow-md object-contain mt-3"
              />
            )}
          </div>

          {/* Back Upload */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Aadhaar Back Side *
            </label>

            <label className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
            bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-8 sm:p-10 text-center">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={onBackChange}
              />

              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 grid place-items-center rounded-full">
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12" />
                  </svg>
                </div>

                {files.aadhaarBack ? (
                  <span className="font-medium text-blue-600">
                    {files.aadhaarBack.name}
                  </span>
                ) : (
                  <>
                    <span className="font-semibold text-slate-700">
                      Click to upload back side
                    </span>
                    <span className="text-xs text-slate-500">
                      JPEG, PNG or PDF (Max 5MB)
                    </span>
                  </>
                )}
              </div>
            </label>

            {backPreview && (
              <img
                src={backPreview}
                className="max-h-48 sm:max-h-64 w-full rounded-xl border border-slate-200 shadow-md object-contain mt-3"
              />
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* Info Note */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm">
          <span className="font-semibold text-slate-700">Note: </span>
          <span className="text-slate-600">
            Make sure your Aadhaar number is clearly visible in the uploaded images.
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <button
            onClick={() => router.push("/kyc/pan-upload")}
            className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white 
            text-slate-700 hover:bg-slate-50 transition shadow"
          >
            ← Back
          </button>

          <button
            onClick={next}
            disabled={!canNext || loading}
            className={`px-10 py-3 rounded-xl font-semibold shadow-md transition 
              ${canNext && !loading
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block"></span>
            ) : (
              <>Continue →</>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
