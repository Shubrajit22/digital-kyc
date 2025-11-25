"use client";

interface StepsProps {
  current: number;
}

export default function Steps({ current }: StepsProps) {
  const steps = [
    { id: 1, label: "Basic Details" },
    { id: 2, label: "PAN Card" },
    { id: 3, label: "Aadhaar Card" },
    { id: 4, label: "Photo & Signature" },
    { id: 5, label: "Review & Submit" },
  ];

  // Percentage fill for blue progress
  const progress = ((current - 1) / (steps.length - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">

        {/* LINE WRAPPER */}
        <div className="absolute inset-x-12 top-[48px] h-[4px] bg-gray-200 rounded-full overflow-hidden">
          {/* Blue dynamic fill */}
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* STEPS */}
        <div className="flex justify-between relative z-10">

          {steps.map((step) => {
            const isCompleted = step.id < current;
            const isCurrent = step.id === current;

            return (
              <div key={step.id} className="flex flex-col items-center">

                {/* CIRCLE */}
                {isCompleted ? (
                  <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isCurrent ? (
                  <div className="w-12 h-12 rounded-full bg-blue-600 relative flex items-center justify-center shadow-md">
                    <div className="absolute -inset-1 rounded-full border-[6px] border-blue-300 opacity-50"></div>
                    <span className="text-white font-bold">{step.id}</span>
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
                    <span className="text-gray-600 font-semibold">{step.id}</span>
                  </div>
                )}

                {/* LABEL */}
                <p
                  className={`mt-2 text-sm font-medium ${
                    isCompleted || isCurrent ? "text-blue-700" : "text-slate-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
