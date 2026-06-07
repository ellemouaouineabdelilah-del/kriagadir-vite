import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Car,
  Users,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappNumber, phoneNumber } from '../../data/carsData';

const BookingModal = ({ selectedCar, setSelectedCar, showModal, setShowModal }) => {
  const { t } = useTranslation();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  const handleWhatsAppBooking = () => {
    if (!selectedCar) return;
    const message = t('bookingModal.whatsappMessage', {
      name: selectedCar.name,
      price: selectedCar.priceText,
    });
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    handleClose();
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!selectedCar) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header with image */}
              <div className="relative">
                <div className="h-56 md:h-64 overflow-hidden bg-gray-100">
                  <img
                    src={selectedCar.image}
                    alt={selectedCar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {selectedCar.name}
                    </h2>
                    <p className="text-orange-600 font-semibold text-xl mt-1">
                      {selectedCar.priceText}
                    </p>
                  </div>
                  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                    {selectedCar.type}
                  </div>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{selectedCar.seats} {t('bookingModal.seats')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Fuel className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{selectedCar.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gauge className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{selectedCar.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{t('bookingModal.insurance')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{t('bookingModal.unlimitedMileage')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">{t('bookingModal.delivery')}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 text-gray-500 text-sm">
                  <p>{t('bookingModal.description')}</p>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleWhatsAppBooking}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t('bookingModal.whatsappButton')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCallNow}
                    className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t('bookingModal.callButton')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;