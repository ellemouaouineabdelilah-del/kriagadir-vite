import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car, Phone, MessageCircle, Users, Fuel, Gauge } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { vehicles, whatsappNumber, phoneNumber } from '../../data/carsData';

const FleetSection = ({ setSelectedCar, setShowModal }) => {
  const { t } = useTranslation();

  const handleWhatsApp = (car) => {
    const message = t('fleet.whatsappMessage', { name: car.name, price: car.priceText });
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section id="fleet" className="w-full py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            {t('fleet.title')}{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              {t('fleet.titleHighlight')}
            </span>
          </motion.h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-5 rounded-full" />
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-base">
            {t('fleet.subtitle')}
          </p>
        </div>

        {/* Car grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.slice(0, 6).map((car, index) => (
            <motion.div
              key={car.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 border-0">
                <CardHeader className="p-0">
                  <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-500/90 hover:bg-orange-600 text-white border-0 rounded-full px-3 py-1 text-xs font-medium shadow-sm">
                      {car.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-orange-600 font-semibold text-lg whitespace-nowrap">
                      {car.priceText}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{car.seats} {t('fleet.seats')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-orange-500" />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-orange-500" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0 pb-5 px-5">
                  <Button
                    onClick={() => {
                      setSelectedCar(car);
                      setShowModal(true);
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-sm transition-all duration-200 border-0"
                  >
                    <Car className="w-4 h-4 mr-2" />
                    {t('fleet.bookButton')}
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleWhatsApp(car)}
                      className="rounded-full border-0 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 shadow-sm"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCallNow}
                      className="rounded-full border-0 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 shadow-sm"
                      title={t('fleet.callButton')}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View more link */}
        <div className="text-center mt-14">
          <Button
            variant="link"
            className="text-orange-600 hover:text-orange-700 no-underline font-medium"
            onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('fleet.viewMore')}
            <span className="ml-1 transition-transform group-hover:translate-x-1 inline-block">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;