import React from "react";

const StepIndicator = ({ step }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center">
        {[1, 2, 3].map((stepNum, idx) => (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  step >= stepNum
                    ? "bg-orange-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`text-xs sm:text-sm font-medium mt-2 whitespace-nowrap ${
                  step >= stepNum ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {stepNum === 1 && "Véhicule & dates"}
                {stepNum === 2 && "Vos informations"}
                {stepNum === 3 && "Confirmation"}
              </span>
            </div>
            {idx < 2 && (
              <div className="flex-1 mx-2">
                <div
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    step > stepNum ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;