import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu } from 'lucide-react';
import Logo from './Logo';
import DesktopMenuButton from './DesktopMenuButton';
import DesktopDropdown from './DesktopDropdown';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import { getNavLinks } from './NavLinksData';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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

  const navLinks = getNavLinks(t, scrollTo, navigate);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click-outside effects (unchanged)
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

  useEffect(() => {
    if (desktopDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [desktopDropdownOpen]);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // Pages where logo should be orange and icons dark (background transparent)
  const isSpecialPage = ['/about', '/reservation', '/notfound', '/cars', '/legal', '/terms', "/privacy"].includes(location.pathname);

  // Logo colour: on special pages → orange; on homepage → white (scrolled becomes orange)
  const logoOrange = isSpecialPage || scrolled;
  // Icons/text colour: on special pages → black/dark; on homepage → white (scrolled becomes dark)
  const useDarkIcons = isSpecialPage || scrolled;

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <>
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
          
          <Logo 
            onClick={() => scrollTo('home')} 
            isOrange={logoOrange} 
          />

          <div className="flex items-center gap-1">
            {/* Search button */}
            {/* <div ref={searchButtonRef}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setDesktopDropdownOpen(false);
                  setLangDropdownOpen(false);
                }}
                className={`p-2.5 rounded-full hover:bg-white/10 transition-all ${
                  useDarkIcons ? 'text-black/70 hover:text-black' : 'text-white/75 hover:text-white'
                }`}
              >
                <Search className="w-[18px] h-[18px]" />
              </motion.button>
            </div> */}

            {/* Language Switcher */}
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={(code) => i18n.changeLanguage(code)}
              isOpen={langDropdownOpen}
              onToggle={() => setLangDropdownOpen(!langDropdownOpen)}
              buttonRef={langButtonRef}
              contentRef={langContentRef}
              useDarkIcons={useDarkIcons}
            />

            {/* Desktop Menu Button (hamburger) */}
            <DesktopMenuButton
              ref={desktopButtonRef}
              onClick={() => {
                setDesktopDropdownOpen(!desktopDropdownOpen);
                setSearchOpen(false);
                setLangDropdownOpen(false);
              }}
              useDarkIcons={useDarkIcons}
            />

            {/* Mobile menu toggle button */}
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
                    <X className={`w-[18px] h-[18px] ${useDarkIcons ? 'text-black' : 'text-white'}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className={`w-[18px] h-[18px] ${useDarkIcons ? 'text-black' : 'text-white'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <DesktopDropdown
          isOpen={desktopDropdownOpen}
          navLinks={navLinks}
          onClose={() => setDesktopDropdownOpen(false)}
          ref={desktopMenuRef}
        />

        {/* <SearchBar
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          placeholder={t('search') || 'Search for cars...'}
          containerRef={searchContainerRef}
        /> */}

        <MobileMenu
          isOpen={menuOpen}
          navLinks={navLinks}
          languages={languages}
          currentLang={currentLang}
          onLanguageChange={(code) => i18n.changeLanguage(code)}
          onClose={() => setMenuOpen(false)}
        />
      </motion.nav>
    </>
  );
}

export default Navbar;