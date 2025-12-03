"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Steps from "../Steps";
import { useKyc } from "../KycContext";

export default function BasicDetailsPage() {
  const router = useRouter();
  const { details, setDetails, setStepCompleted, resetAttempts } = useKyc();

  // const onSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   // NEW: Clean the name to avoid mismatch due to extra spaces
  //   setDetails({
  //     ...details,
  //     fullName: details.fullName?.trim(),
  //   });

  //   // NEW: Start fresh → reset attempts
  //   resetAttempts();

  //   setStepCompleted(1);
  //   router.push("/kyc/pan-upload");
  // };
const onSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Clean name
  const fullName = details.fullName?.trim() || "";

  // 1️⃣ CALL API → check duplicate from DB  
  const res = await fetch(`/api/kyc/check-duplicate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email: details.email,
    }),
  });

  const data = await res.json();

  // 2️⃣ If duplicate → redirect to "KYC Already Exists" page
  if (data.exists) {
    router.push(`/kyc/already-exists?ref=${data.appId}`);
    return;
  }

  // 3️⃣ If not duplicate → save details & continue
  setDetails({
    ...details,
    fullName, // trimmed
  });

  resetAttempts();
  setStepCompleted(1);
  router.push("/kyc/pan-upload");
};

  return (
    <main className="min-h-screen pt-6 pb-12 px-4 sm:px-6 lg:px-0 bg-gradient-to-br from-slate-50 to-blue-50">
      <Steps current={1} />

      <div className="max-w-3xl mx-auto mt-6 bg-white/80 backdrop-blur-xl 
      border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 
      space-y-10 transition-all animate-fadeUp">

        <header className="text-center space-y-3 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Basic Details
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Please enter your personal information exactly as shown on your
            official documents. This ensures smooth and accurate verification.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-8">

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 
              text-sm sm:text-base text-slate-900 shadow-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              value={details.fullName}
              onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
              placeholder="Enter your full legal name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 
                text-sm sm:text-base text-slate-900 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                placeholder="yourname@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mobile Number</label>
              <input
                type="tel"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 
                text-sm sm:text-base text-slate-900 shadow-sm
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                placeholder="10-digit mobile number"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl 
              bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-500 hover:to-blue-600 px-8 py-3 
              text-sm sm:text-base font-semibold text-white 
              shadow-md hover:shadow-xl active:scale-[0.97] 
              transition-all cursor-pointer w-full sm:w-auto"
            >
              Save & Continue →
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
