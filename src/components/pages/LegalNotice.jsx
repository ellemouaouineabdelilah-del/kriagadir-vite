import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Building, Globe, Phone, Mail, User, FileCheck, Server, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LegalNotice = () => {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sections = [
    { icon: Building, title: 'editor', key: 'Éditeur du site' },
    { icon: User, title: 'director', key: 'Directeur de publication' },
    { icon: Server, title: 'hosting', key: 'Hébergement' },
    { icon: Phone, title: 'contact', key: 'Contact' },
    { icon: Scale, title: 'compliance', key: 'Conformité' },
    { icon: FileCheck, title: 'copyright', key: 'Propriété intellectuelle' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-5 shadow-inner">
            <FileCheck className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('legal.title', 'Mentions légales')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full" />
        </motion.div>

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
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        {t(`legal.${section.title}.title`, section.key)}
                      </h2>
                      <div className="text-gray-600 dark:text-gray-300 space-y-1">
                        {section.title === 'editor' && (
                          <>
                            <p>{t('legal.editor.text', 'Kriagadir – SARL au capital de 100 000 MAD')}</p>
                            <p>{t('legal.editor.address', 'Siège social : 123, Avenue Mohammed V, Agadir, Maroc')}</p>
                            <p>{t('legal.editor.rc', 'RC : 123456 – Patente : 987654321')}</p>
                          </>
                        )}
                        {section.title === 'director' && (
                          <p>{t('legal.director.name', 'Karim Benjelloun, gérant de Kriagadir')}</p>
                        )}
                        {section.title === 'hosting' && (
                          <p>{t('legal.hosting.text', 'Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis')}</p>
                        )}
                        {section.title === 'contact' && (
                          <div className="space-y-2">
                            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@kriagadir.ma</p>
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +212 600 144 245</p>
                          </div>
                        )}
                        {section.title === 'compliance' && (
                          <p>{t('legal.compliance.text', 'Ce site respecte la loi n° 09-08 relative à la protection des données personnelles au Maroc. Aucune déclaration à la CNDP n’est requise pour ce traitement simple.')}</p>
                        )}
                        {section.title === 'copyright' && (
                          <p>{t('legal.copyright.text', 'L’ensemble du contenu (textes, images, logos) est la propriété exclusive de Kriagadir. Toute reproduction est interdite sans autorisation préalable.')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8">
                <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p>
                    {t('legal.jurisdiction', 'Droit applicable : Droit marocain. Tribunal compétent : Agadir.')}
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

export default LegalNotice;