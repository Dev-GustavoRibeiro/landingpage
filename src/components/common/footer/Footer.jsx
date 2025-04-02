"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé com direitos autorais"
      className="relative z-20 w-full border-t border-white/20 bg-white/10 backdrop-blur-md text-white"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="container max-w-screen-xl mx-auto px-4 py-4 text-center text-sm md:text-base"
      >
        <p className="text-white/90">
          © {currentYear} <strong>Gustavo Ribeiro</strong>. Todos os direitos reservados.
        </p>
      </motion.div>
    </footer>
  )
}
