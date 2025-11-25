import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KYC Portal",
  description: "Secure Bank KYC Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen 
          bg-white 
          antialiased 
          text-slate-900 
          overflow-x-hidden
        "
      >
        <div className="w-full min-h-screen">{children}</div>
      </body>
    </html>
  );
}
