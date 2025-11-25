"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function PanUploadPage() {
  const router = useRouter();
  const { details, setDetails, files, setFiles, setStepCompleted } = useKyc();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------
  // PAN FILE CHANGE HANDLER
  // ------------------------------
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles({ ...files, pan: file });

    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const canNext =
    !!files.pan && details.panNumber && details.panNumber.length >= 10;

  // ------------------------------
  // NEXT BUTTON → VALIDATE PAN VIA BACKEND
  // ------------------------------
  const next = async () => {
    if (!canNext) return;

    setLoading(true);
    setError(null);

    const fd = new FormData();
    fd.append("panFile", files.pan as File);
    fd.append("panNumber", details.panNumber || "");
    fd.append("fullName", details.fullName || "");

    const res = await fetch(`/api/kyc/validate-pan`, {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setLoading(false);

    if (!data.ok) {
      setError(data.message || "PAN validation failed. Please re-upload.");
      return;
    }

    // SUCCESS → Continue
    setStepCompleted(2);
    router.push("/kyc/aadhaar-upload");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EEF4FF] to-white pb-10">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-slate-900">Complete Your KYC</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Secure and Simple Verification Process
        </p>
      </div>

      <Steps current={2} />

      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl p-8 md:p-10 space-y-10">
        {/* SECTION TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white grid place-items-center rounded-xl shadow">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            PAN Card Details
          </h2>
        </div>

        <p className="text-sm text-slate-600 -mt-3">
          Upload a clear copy of your PAN card
        </p>

        {/* PAN NUMBER INPUT */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            PAN Number *
          </label>
          <input
            type="text"
            placeholder="ABCDE1234F"
            value={details.panNumber || ""}
            onChange={(e) =>
              setDetails({ ...details, panNumber: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 
            focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* UPLOAD BOX */}
        <div>
          <label className="text-sm font-medium text-slate-700">
            Upload PAN Card *
          </label>
          <label
            className="block mt-2 w-full rounded-2xl border-2 border-dashed border-blue-300 
            bg-blue-50/40 hover:bg-blue-50 cursor-pointer transition p-10 text-center"
          >
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={onChange}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
              </div>

              {files.pan ? (
                <span className="font-medium text-blue-600">
                  {files.pan.name}
                </span>
              ) : (
                <>
                  <span className="font-semibold text-slate-700">
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

        {/* PREVIEW */}
        {preview && (
          <div className="pt-2">
            <p className="text-xs text-slate-500 mb-1">Preview:</p>
            <img
              src={preview}
              className="max-h-64 rounded-xl border border-slate-200 shadow-md object-contain"
            />
          </div>
        )}

        {/* ERROR BOX */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* NOTE */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 text-sm">
          <span className="font-semibold text-slate-700">Note: </span>
          <span className="text-slate-600">
            Ensure that all details on the PAN card are clearly visible and
            match the information you provided.
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/kyc/basic-details")}
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
              <>Continue →</>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
