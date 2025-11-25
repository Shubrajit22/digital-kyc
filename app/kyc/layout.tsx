import { KycProvider } from "./KycContext";

export default function KycLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KycProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 
      px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        <div className="max-w-4xl mx-auto">

          {/* HEADER */}
          <header className="mb-6 sm:mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
              Customer KYC
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto sm:mx-0">
              Secure, bank-grade verification. Your details are protected with
              industry-standard encryption.
            </p>
          </header>

          {/* PAGE CONTENT */}
          <div className="w-full">{children}</div>

        </div>
      </div>
    </KycProvider>
  );
}
