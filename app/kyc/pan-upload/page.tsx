"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function PanUploadPage() {
  const router = useRouter();
  const {
    details,
    setDetails,
    files,
    setFiles,
    setStepCompleted,
    attempts,
    increaseAttempt,
    resetAttempts,
  } = useKyc();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePanChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("❌ File too large! Please upload a file under 5MB.");
      return;
    }

    setFiles({ ...files, pan: file });
    setPreview(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
    setError(null);
  };

  const panLength = details.panNumber?.length ?? 0;
  const canNext = !!files.pan && panLength >= 10 && !loading;

  const handleNext = async () => {
    if (!canNext) return;

    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("panFile", files.pan as File);
    fd.append("panNumber", details.panNumber || "");
    fd.append("fullName", details.fullName || "");

    let data: any;

    try {
      const res = await fetch("/api/kyc/validate-pan", {
        method: "POST",
        body: fd,
      });
      data = await res.json();
    } catch (e) {
      setLoading(false);
      setError("❌ Network error while validating PAN. Please try again.");
      return;
    }

    setLoading(false);

    // 1️⃣ API says validation failed
    if (!data?.ok) {
      increaseAttempt();

      if (attempts + 1 >= 5) {
        resetAttempts();
        alert("❌ You have exceeded the maximum number of attempts. Please try again later.");
        router.push("/");
        return;
      }

      let message = "❌ PAN card verification failed.";

      const reason = (data.reason || "").toString().toLowerCase();
      if (reason.includes("number")) {
        message = "❌ The PAN number does not match the PAN card uploaded.";
      } else if (reason.includes("name")) {
        message = "❌ The name on the PAN card does not match the name you entered.";
      } else if (data.message) {
        message = `❌ ${data.message}`;
      }

      setError(message);
      return;
    }

    // 2️⃣ Extra name mismatch safety using extractedName
    const extractedName = data.extractedName?.trim()?.toLowerCase();
    const userName = details.fullName?.trim()?.toLowerCase();

    if (extractedName && userName && extractedName !== userName) {
      increaseAttempt();

      if (attempts + 1 >= 5) {
        resetAttempts();
        alert("❌ You have exceeded the maximum number of attempts. Please try again later.");
        router.push("/");
        return;
      }

      setError(
        `❌ Name mismatch detected!
PAN Name: ${data.extractedName}
Entered Name: ${details.fullName}`
      );
      return;
    }

    // ✅ Success
    setStepCompleted(2);
    router.push("/kyc/aadhaar-upload");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white pb-14 px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center py-6 space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">Complete Your KYC</h1>
        <p className="text-slate-500 text-sm">Secure and Simple Verification Process</p>
      </div>

      <Steps current={2} />

      {/* Outer Card */}
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-xl border border-slate-200 p-10 space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
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
            PAN Card Details
          </h2>
        </div>

        <p className="text-sm text-slate-600 -mt-2">
          Upload a clear copy of your PAN card
        </p>

        {/* PAN Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={details.panNumber || ""}
            onChange={(e) =>
              setDetails({ ...details, panNumber: e.target.value.toUpperCase() })
            }
            placeholder="ABCDE1234F"
            className="w-full rounded-2xl border border-slate-300 bg-gray-50 px-4 py-3 
              text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 
              focus:ring-blue-200 outline-none transition"
          />
        </div>

        {/* Upload Box */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Upload PAN Card <span className="text-red-500">*</span>
          </label>

          <label
            className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
              bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-10 text-center"
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={handlePanChange}
            />

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-full inline-flex items-center justify-center mb-3">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
              </div>

              {files.pan ? (
                <span className="text-blue-600 font-medium break-all">
                  {files.pan.name}
                </span>
              ) : (
                <>
                  <span className="font-medium text-slate-700">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-slate-500">
                    JPEG, PNG or PDF (Max 5MB)
                  </span>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            className="mt-3 max-h-56 w-full rounded-xl border object-contain shadow"
          />
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-xl text-sm text-red-700">
            {error}
            <div className="mt-1 text-slate-600">Attempts Used: {attempts}/5</div>
          </div>
        )}

        {/* Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm">
          <span className="font-semibold text-blue-700">Note: </span>
          <span className="text-slate-700">
            Ensure that all details on the PAN card are clearly visible and match the
            information you provided.
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.push("/kyc/basic-details")}
            className="px-6 py-2.5 rounded-xl border border-slate-300 bg-white 
              text-slate-700 hover:bg-slate-50 transition shadow"
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canNext}
            className={`px-10 py-3 rounded-xl font-semibold shadow transition 
              ${
                canNext
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Verifying..." : "Continue →"}
          </button>
        </div>
      </div>
    </main>
  );
}
