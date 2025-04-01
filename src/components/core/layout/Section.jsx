"use client";

import { motion } from "framer-motion";

export default function Section({
  id,
  label,
  children,
  full = false,
  highlight = false,
  showDivider = true,
  ...rest
}) {
  // Classe opcional para ocupar a tela inteira, se necessário
  const fullHeight = full ? "min-h-screen flex items-center justify-center" : "";

  // Efeito de destaque (ring) quando highlight = true
  const highlightEffect = highlight
    ? "relative overflow-hidden ring-1 ring-indigo-500/10 hover:ring-indigo-400/20 transition duration-500"
    : "";

  return (
    <motion.section
      id={id}
      aria-label={label}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`scroll-mt-[100px] container
        relative text-white rounded-3xl overflow-hidden 
        shadow-[0_0_40px_rgba(124,58,237,0.4)] border border-indigo-500/30 
        bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
        backdrop-blur-xl ${fullHeight} ${highlightEffect} 
        relative transition-all duration-700 ease-in-out`}
      {...rest}
    >
      {highlight && (
        <motion.div
          className="pointer-events-none absolute -top-32 left-1/2 w-[80vw] h-[80vh] -translate-x-1/2 blur-3xl opacity-20 hidden md:block"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.25), transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full">{children}</div>

      {showDivider && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-indigo-500/30 rounded-full blur-sm mt-6 sm:mt-8" />
      )}
    </motion.section>
  );
}
