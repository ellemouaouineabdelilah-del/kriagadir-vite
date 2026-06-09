import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950">
      {/* Warm orange abstract background pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="orangeGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#f97316" strokeWidth="0.8" strokeOpacity="0.6" />
              <circle cx="40" cy="40" r="1.5" fill="#f97316" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#orangeGrid)" />
        </svg>
      </div>

      {/* Large blurred orange circle for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-400/15 dark:bg-orange-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Minimalist car icon - orange accent */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl" />
            <Car className="relative w-24 h-24 text-orange-500 drop-shadow-md" strokeWidth={1.5} />
          </div>
        </motion.div> */}

        {/* 404 number with strong orange gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              4
            </span>
            <span className="text-gray-300 dark:text-gray-800">0</span>
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              4
            </span>
          </h1>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" />
        </motion.div>

        {/* Title and description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-md mt-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
            {t('notFound.title', "Page introuvable")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-base">
            {t('notFound.description', "La page que vous cherchez n'existe pas ou a été déplacée.")}
          </p>
        </motion.div>

        {/* Action buttons - orange primary, rounded */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Button
            onClick={() => navigate('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-7 py-2.5 rounded-full"
          >
            <Home className="w-4 h-4 mr-2" />
            {t('notFound.home', "Accueil")}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-orange-300 rounded-full px-7 py-2.5 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('notFound.back', "Retour")}
          </Button>
        </motion.div>

        {/* Footer text */}
        <p className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-600">
          {t('notFound.footer', "© 2025 Kriagadir – Location de voitures premium")}
        </p>
      </div>
    </div>
  );
};

export default NotFound;