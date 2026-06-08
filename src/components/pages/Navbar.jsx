import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  X,
  Home,
  Car,
  Phone,
  Grid3x3
} from 'lucide-react';

// shadcn/ui components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  
  // Refs for click-outside detection
  const desktopMenuRef = useRef(null);
  const desktopButtonRef = useRef(null);
  const searchContainerRef = useRef(null);
  const searchButtonRef = useRef(null);
  const langButtonRef = useRef(null);
  const langContentRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  ];

  const navLinks = [
    { label: t('home'), action: () => scrollTo('home'), icon: Home, description: 'Back to homepage' },
    { label: t('vehicles'), action: () => scrollTo('fleet'), icon: Car, description: 'View our vehicles' },
    { label: t('reservation'), action: () => navigate('/reservation'), icon: Grid3x3, description: 'Reserve your car' },
    { label: t('contactSection'), action: () => scrollTo('contact'), icon: Phone, description: 'Get in touch' },
  ];

  // Handle scroll effect on navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside for desktop dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopDropdownOpen && 
          desktopMenuRef.current && 
          !desktopMenuRef.current.contains(event.target) &&
          desktopButtonRef.current &&
          !desktopButtonRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [desktopDropdownOpen]);

  // Click outside for search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && 
          searchContainerRef.current && 
          !searchContainerRef.current.contains(event.target) &&
          searchButtonRef.current &&
          !searchButtonRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  // Click outside for language dropdown (custom, not using shadcn's built-in)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownOpen && 
          langContentRef.current && 
          !langContentRef.current.contains(event.target) &&
          langButtonRef.current &&
          !langButtonRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  // Prevent body scroll when desktop dropdown is open
  useEffect(() => {
    if (desktopDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [desktopDropdownOpen]);

  // FIXED: Robust scrollTo function with polling and navigation handling
const scrollTo = (sectionId) => {
  setMenuOpen(false);
  setSearchOpen(false);
  setDesktopDropdownOpen(false);
  setLangDropdownOpen(false);
  if (location.pathname !== '/') {
    navigate('/');
    setTimeout(() => {
      window.location.hash = sectionId;
    }, 200);
  } else {
    window.location.hash = sectionId;
  }
};
  const currentLang = languages.find(l => l.code === i18n.language);

  // Animation variants
  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fullWidthDropdownVariants = {
    closed: { opacity: 0, y: -20, height: 0 },
    open: { opacity: 1, y: 0, height: 'auto', transition: { duration: 0.4, ease: "easeOut" } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  const searchBarVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3 } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Blur overlay when desktop dropdown is open */}
      <AnimatePresence>
        {desktopDropdownOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setDesktopDropdownOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav 
        initial="initial"
        animate="animate"
        variants={navVariants}
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/10 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${scrolled ? "text-orange-500" : "text-white"} font-bold italic text-2xl tracking-tight select-none hover:opacity-90 transition-opacity bg-transparent border-none cursor-pointer drop-shadow-lg`}
          >
            kriagadir
          </motion.button>

          {/* Right side icons */}
          <div className="flex items-center gap-1">
            
            {/* Search Button with ref */}
            <div ref={searchButtonRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setDesktopDropdownOpen(false);
                  setLangDropdownOpen(false);
                }}
                className={`${scrolled ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"}  p-2.5 rounded-full hover:bg-white/10 transition-all`}
              >
                <Search className="w-[18px] h-[18px]" />
              </motion.button>
            </div>

            {/* Custom Language Dropdown (not using shadcn for better click-outside control) */}
            <div className="hidden md:block relative">
              <motion.button
                ref={langButtonRef}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setDesktopDropdownOpen(false);
                  setSearchOpen(false);
                }}
                className={`flex items-center gap-1 ${scrolled ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"}   p-2.5 rounded-full hover:bg-white/10 transition-all text-sm`}
              >
                <span className="text-base">{currentLang?.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    ref={langContentRef}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-40 bg-black/40 backdrop-blur-sm  rounded-lg border border-white/10 shadow-xl z-50"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/10 ${
                          i18n.language === lang.code ? 'bg-white/10 text-white font-medium' : 'text-white/65'
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

            {/* Desktop Menu Button */}
            <div className="hidden md:block">
              <motion.button
                ref={desktopButtonRef}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setDesktopDropdownOpen(!desktopDropdownOpen);
                  setSearchOpen(false);
                  setLangDropdownOpen(false);
                }}
                className={`flex items-center gap-1 ${scrolled ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"}   p-2.5 rounded-full hover:bg-white/10 transition-all`}
              >
                <Menu className="w-[18px] h-[18px]" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden flex-col justify-center items-center gap-[5px] p-2.5 rounded-full hover:bg-white/10 transition-all w-10 h-10"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-[18px] h-[18px] text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-[18px] h-[18px] text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Full-Width Desktop Dropdown Menu */}
        <AnimatePresence>
          {desktopDropdownOpen && (
            <motion.div
              ref={desktopMenuRef}
              variants={fullWidthDropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute left-0 right-0 top-16  backdrop-blur-lg shadow-2xl z-50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {navLinks.map(({ label, action, icon: Icon, description }) => (
                    <motion.button
                      key={label}
                      onClick={() => {
                        action();
                        setDesktopDropdownOpen(false);
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left group"
                    >
                      <div className="p-3 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{label}</div>
                        <div className="text-xs text-white/50">{description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-white/40 text-xs">
                    © 2025 Kriagadir - Premium Car Rental
                  </div>
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

        {/* Search Bar with container ref for click-outside */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              ref={searchContainerRef}
              variants={searchBarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className=" bg-black/40 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-3"
            >
              <div className="max-w-7xl mx-auto">
                <Input
                  autoFocus
                  type="text"
                  placeholder={t('search') || 'Search for cars...'}
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-full px-5 py-2.5 text-sm outline-none border-white/15 focus:border-white/30 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden border-t border-white/10 bg-white/60 backdrop-blur-md"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map(({ label, action, icon: Icon }, index) => (
                  <motion.button
                    key={label}
                    onClick={action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 text-white/80 hover:text-white text-sm py-3.5 px-3 w-full text-left border-b border-white/10 last:border-0 transition-all rounded-lg hover:bg-white/10"
                  >
                    <Icon className="w-4 h-4" />
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
                      onClick={() => { i18n.changeLanguage(lang.code); setMenuOpen(false); }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs border transition-all
                        ${i18n.language === lang.code
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
      </motion.nav>
    </>
  );
}

export default Navbar;