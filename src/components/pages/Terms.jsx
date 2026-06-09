import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, FileText, Scale, Clock, CreditCard, XCircle, Car, Gavel } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sections = [
    { icon: Scale, title: 'article1', key: '1. Objet' },
    { icon: FileText, title: 'article2', key: '2. Réservation et confirmation' },
    { icon: CreditCard, title: 'article3', key: '3. Prix et paiement' },
    { icon: XCircle, title: 'article4', key: '4. Annulation' },
    { icon: Car, title: 'article5', key: '5. Responsabilité' },
    { icon: Gavel, title: 'article6', key: '6. Litiges' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-5 shadow-inner">
            <FileText className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('terms.title', 'Conditions générales')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {t('terms.lastUpdated', 'Dernière mise à jour : 1er janvier 2025')}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`p-6 md:p-8 ${idx !== sections.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <section.icon className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        {t(`terms.${section.title}.title`, section.key)}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t(`terms.${section.title}.text`, '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact footer */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8">
                <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p>
                    {t('terms.contact', 'Pour toute question, contactez-nous à contact@kriagadir.ma ou au +212 600 144 245.')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;