import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Award,
  Users,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Car,
  ThumbsUp,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Car, value: "150+", label: t("about.vehicles") },
    { icon: Users, value: "5000+", label: t("about.customers") },
    { icon: Clock, value: "24/7", label: t("about.support") },
    { icon: Award, value: "4.9", label: t("about.rating") },
  ];

  const values = [
    {
      icon: Shield,
      title: t("about.reliability"),
      description: t("about.reliabilityDesc"),
    },
    {
      icon: ThumbsUp,
      title: t("about.quality"),
      description: t("about.qualityDesc"),
    },
    {
      icon: Heart,
      title: t("about.passion"),
      description: t("about.passionDesc"),
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("about.title")}{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Kriagadir
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full mb-6" />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("about.whoWeAre")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {t("about.description1")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t("about.description2")}
            </p>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300">
                {t("about.location")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/about-hero.jpg"
                alt="About Kriagadir"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ac7?w=800&h=500&fit=crop";
                }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-xl shadow-lg">
              <Car className="w-8 h-8" />
            </div>
          </motion.div>
        </div>

        {/* Values section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 dark:text-white mb-10">
            {t("about.ourValues")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {t("about.ready")}
          </h2>
          <p className="text-orange-100 mb-6 max-w-md mx-auto">
            {t("about.readyDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/reservation")}
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg"
            >
              {t("about.reserveNow")}
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/contact")}
              className="border-white text-black hover:bg-white/10 hover:text-white"
            >
              {t("about.contactUs")}
            </Button>
          </div>
        </motion.div>

        {/* Contact info footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {t("about.address")}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +212 600 144 245
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@kriagadir.ma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;