import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Car, Phone, Mail, MapPin, Share2, Camera, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { whatsappNumber, phoneNumber } from '../../data/carsData';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: t('footer.company.about'), href: '/about' },
      { label: t('footer.company.vehicles'), href: '/cars' },
      { label: t('footer.company.howItWorks'), href: '#howItWork' },
      { label: t('footer.company.contact'), href: '#contact' },
    ],
    legal: [
      { label: t('footer.legal.terms'), href: '/terms' },
      { label: t('footer.legal.privacy'), href: '/privacy' },
      { label: t('footer.legal.legalNotice'), href: '/legal' },
    ],
  };

  const socialIcons = [
    { icon: Share2, href: '#', label: 'Facebook' },
    { icon: Camera, href: '#', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold italic">Kriagadir</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.brand.description')}
            </p>
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal.title')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">{t('footer.contact.title')}</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <a href={`tel:${phoneNumber}`} className="hover:text-orange-400">{phoneNumber}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <a href="mailto:contact@kriagadir.com" className="hover:text-orange-400">contact@kriagadir.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>{t('footer.contact.address')}</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2">{t('footer.newsletter.title')}</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="bg-gray-800 border-gray-700 text-white text-sm h-9"
                />
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-xs"
        >
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p className="mt-1">
            {t('footer.credit')} | 
            <a href={`https://wa.me/${whatsappNumber}`} className="text-orange-400 hover:underline ml-1">{t('footer.supportWhatsApp')}</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;