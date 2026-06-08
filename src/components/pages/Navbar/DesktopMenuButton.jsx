import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

const DesktopMenuButton = React.forwardRef(({ onClick, scrolled }, ref) => (
  <div className="hidden md:block">
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex items-center gap-1 ${scrolled ? "text-black/70 hover:text-black" : "text-white/75 hover:text-white"} p-2.5 rounded-full hover:bg-white/10 transition-all`}
    >
      <Menu className="w-[18px] h-[18px]" />
    </motion.button>
  </div>
));

export default DesktopMenuButton;