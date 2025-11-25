import { KycProvider } from "./KycContext";

export default function KycLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <KycProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Customer KYC
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Secure, bank-grade verification. Your details are protected with
              industry-standard encryption.
            </p>
          </header>
          {children}
        </div>
      </div>
    </KycProvider>
  );
}
