"use client";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function NavigationButton({ direction, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white"
      aria-label={direction === "prev" ? "Anterior" : "Próximo"}
    >
      {direction === "prev" ? (
        <FiChevronLeft size={20} />
      ) : (
        <FiChevronRight size={20} />
      )}
    </motion.button>
  );
}