import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
};

const MobileMenu = ({ isOpen, navLinks, languages, currentLang, onLanguageChange, onClose }) => {
  const getIcon = (iconName) => {
    const Icon = Icons[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="md:hidden border-t border-white/10 bg-white/60 backdrop-blur-md"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ label, action, icon: iconName }, index) => (
              <motion.button
                key={label}
                onClick={() => {
                  action();
                  onClose();
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-white/80 hover:text-white text-sm py-3.5 px-3 w-full text-left border-b border-white/10 last:border-0 transition-all rounded-lg hover:bg-white/10"
              >
                {getIcon(iconName)}
                {label}
              </motion.button>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 pt-4 pb-1 flex-wrap"
            >
              {languages.map(lang => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    onClose();
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border transition-all
                    ${currentLang.code === lang.code
                      ? 'border-white/60 text-white bg-white/10'
                      : 'border-white/20 text-white/55 hover:border-white/40 hover:text-white'
                    }`}
                >
                  {lang.flag} {lang.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;