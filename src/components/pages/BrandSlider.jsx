import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { t } from 'i18next';

const brands = [
  { name: 'ALFA ROMEO', image: '/brands/alfa-romeo-logo.png' },
  { name: 'Audi', image: '/brands/audi-logo.png' },
  { name: 'BMW', image: '/brands/bmw-logo.png' },
  { name: 'BMW M', image: '/brands/bmw-m-logo.png' },
  { name: 'FORD', image: '/brands/ford-logo.png' },
  { name: 'HONDA', image: '/brands/honda-logo.png' },
  { name: 'JEEP', image: '/brands/jeep-logo.png' },
  { name: 'LAMBORGHINI', image: '/brands/lamborghini-logo.png' },
  { name: 'LEXUS', image: '/brands/lexus-logo.png' },
  { name: 'MASERATI', image: '/brands/maserati-logo.png' },
  { name: 'MERCEDES BENZ', image: '/brands/mercedes-benz-logo.png' },
  { name: 'NISSAN', image: '/brands/nissan-logo.png' },
  { name: 'PORSCHE', image: '/brands/porsche-logo.png' },
  { name: 'SUBARU', image: '/brands/subaru-logo.png' },
  { name: 'CITROEN', image: '/brands/citroen-logo.png' },
  { name: 'TESLA', image: '/brands/tesla-logo.png' }
];

const BrandSlider = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Triple array for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands, ...brands];

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: 80,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-light tracking-wide text-gray-800"
        >
          {t('brandsTitle')}
        </motion.h2>
        <div className="w-20 h-px bg-orange-500 mx-auto mt-3" />
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* Gradient fades (white to transparent) */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-12 md:gap-16 w-max items-center"
          animate={controls}
          initial={{ x: '0%' }}
        >
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer flex items-center justify-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-8 md:h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSlider;