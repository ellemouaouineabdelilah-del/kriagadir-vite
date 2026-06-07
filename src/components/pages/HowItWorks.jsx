import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks = () => {
  const { t } = useTranslation();

  // Steps with translation keys
  const steps = [
    {
      number: '01',
      titleKey: 'howItWorks.steps.0.title',
      descKey: 'howItWorks.steps.0.description',
      icon: Search,
    },
    {
      number: '02',
      titleKey: 'howItWorks.steps.1.title',
      descKey: 'howItWorks.steps.1.description',
      icon: Calendar,
    },
    {
      number: '03',
      titleKey: 'howItWorks.steps.2.title',
      descKey: 'howItWorks.steps.2.description',
      icon: MessageCircle,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'backOut' },
    },
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3 h-3" />
              {t('howItWorks.badge')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-4"
          >
            {t('howItWorks.title')}{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              {t('howItWorks.titleHighlight')}
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '5rem' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Timeline steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent -translate-y-1/2 hidden md:block" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} variants={cardVariants} className="relative">
                  {/* Step number with animated circle */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-orange-200">
                      <span className="text-orange-600 font-bold text-lg">{step.number}</span>
                    </div>
                  </div>

                  <Card className="group h-full pt-8 bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                    <CardContent className="p-6 pt-8 flex flex-col items-center text-center">
                      {/* Animated icon background */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative p-4 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-300">
                          <Icon className="w-8 h-8 text-orange-500" />
                        </div>
                      </div>
                      <h3 className="mt-6 text-xl md:text-2xl font-bold text-gray-800">
                        {t(step.titleKey)}
                      </h3>
                      <p className="mt-3 text-gray-500 text-sm md:text-base leading-relaxed">
                        {t(step.descKey)}
                      </p>
                      {/* Decorative underline on hover */}
                      <div className="mt-4 w-12 h-0.5 bg-orange-300 rounded-full group-hover:w-16 transition-all duration-300" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Animated extra CTA (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            {t('howItWorks.footer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;