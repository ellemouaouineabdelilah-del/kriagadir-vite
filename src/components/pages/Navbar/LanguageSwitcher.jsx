import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
];

const LanguageSwitcher = ({ currentLang, onLanguageChange, isOpen, onToggle, buttonRef, contentRef, scrolled }) => (
  <div className="hidden md:block relative">
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`flex items-center gap-1 ${scrolled ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"} p-2.5 rounded-full hover:bg-white/10 transition-all text-sm`}
    >
      <span className="text-base">{currentLang.flag}</span>
      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-40 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl z-50"
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                onToggle(); // close after selection
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/10 ${
                currentLang.code === lang.code ? 'bg-white/10 text-white font-medium' : 'text-white/65'
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default LanguageSwitcher;