"use client"

import { motion } from "framer-motion"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

export default function NavigationButton({ direction, onClick }) {
  const iconProps = {
    size: 20,
    className: "transition-transform duration-300 group-hover:scale-125"
  }

  return (
    <motion.button
      whileHover={{ 
        scale: 1.1,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: '0 0 5px rgba(99, 102, 241, 0.3)'
      }}
      onClick={onClick}
      className={`p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:text-indigo-300 transition-all group ${
        direction === 'prev' ? 'mr-1' : 'ml-1'
      }`}
      aria-label={direction === 'prev' ? 'Projeto anterior' : 'Próximo projeto'}
    >
      {direction === 'prev' ? (
        <FiChevronLeft {...iconProps} />
      ) : (
        <FiChevronRight {...iconProps} />
      )}
    </motion.button>
  )
}