import { motion } from "framer-motion"
import { itemVariant } from "./animation"

export default function SectionTitle({ children }) {
  return (
    <motion.h2
      variants={itemVariant}
      className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 drop-shadow-md"
    >
      {children}
    </motion.h2>
  )
}