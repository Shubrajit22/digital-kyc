"use client";

import { useRouter } from "next/navigation";
import { CheckBadgeIcon, CameraIcon, DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

export default function LandingPage() {
  const router = useRouter();
 //@ts-ignore
  // Helper component for the requirement checklist item
  const RequirementItem = ({ icon: Icon, text }) => (
    <div className="flex items-center space-x-3">
      <Icon className="w-6 h-6 text-indigo-500 flex-shrink-0" />
      <span className="text-slate-800 font-medium">{text}</span>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      
      {/* NAVBAR */}
      <header className="w-full py-5 px-6 md:px-12 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
          KYCVerify
        </h1>

        {/* Secondary CTA in Navbar (Keep for consistency) */}
       
      </header>

      {/* HERO SECTION - Now includes requirements */}
      <section className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-16 gap-12 md:gap-20">

        {/* LEFT CONTENT */}
        <div className="max-w-lg space-y-7 animate-fadeUp">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Secure, Instant 
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              KYC Verification
            </span>
          </h2>

          <p className="text-slate-700 text-lg md:text-xl">
            Complete your identity verification in **less than 5 minutes**. Have your documents ready for instant processing.
          </p>

          {/* ADDED: REQUIRED DOCUMENTS CHECKLIST */}
          <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200 space-y-3">
            <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">
              Before You Start, Please Have Ready:
            </p>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
              <RequirementItem icon={DocumentTextIcon} text="Aadhar Card (Soft Copy/DigiLocker)" />
              <RequirementItem icon={DocumentTextIcon} text="PAN Card (Soft Copy)" />
              <RequirementItem icon={CameraIcon} text="Live Photograph/Selfie" />
              <RequirementItem icon={PencilSquareIcon} text="Digital Signature" />
            </div>
          </div>
          {/* END: REQUIRED DOCUMENTS CHECKLIST */}

          <div className="pt-4">
            <button
              onClick={() => router.push("/kyc/basic-details")}
              className="px-10 py-4 cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 active:scale-[0.98] transition-all"
            >
              Start Verification Now →
            </button>
          </div>
        </div>

        {/* RIGHT GRAPHIC - Kept mostly same, added more dimension */}
        <div className="relative animate-fadeUp">
          <div className="w-[300px] md:w-[420px] aspect-square rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-slate-200 flex items-center justify-center overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/9503/9503999.png"
              alt="KYC Illustration"
              className="w-52 md:w-72 opacity-90 scale-105"
            />
          </div>

          {/* Floating Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-300 to-indigo-300 blur-3xl opacity-40 -z-10"></div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 px-6 md:px-24 bg-white/60 backdrop-blur-lg border-t border-slate-200">
        <h3 className="text-center text-3xl font-bold text-slate-900 mb-12">
          Why Choose Our Digital KYC?
        </h3>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Feature 1 - Security */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                <CheckBadgeIcon className="w-8 h-8 text-indigo-600" />
              </div>
            </div>

            <h4 className="text-xl font-semibold text-center text-slate-900">Secure & Compliant</h4>
            <p className="text-center text-sm text-slate-600 mt-2">
              All data is processed with AES-256 encryption, meeting all regulatory standards.
            </p>
          </div>

          {/* Feature 2 - Speed */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                {/* Clock icon for speed */}
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-center text-slate-900">Instant Verification</h4>
            <p className="text-center text-sm text-slate-600 mt-2">
              AI-powered checks verify your Aadhar and PAN instantly—no waiting time.
            </p>
          </div>

          {/* Feature 3 - Simplicity */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                {/* Paper document icon for simplicity */}
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-center text-slate-900">Easy to Use</h4>
            <p className="text-center text-sm text-slate-600 mt-2">
              Intuitive mobile and desktop interface designed for maximum ease of upload.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} KYCVerify — Fully Encrypted and Regulatory Compliant.
      </footer>
    </main>
  );
}