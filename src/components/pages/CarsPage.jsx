import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Car, Users, Fuel, Gauge, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// shadcn components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Your car data
import { vehicles } from '../../data/carsData';

const CarsPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};

  const [filteredCars, setFilteredCars] = useState(vehicles);
  const [showFilters, setShowFilters] = useState(false);

  // React Hook Form (without shadcn Form wrapper)
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      searchTerm: '',
      priceMin: 0,
      priceMax: 3000,
    },
  });

  const searchTerm = watch('searchTerm');
  const priceMin = watch('priceMin');
  const priceMax = watch('priceMax');

  const allPrices = vehicles.map(car => car.price);
  const globalMinPrice = Math.min(...allPrices);
  const globalMaxPrice = Math.max(...allPrices);

  // Update filter when watched values change
  useEffect(() => {
    let results = vehicles;

    if (searchTerm && searchTerm.trim()) {
      results = results.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    results = results.filter(
      car => car.price >= priceMin && car.price <= priceMax
    );

    setFilteredCars(results);
  }, [searchTerm, priceMin, priceMax]);

  const handlePriceChange = (value) => {
    setValue('priceMin', value[0]);
    setValue('priceMax', value[1]);
  };

  const resetFilters = () => {
    setValue('searchTerm', '');
    setValue('priceMin', globalMinPrice);
    setValue('priceMax', globalMaxPrice);
  };

  const handleViewCar = (car) => {
    navigate(`/car/${car.id}`, {
      state: {
        selectedCar: car,
        startDate: searchParams.pickupDate,
        endDate: searchParams.dropoffDate,
        city: searchParams.city,
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t('carsPage.title', 'Nos véhicules')}
          </h1>
          {searchParams.pickupDate && searchParams.dropoffDate && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {t('carsPage.availability', 'Disponibles du')}{' '}
              {format(new Date(searchParams.pickupDate), 'dd MMM yyyy', { locale: fr })} au{' '}
              {format(new Date(searchParams.dropoffDate), 'dd MMM yyyy', { locale: fr })}
            </p>
          )}
        </div>

        {/* Search and Filter Bar - using plain HTML form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('carsPage.searchPlaceholder', 'Rechercher un véhicule...')}
                  {...register('searchTerm')}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Price filter (desktop) */}
            <div className="hidden md:flex items-center  flex-1">
              <div className="w-full">
                <div className="flex justify-center gap-4 text-sm text-oran-600 dark:text-gray-400 mb-1">
                  <span>{t('carsPage.priceRange', 'Prix par jour')}</span>
                <Slider
                  value={[priceMin, priceMax]}
                  onValueChange={handlePriceChange}
                  min={globalMinPrice}
                  max={globalMaxPrice}
                  step={100}
                  className="w-1/2 p-0 m-0"
                />
                  <span>{priceMin}€ - {priceMax}€</span>
                </div>
              </div>
            </div>

            {/* Toggle filters button (mobile) */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? t('carsPage.hideFilters', 'Masquer') : t('carsPage.showFilters', 'Filtres')}
            </Button>

            {/* Reset button */}
            <Button
              type="button"
              variant="ghost"
              onClick={resetFilters}
              className="text-orange-500 hover:text-orange-600"
            >
              <X className="h-4 w-4 mr-1" />
              {t('carsPage.reset', 'Réinitialiser')}
            </Button>
          </form>

          {/* Mobile filters (collapsible) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{t('carsPage.priceRange', 'Prix par jour')}</span>
                    <span>{priceMin}€ - {priceMax}€</span>
                  </div>
                  <Slider
                    value={[priceMin, priceMax]}
                    onValueChange={handlePriceChange}
                    min={globalMinPrice}
                    max={globalMaxPrice}
                    step={10}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results counter */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredCars.length} {t('carsPage.vehiclesFound', 'véhicules trouvés')}
          </p>
        </div>

        {/* Cars grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              {t('carsPage.noResults', 'Aucun véhicule ne correspond à vos critères.')}
            </p>
            <Button variant="link" onClick={resetFilters} className="mt-2 text-orange-500">
              {t('carsPage.resetFilters', 'Réinitialiser les filtres')}
            </Button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car) => (
              <motion.div key={car.id} variants={cardVariants}>
                <Card className="group h-full overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 border-0">
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      {car.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {car.name}
                      </h3>
                      <p className="text-orange-600 font-semibold whitespace-nowrap">
                        {car.priceText}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-orange-500" />
                        <span>{car.seats}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4 text-orange-500" />
                        <span>{car.fuel}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-4 h-4 text-orange-500" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => handleViewCar(car)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                    >
                      {t('carsPage.viewDetails', 'Voir détails')}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;