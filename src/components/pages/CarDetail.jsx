import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Users, Fuel, Gauge, CheckCircle, MapPin, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { vehicles } from "../../data/carsData";
import { useTranslation } from "react-i18next";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const car = vehicles.find((v) => v.id === parseInt(id));
const location = useLocation();
  const { startDate: initialStart, endDate: initialEnd } = location.state || {};
  const [startDate, setStartDate] = useState(initialStart ? new Date(initialStart) : null);
  const [endDate, setEndDate] = useState(initialEnd ? new Date(initialEnd) : null);
  // Date states
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

  // Multi‑image support
  const images = car?.images ? car.images : [car?.image];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Véhicule non trouvé</p>
      </div>
    );
  }

  // Calculate days and total
  const days = startDate && endDate
    ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    : 0;
  const totalEstimate = car.price * days;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleReserve = () => {
    // Prepare car object for reservation
    const carForReservation = {
      id: car.id,
      name: car.name,
      pricePerDay: car.price,
      priceText: car.priceText,
      caution: car.caution || 500,
      type: car.type,
      seats: car.seats,
      fuel: car.fuel,
      transmission: car.transmission,
      image: car.image,
    };
    navigate("/reservation", {
      state: {
        selectedCar: carForReservation,
        initialStep: 2,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        days: days,
        totalEstimate: totalEstimate,
      },
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-orange-500"
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Retour
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video">
              <img
                src={images[currentImageIndex]}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      idx === currentImageIndex ? "border-orange-500" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                  <Badge className="mt-2 bg-orange-500 text-white">{car.type}</Badge>
                </div>
                <p className="text-orange-600 font-bold text-2xl">{car.priceText}</p>
              </div>
              <p className="text-gray-500 mt-4">
                {car.description || t('bookingModal.description')}
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5 text-orange-500" />
                <span>{car.seats} {t('bookingModal.seats')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Fuel className="w-5 h-5 text-orange-500" />
                <span>{car.fuel}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Gauge className="w-5 h-5 text-orange-500" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{t('bookingModal.insurance')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5 text-orange-500" />
                <span>{t('bookingModal.unlimitedMileage')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>{t('bookingModal.delivery')}</span>
              </div>
            </div>

            {/* Date picker section (same as Step1) */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Dates de location</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label>Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={{ before: new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Label>Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={{ before: startDate || new Date() }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {days > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-right text-sm text-gray-600 mt-3 bg-orange-50 p-2 rounded-lg"
                >
                  {days} jour(s) → Total estimé :{" "}
                  <span className="font-bold text-orange-600">{totalEstimate}€</span>
                </motion.p>
              )}
            </div>

            {/* Reserve button */}
            <Button
              onClick={handleReserve}
              disabled={!startDate || !endDate}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6 text-lg"
            >
              Réserver maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;