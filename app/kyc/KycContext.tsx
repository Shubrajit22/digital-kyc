"use client";

import { createContext, useContext, useState } from "react";

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

  return (
    <KycContext.Provider
      value={{ stepCompleted, setStepCompleted, details, setDetails, files, setFiles }}
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
