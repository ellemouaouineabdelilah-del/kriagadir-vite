import { motion } from 'framer-motion';

const Logo = ({ onClick, isOrange }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`font-bold italic text-2xl tracking-tight select-none hover:opacity-90 transition-opacity bg-transparent border-none cursor-pointer drop-shadow-lg ${
      isOrange ? 'text-orange-500' : 'text-white'
    }`}
  >
    kriagadir
  </motion.button>
);

export default Logo;