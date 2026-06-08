import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const fullWidthDropdownVariants = {
  closed: { opacity: 0, y: -20, height: 0 },
  open: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.4, ease: "easeOut" } }
};

const DesktopDropdown = React.forwardRef(({ isOpen, navLinks, onClose }, ref) => {
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon className="w-6 h-6 text-orange-400" /> : null;
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          variants={fullWidthDropdownVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="absolute left-0 right-0 top-16 backdrop-blur-lg shadow-2xl z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {navLinks.map(({ label, action, icon: iconName, description }) => (
                <motion.button
                  key={label}
                  onClick={() => {
                    action();
                    onClose();
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left group"
                >
                  <div className="p-3 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                    {getIcon(iconName)}
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">{label}</div>
                    <div className="text-xs text-white/50">{description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white/40 text-xs">© 2025 Kriagadir - Premium Car Rental</div>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms</a>
                <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy</a>
                <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default DesktopDropdown;