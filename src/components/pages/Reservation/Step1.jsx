import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Car, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

const ITEMS_PER_PAGE = 4;

const Step1 = ({
  availableCars,
  selectedCar,
  setSelectedCar,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  days,
  totalEstimate,
  onContinue,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cars based on search term (case-insensitive)
  const filteredCars = useMemo(() => {
    if (!searchTerm.trim()) return availableCars;
    return availableCars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableCars, searchTerm]);

  // Calculate total pages based on filtered cars
  const totalPages = Math.max(1, Math.ceil(filteredCars.length / ITEMS_PER_PAGE));

  // Ensure current page is valid when filtered results change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Get cars for current page (only 4 max)
  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredCars.slice(start, end);
  }, [filteredCars, currentPage]);

  // Reset to page 1 when search term changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Choisissez votre véhicule</h2>
            <span className="text-sm text-gray-500">
              {filteredCars.length} véhicule{filteredCars.length > 1 ? "s" : ""} disponible{filteredCars.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Car Grid - always shows at most 4 cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paginatedCars.length > 0 ? (
              paginatedCars.map((car) => (
                <motion.div
                  key={car.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-xl cursor-pointer transition-all overflow-hidden border-2 ${
                    selectedCar?.id === car.id
                      ? "border-orange-500 shadow-lg shadow-orange-500/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                  }`}
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="flex p-4 gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                      <Car className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{car.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Caution: {car.caution}€
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-orange-500 font-bold text-xl">
                            {car.pricePerDay}€
                          </span>
                          <span className="text-sm text-gray-500">/jour</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          {car.pricePerDay > 100 ? "Premium" : "Économique"}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          Manuelle
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedCar?.id === car.id && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Sélectionné
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                Aucun véhicule ne correspond à votre recherche.
              </div>
            )}
          </div>

          {/* Pagination - only shows when filtered cars exceed 4 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Suivant <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Dates section (unchanged) */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Dates de location</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start mt-1 h-11">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
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
                    <Button variant="outline" className="w-full justify-start mt-1 h-11">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-right text-sm text-gray-600 mt-4 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg"
              >
                {days} jour(s) → Total estimé :{" "}
                <span className="font-bold text-orange-600">{totalEstimate}€</span>
              </motion.p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          disabled={!selectedCar || !startDate || !endDate}
          className="bg-orange-500 hover:bg-orange-600 px-8"
        >
          Continuer <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Step1;