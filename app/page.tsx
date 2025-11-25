"use client";

import {
  Shield,
  FileText,
  CreditCard,
  Camera,
  PenTool,
  CheckCircle,
  Lock,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const onStart = () => router.push("/kyc/basic-details");

  const documents = [
    {
      icon: CreditCard,
      title: "PAN Card",
      description: "Permanent Account Number issued by Income Tax Department",
      details: [
        "Clear, unobstructed image",
        "All corners visible",
        "JPEG/PNG/PDF (Max 5MB)",
      ],
    },
    {
      icon: FileText,
      title: "Aadhaar Card",
      description: "Government issued Aadhaar card (Front & Back)",
      details: [
        "Both sides required",
        "Clear and readable",
        "JPEG/PNG/PDF (Max 5MB each)",
      ],
    },
    {
      icon: Camera,
      title: "Photograph",
      description: "Recent passport-size photograph",
      details: ["White background", "Face clearly visible", "JPEG/PNG (Max 2MB)"],
    },
    {
      icon: PenTool,
      title: "Signature",
      description: "Your signature on white paper",
      details: ["Clear signature", "Black/blue ink preferred", "JPEG/PNG (Max 1MB)"],
    },
  ];

  const features = [
    { icon: Lock, text: "Bank Grade Encryption" },
    { icon: Clock, text: "Quick 5-Min Process" },
    { icon: Shield, text: "RBI Compliant" },
    { icon: Award, text: "ISO 27001 Certified" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>1800-XXX-XXXX</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span>kyc@HDFCbank.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 text-green-400" />
              <span>HDFC Connection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900 text-2xl">HDFCBank</h1>
                <p className="text-xs text-gray-600">India's Most Trusted Bank</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button className="text-sm text-gray-700 hover:text-blue-900 transition-colors">
                Help & Support
              </button>
              <button className="text-sm text-gray-700 hover:text-blue-900 transition-colors">
                Track Application
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-sm">100% HDFC & Confidential</span>
            </div>

            <h1 className="text-blue-900 mb-4 text-3xl sm:text-4xl lg:text-5xl">
              Complete Your KYC
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
              As per RBI guidelines, KYC verification is mandatory to access banking
              services. Complete your verification online in just 5 minutes.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Info Banner */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <h3 className="text-amber-900 mb-2">Important Information</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Please ensure you have all the required documents ready before
                  starting. All information should match across documents.
                </p>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-blue-900 mb-2 text-2xl sm:text-3xl">
                Documents Required
              </h2>
              <p className="text-gray-600">
                Please keep the following documents ready in digital format
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {documents.map((doc, index) => {
                const Icon = doc.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-blue-900 mb-2">{doc.title}</h3>
                        <p className="text-gray-600 text-sm">{doc.description}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-2">Requirements:</p>
                      <ul className="space-y-1">
                        {doc.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Steps */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 sm:p-10 mb-12 text-white">
            <h2 className="text-center mb-8 text-2xl sm:text-3xl">
              Verification Process
            </h2>
            <div className="grid sm:grid-cols-5 gap-4">
              {[
                "Basic Details",
                "PAN Upload",
                "Aadhaar Upload",
                "Photo & Sign",
                "Review",
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{index + 1}</span>
                  </div>
                  <p className="text-sm text-blue-100">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 border-2 border-gray-200">
            <h2 className="text-blue-900 mb-3 text-2xl sm:text-3xl">Ready to Begin?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              The entire process is digital, HDFC, and takes only 5 minutes.
            </p>
            <button
              onClick={onStart}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-10 py-5 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span className="text-lg cursor-pointer">Start KYC Verification</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <p className="text-xs text-gray-500 mt-4">
              By proceeding, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                HDFCBank
              </h3>
              <p className="text-blue-200 text-sm">
                India's most trusted banking partner.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Branch Locator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1800-XXX-XXXX (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@HDFCbank.com</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-blue-200">
            <p>© 2025 HDFCBank. All rights reserved. | Regulated by RBI</p>
            <div className="flex items-center gap-4">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='white'%3E%3Ctext x='2' y='16' font-size='12' font-family='Arial'%3ESSL%3C/text%3E%3C/svg%3E"
                alt="SSL"
                className="opacity-70"
              />
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='white'%3E%3Ctext x='2' y='16' font-size='10' font-family='Arial'%3EISO%3C/text%3E%3C/svg%3E"
                alt="ISO"
                className="opacity-70"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
