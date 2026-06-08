import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";

const searchBarVariants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: "auto", y: 0, transition: { duration: 0.3 } }
};

const SearchBar = ({ isOpen, onClose, placeholder, containerRef }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        ref={containerRef}
        variants={searchBarVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-black/40 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-3"
      >
        <div className="max-w-7xl mx-auto">
          <Input
            autoFocus
            type="text"
            placeholder={placeholder}
            className="w-full bg-white/10 text-white placeholder-white/40 rounded-full px-5 py-2.5 text-sm outline-none border-white/15 focus:border-white/30 transition-colors"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SearchBar;