"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface BasicDetails {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  dob?: string;
  panNumber?: string;
  aadhaarNumber?: string;   
}

type KycFiles = {
  pan?: File | null;
  aadhaarFront?: File | null;
  aadhaarBack?: File | null;
  photo?: File | null;
  signature?: File | null;
};

type KycContextType = {
  stepCompleted: number;
  setStepCompleted: (n: number) => void;
  details: BasicDetails;
  setDetails: (d: BasicDetails) => void;
  files: KycFiles;
  setFiles: (f: KycFiles) => void;

  // NEW
  attempts: number;
  increaseAttempt: () => void;
  resetAttempts: () => void;
};

const KycContext = createContext<KycContextType | null>(null);

export function KycProvider({ children }: { children: React.ReactNode }) {
  const [stepCompleted, setStepCompleted] = useState(0);
  const [details, setDetails] = useState<BasicDetails>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [files, setFiles] = useState<KycFiles>({});

  // NEW STATE
  const [attempts, setAttempts] = useState(0);

  // Load stored attempts from localStorage (if exists)
  useEffect(() => {
    const saved = localStorage.getItem("kyc_attempts");
    if (saved) setAttempts(Number(saved));
  }, []);

  // Increase attempt count by 1
  const increaseAttempt = () => {
    const newCount = attempts + 1;
    setAttempts(newCount);
    localStorage.setItem("kyc_attempts", newCount.toString());
  };

  // Reset attempts back to 0
  const resetAttempts = () => {
    setAttempts(0);
    localStorage.setItem("kyc_attempts", "0");
  };

  return (
    <KycContext.Provider
      value={{
        stepCompleted,
        setStepCompleted,
        details,
        setDetails,
        files,
        setFiles,

        // NEW
        attempts,
        increaseAttempt,
        resetAttempts,
      }}
    >
      {children}
    </KycContext.Provider>
  );
}

export function useKyc() {
  const ctx = useContext(KycContext);
  if (!ctx) {
    throw new Error("useKyc must be used within KycProvider");
  }
  return ctx;
}
