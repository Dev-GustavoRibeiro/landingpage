"use client"

import { motion } from "framer-motion"
import clsx from "clsx"

export default function Section({
  id,
  label,
  children,
  full = false,
  background = "none",
  highlight = false,
  showDivider = true,
  ...rest
}) {
  // Espaçamento base (ajuste se necessário)
  const basePadding = "px-4 md:px-8 py-20"

  // Se "full" for true, centraliza o conteúdo vertical e horizontalmente.
  const fullHeight = full ? " flex items-center justify-center" : ""

  // Diferentes estilos de fundo
  const bgStyles = {
    glass: "bg-white/5 backdrop-blur-md rounded-2xl shadow-inner",
    gradient:
      "bg-gradient-to-br from-indigo-900/20 via-indigo-800/10 to-transparent rounded-2xl shadow-xl",
    blur: "bg-indigo-800/10 backdrop-blur-xl rounded-2xl shadow-lg",
    none: "",
  }

  // Efeito de destaque (bordas e ring)
  const highlightEffect = highlight
    ? "relative overflow-hidden ring-1 ring-indigo-500/10 hover:ring-indigo-400/20 transition duration-500"
    : ""

  return (
    <motion.section
      id={id}
      aria-label={label}
      // Nova animação: fade-in com leve zoom, sem deslocamento vertical
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={clsx(
        basePadding,
        fullHeight,
        bgStyles[background],
        highlightEffect,
        // Removemos o scroll-mt para que o conteúdo não seja deslocado
        "relative group transition-all duration-700 ease-in-out will-change-transform"
      )}
      {...rest}
    >
      {/* Aurora ou efeito decorativo no fundo, se highlight for true */}
      {highlight && (
        <motion.div
          className="pointer-events-none absolute -top-32 left-1/2 w-[80vw] h-[80vh] -translate-x-1/2 blur-3xl opacity-20 will-change-transform"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.25), transparent 70%)",
          }}
        />
      )}

      {/* Camada de flutuação espacial no fundo */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          x: [0, 3, -3, 0],
          rotate: [0.1, -0.1, 0.1],
        }}
        transition={{
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 will-change-transform"
      >
        {/* Contêiner interno para centralizar horizontalmente e limitar a largura */}
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </motion.div>

      {/* Divisor visual no fim da seção, se desejado */}
      {showDivider && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-500/30 rounded-full blur-sm mt-8" />
      )}
    </motion.section>
  )
}
