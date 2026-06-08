import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Calendar, MapPin, Fuel, Users, Gauge } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vehicles } from '../../data/carsData'; // your existing car data

const CarsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state || {};
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    // Filter cars based on availability (you can add real availability logic later)
    // For now, show all cars that match the date range (demo)
    const { pickupDate, dropoffDate } = searchParams;
    if (pickupDate && dropoffDate) {
      // You could check car calendars here – for demonstration we show all cars
      setFilteredCars(vehicles);
    } else {
      setFilteredCars(vehicles);
    }
  }, [searchParams]);

  const handleReserve = (car) => {
    // Navigate to car detail or directly to reservation with car and dates
    navigate(`/car/${car.id}`, {
      state: {
        selectedCar: car,
        startDate: searchParams.pickupDate,
        endDate: searchParams.dropoffDate,
        city: searchParams.city,
      },
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search summary header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Véhicules disponibles</h1>
          {searchParams.pickupDate && searchParams.dropoffDate && (
            <p className="text-gray-600 mt-2">
              Du {format(new Date(searchParams.pickupDate), 'dd/MM/yyyy')} au{' '}
              {format(new Date(searchParams.dropoffDate), 'dd/MM/yyyy')}
              {searchParams.city && ` – ${searchParams.city}`}
            </p>
          )}
        </div>

        {/* Results grid */}
        {filteredCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun véhicule trouvé pour ces critères.</p>
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="mt-2 text-orange-500"
            >
              Modifier la recherche
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      {car.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="text-orange-600 font-semibold">{car.priceText}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {car.seats}
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" /> {car.fuel}
                      </div>
                      <div className="flex items-center gap-1">
                        <Gauge className="w-4 h-4" /> {car.transmission}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => handleReserve(car)}
                      className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                      <Car className="w-4 h-4 mr-2" /> Réserver
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;