import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const DesktopMenuButton = React.forwardRef(({ onClick, useDarkIcons }, ref) => (
  <div className="hidden md:block">
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center gap-1 p-2.5 rounded-full hover:bg-white/10 transition-all ${
        useDarkIcons ? 'text-black hover:text-black' : 'text-white/75 hover:text-white'
      }`}
    >
      <Menu className="w-[18px] h-[18px]" />
    </motion.button>
  </div>
));

export default DesktopMenuButton;