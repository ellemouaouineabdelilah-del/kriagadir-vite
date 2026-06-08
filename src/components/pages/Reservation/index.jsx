import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import StepIndicator from "./StepIndicator";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { availableCars } from "./constants";

function Reservation() {
  const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [selectedCar, setSelectedCar] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  const [personalData, setPersonalData] = useState(null);   
  const location = useLocation();
//   const { selectedCar: initialCar, initialStep = 1 } = location.state || {};
//   const [step, setStep] = useState(initialStep);
//   const [selectedCar, setSelectedCar] = useState(initialCar || null);

  const {
    selectedCar: initialCar,
    initialStep = 1,
    startDate: initialStartDate,
    endDate: initialEndDate,
    days: initialDays,
    totalEstimate: initialTotalEstimate,
  } = location.state || {};

  const [step, setStep] = useState(initialStep);
  const [selectedCar, setSelectedCar] = useState(initialCar || null);
  const [startDate, setStartDate] = useState(initialStartDate ? new Date(initialStartDate) : null);
  const [endDate, setEndDate] = useState(initialEndDate ? new Date(initialEndDate) : null);

  const days =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;
  const totalEstimate = selectedCar ? selectedCar.pricePerDay * days : 0;

  const handleNextStep = (data) => {
    setPersonalData(data);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const confirmByEmail = () => {
    alert(`Réservation envoyée par email à ${personalData.email}`);
    navigate("/");
  };

  const confirmByWhatsApp = () => {
    const message = `Bonjour, je souhaite réserver ${selectedCar.name} du ${format(startDate, "dd/MM/yyyy")} au ${format(endDate, "dd/MM/yyyy")}. Total: ${totalEstimate}€. Merci.`;
    const url = `https://wa.me/212XXXXXXXX?text=${encodeURIComponent(message)}`; // Replace with your number
    window.open(url, "_blank");
  };

    useEffect(() => {
    if (initialStep === 2 && initialCar) {
      setStep(2);
    }
  }, [initialStep, initialCar]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1
              availableCars={availableCars}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              days={days}
              totalEstimate={totalEstimate}
              onContinue={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2
              personalData={personalData}
              onNext={handleNextStep}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <Step3
              selectedCar={selectedCar}
              startDate={startDate}
              endDate={endDate}
              days={days}
              totalEstimate={totalEstimate}
              personalData={personalData}
              onBack={handleBack}
              onConfirmEmail={confirmByEmail}
              onConfirmWhatsApp={confirmByWhatsApp}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Reservation;