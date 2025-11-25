"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function PhotoSignaturePage() {
  const router = useRouter();
  const { details, files, setFiles, setStepCompleted } = useKyc();

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [signPreview, setSignPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------------
  // PHOTO CHANGE HANDLER
  // -------------------------------
  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles({ ...files, photo: file });
    file.type.startsWith("image/")
      ? setPhotoPreview(URL.createObjectURL(file))
      : setPhotoPreview(null);
  };

  // -------------------------------
  // SIGNATURE CHANGE HANDLER
  // -------------------------------
  const onSignChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles({ ...files, signature: file });
    file.type.startsWith("image/")
      ? setSignPreview(URL.createObjectURL(file))
      : setSignPreview(null);
  };

  const canNext = files.photo && files.signature;

  // -------------------------------
  // NEXT → CALL BACKEND VALIDATION
  // -------------------------------
  const next = async () => {
    if (!canNext) return;

    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("photo", files.photo as File);
    fd.append("signature", files.signature as File);
    fd.append("fullName", details.fullName || "");

    const res = await fetch("/api/kyc/validate-photo-sign", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setLoading(false);

    if (!data.ok) {
      setError(data.message || "Photo/Signature validation failed.");
      return;
    }

    // SUCCESS
    setStepCompleted(4);
    router.push("/kyc/review");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white pb-10">

      {/* TOP HEADING */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900">Complete Your KYC</h1>
        <p className="text-slate-500 mt-1 text-sm">Secure and Simple Verification Process</p>
      </div>

      <Steps current={4} />

      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 md:p-10 space-y-10">

        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Photo & Signature</h2>
        <p className="text-sm text-slate-600 -mt-4">Upload your recent photograph and signature</p>

        {/* PHOTO UPLOAD */}
        <div>
          <label className="text-sm font-medium text-slate-700">Recent Photograph *</label>

          <label className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
            bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-10 text-center">

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
            />

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 grid place-items-center rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 7h4l2-3h6l2 3h4v12H3V7z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
              </div>

              {files.photo ? (
                <span className="font-medium text-blue-600">{files.photo.name}</span>
              ) : (
                <>
                  <span className="font-semibold text-slate-700">Upload your photograph</span>
                  <span className="text-xs text-slate-500">Passport size with white background</span>
                  <span className="text-xs text-slate-500">JPEG or PNG (Max 2MB)</span>
                </>
              )}
            </div>
          </label>

          {photoPreview && (
            <img
              src={photoPreview}
              className="max-h-64 rounded-xl border border-slate-200 shadow-md object-contain mt-2"
            />
          )}
        </div>

        {/* SIGNATURE UPLOAD */}
        <div>
          <label className="text-sm font-medium text-slate-700">Signature *</label>

          <label className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
            bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-10 text-center">

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onSignChange}
            />

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 grid place-items-center rounded-full">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 17c3-3 6 2 9-1s4-9 9-11" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {files.signature ? (
                <span className="font-medium text-blue-600">{files.signature.name}</span>
              ) : (
                <>
                  <span className="font-semibold text-slate-700">Upload your signature</span>
                  <span className="text-xs text-slate-500">Sign on white paper or use digital signature</span>
                  <span className="text-xs text-slate-500">JPEG or PNG (Max 1MB)</span>
                </>
              )}
            </div>
          </label>

          {signPreview && (
            <img
              src={signPreview}
              className="max-h-64 rounded-xl border border-slate-200 shadow-md object-contain mt-2"
            />
          )}
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* GUIDELINES BOX */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm">
          <p className="font-semibold text-slate-700 mb-1">Guidelines:</p>
          <ul className="text-slate-600 space-y-1">
            <li>• Photo should be recent (taken within last 3 months)</li>
            <li>• White or light-colored background preferred</li>
            <li>• Signature should be clear and match your official documents</li>
          </ul>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => router.push("/kyc/aadhaar-upload")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 
            bg-white text-slate-700 hover:bg-slate-50 transition shadow cursor-pointer"
          >
            ← Back
          </button>

          <button
            onClick={next}
            disabled={!canNext || loading}
            className={`px-10 py-3 rounded-xl font-semibold shadow-md transition flex items-center gap-2 cursor-pointer
              ${
                canNext && !loading
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full cursor-pointer"></span>
            ) : (
              <>Continue to Review →</>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
