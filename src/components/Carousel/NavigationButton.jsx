import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function NavigationButton({ direction, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full bg-gray-700/50 text-gray-300 hover:bg-gray-600/70 transition-all duration-300"
      aria-label={direction === "prev" ? "Projeto anterior" : "Próximo projeto"}
    >
      {direction === "prev" ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
    </motion.button>
  );
}