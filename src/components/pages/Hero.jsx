import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { whatsappNumber } from "../../data/carsData";
import { useNavigate } from "react-router-dom";


function Hero() {
  const { t, i18n  } = useTranslation();
  const navigate = useNavigate();
   const currentLang = i18n.language;
  const [selectedCity, setSelectedCity] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [activeTab, setActiveTab] = useState("short");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Dynamic spacing based on language
  const topPadding = currentLang === 'ar' ? 'pt-36' : 'pt-24';
  const gapBetween = 
    currentLang === 'en' ? 'gap-12' :
    currentLang === 'fr' ? 'gap-6' : 'gap-16';

  const cities = [
    "casablanca",
    "marrakech",
    "tangier",
    "rabat",
    "agadir",
    "fes",
  ];
  const tabs = [
    { key: "short", label: t("shortTerm") },
    { key: "long", label: t("longTerm") },
    { key: "exclusive", label: t("exclusive") },
  ];

  // const handleSearch = () => {
  //   const pickup = pickupDate ? format(pickupDate, "PPP") : "?";
  //   const dropoff = dropoffDate ? format(dropoffDate, "PPP") : "?";
  //   const message = t("whatsappMessage", {
  //     city: selectedCity ? t(`cities.${selectedCity}`) : t("cityNotSelected"),
  //     duration: `${pickup} → ${dropoff}`,
  //   });
  //   window.open(
  //     `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
  //     "_blank",
  //   );
  // };

  useEffect(() => {
    const img = new Image();
    img.src = "/hero-bg.webp";
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleSearch = () => {
    // Basic validation: both dates must be selected
    if (!pickupDate || !dropoffDate) {
      // Optionally show a toast or alert
      alert(t("pleaseSelectDates"));
      return;
    }

    // Navigate to the cars page with search parameters
    navigate("/cars", {
      state: {
        city: selectedCity,
        pickupDate: pickupDate.toISOString(),
        dropoffDate: dropoffDate.toISOString(),
        activeTab,      // you can use this later to filter car categories
      },
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: imageLoaded ? "url('/hero-bg.webp')" : "none",
        backgroundColor: "#1a1a1a",
      }}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse" />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
      />

      <div className={`relative z-10 flex flex-col justify-between h-full min-h-[92vh] ${topPadding} pb-12 md:pb-16`}>
        {/* Container – same max-w + padding as Navbar */}
        <div className={`flex flex-col ${gapBetween} mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight drop-shadow-2xl">
              {t("heroTitle")}
            </h1>
            <p className="text-white/80 text-base md:text-lg mt-4 max-w-lg">
              {t("heroSubtitle") ||
                "Explore Morocco with our premium fleet – from Casablanca to Marrakech."}
            </p>

            <div className="mt-6">
              <Button
                variant="ghost"
                className="group relative overflow-hidden rounded-full bg-white/10 backdrop-blur-md px-6 py-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl focus:outline-none focus:ring-0"
                onClick={() =>
                  document
                    .getElementById("fleet")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("moreInfo")}
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                    className="inline-flex"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.span>
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Tabs */}
            <div className="flex gap-4 md:gap-8 mb-4 px-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-sm pb-2 border-b-2 transition-all duration-300 whitespace-nowrap font-medium ${
                    activeTab === tab.key
                      ? "text-white border-orange-500"
                      : "text-white/50 border-transparent hover:text-white/80 hover:border-white/30"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200/50">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="border-0 shadow-none p-0 h-auto text-gray-700 bg-transparent focus:ring-0 text-sm">
                      <SelectValue placeholder={t("yourDestination")} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {t(
                            `cities.${city}`,
                            city.charAt(0).toUpperCase() + city.slice(1),
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200/50">
                  <CalendarIcon className="w-4 h-4 text-gray-500 shrink-0" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal text-gray-700 hover:bg-transparent p-0 h-auto text-sm"
                      >
                        {pickupDate
                          ? format(pickupDate, "PPP")
                          : t("pickupDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b md:border-b-0 border-gray-200/50">
                  <CalendarIcon className="w-4 h-4 text-gray-500 shrink-0" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal text-gray-700 hover:bg-transparent p-0 h-auto text-sm"
                      >
                        {dropoffDate
                          ? format(dropoffDate, "PPP")
                          : t("dropoffDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dropoffDate}
                        onSelect={setDropoffDate}
                        initialFocus
                        disabled={(date) =>
                          pickupDate ? date < pickupDate : date < new Date()
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    onClick={handleSearch}
                    className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold px-8 py-6 rounded-none md:rounded-r-2xl h-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0 border-0"
                  >
                    {t("findCar")}
                    <Search className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
