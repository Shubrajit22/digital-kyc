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

  const progress = ((current - 1) / (steps.length - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-visible">

        {/* PROGRESS LINE */}
        <div
          className="
            absolute 
            left-6 right-6 
            top-[46px] 
            sm:top-[48px] 
            h-[3px] sm:h-[4px] 
            bg-gray-200 
            rounded-full 
            overflow-hidden
          "
        >
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* STEP CIRCLES */}
        <div className="flex justify-between items-start sm:items-center relative z-10 pt-4 sm:pt-0">

          {steps.map((step) => {
            const isCompleted = step.id < current;
            const isCurrent = step.id === current;

            return (
              <div key={step.id} className="flex flex-col items-center w-[20%] text-center">
                
                {/* CIRCLE */}
                {isCompleted ? (
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : isCurrent ? (
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-blue-600 relative flex items-center justify-center shadow-md">
                    <div className="absolute -inset-1 rounded-full border-[4px] sm:border-[6px] border-blue-300 opacity-50"></div>
                    <span className="text-white text-sm sm:text-base font-bold">{step.id}</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
                    <span className="text-gray-600 text-sm sm:text-base font-semibold">{step.id}</span>
                  </div>
                )}

                {/* LABEL */}
                <p
                  className={`mt-2 text-xs sm:text-sm font-medium break-words leading-tight px-1
                    ${isCompleted || isCurrent ? "text-blue-700" : "text-slate-500"}
                  `}
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
