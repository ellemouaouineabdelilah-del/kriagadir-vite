import { motion } from 'framer-motion';

const DesktopNav = ({ links, scrolled }) => (
  <div className="hidden md:flex items-center gap-1 ml-auto mr-4">
    {links.map(({ label, action }) => (
      <motion.button
        key={label}
        onClick={action}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-2 text-sm font-medium rounded-full transition-all ${
          scrolled
            ? 'text-gray-700 hover:text-orange-600 hover:bg-gray-100'
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        {label}
      </motion.button>
    ))}
  </div>
);

export default DesktopNav;