import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { whatsappNumber, phoneNumber } from '../../data/carsData';

const ContactSection = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.errors.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('contact.errors.emailInvalid');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const whatsappMessage = `${t('contact.whatsappPrefix')}
${t('contact.whatsappName')}: ${formData.name}
${t('contact.whatsappEmail')}: ${formData.email}
${t('contact.whatsappMessage')}: ${formData.message}`;

    try {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      setFormData({ name: '', email: '', message: '' });
      toast.success(t('contact.toastSuccess'), {
        description: t('contact.toastSuccessDesc'),
        duration: 4000,
      });
    } catch (error) {
      toast.error(t('contact.toastError'), {
        description: t('contact.toastErrorDesc'),
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
          >
            {t('contact.title')}{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              {t('contact.titleHighlight')}
            </span>
          </motion.h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Two‑column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column – Contact information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{t('contact.info.title')}</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.address')}</p>
                    <p className="text-gray-500 text-sm">{t('contact.info.addressDetail')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.phone')}</p>
                    <a href={`tel:${phoneNumber}`} className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                      {phoneNumber}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.whatsapp')}</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 text-sm hover:text-orange-500 transition-colors"
                    >
                      +212 {whatsappNumber}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <Clock className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{t('contact.info.hours')}</p>
                    <p className="text-gray-500 text-sm">{t('contact.info.hoursWeek')}</p>
                    <p className="text-gray-500 text-sm">{t('contact.info.hoursSunday')}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <h4 className="font-semibold text-gray-800">{t('contact.info.emailTitle')}</h4>
                  </div>
                  <a
                    href="mailto:contact@kriagadir.com"
                    className="text-gray-600 text-sm hover:text-orange-500 transition-colors"
                  >
                    contact@kriagadir.com
                  </a>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      ✓ {t('contact.info.emailResponse')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right column – Contact form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6 md:p-8">
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('contact.form.title')}</h3>
                  <p className="text-gray-500 text-sm mb-6">
                    {t('contact.form.subtitle')}
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="name" className="text-gray-700">{t('contact.form.nameLabel')} *</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={t('contact.form.namePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`mt-1.5 border-gray-200 focus:border-orange-300 focus:ring-orange-200 ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="email" className="text-gray-700">{t('contact.form.emailLabel')} *</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`mt-1.5 border-gray-200 focus:border-orange-300 focus:ring-orange-200 ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Label htmlFor="message" className="text-gray-700">{t('contact.form.messageLabel')} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`mt-1.5 border-gray-200 focus:border-orange-300 focus:ring-orange-200 resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-md transition-all duration-200"
                    >
                      {isLoading ? (
                        <>{t('contact.form.sending')}</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('contact.form.submitButton')}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <motion.p variants={itemVariants} className="text-xs text-gray-400 text-center mt-6">
                  {t('contact.form.footerNote')}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;