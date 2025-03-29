"use client"

import { motion } from "framer-motion"
import Header from "./Header"
import Footer from "./Footer"
import { Code2, Network, Terminal, Server } from "lucide-react"

export default function LayoutWrapper({ children }) {
  return (
    
    <>
      {/* 🔥 Fundo animado com efeito espacial dinâmico */}
      <motion.div
        className="fixed inset-0 -z-50"
        animate={{
          scale: [1, 1.02, 1],
          backgroundPosition: ["0% 50%", "50% 50%", "0% 50%"],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          backgroundImage: 'url("/images/fundo.PNG")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Camada escura com blur e mistura de blend suave */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md mix-blend-multiply -z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />

      {/* Elementos de computação em plano de fundo (com ícones Lucide) */}
      <motion.div
        className="fixed inset-0 -z-30 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-[15%] top-[20%] opacity-10 animate-pulse">
          <Code2 className="w-20 h-20 text-indigo-400/40 blur-sm drop-shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute right-[12%] top-[50%] opacity-10 animate-bounce">
          <Network className="w-16 h-16 text-indigo-300/40 blur-sm drop-shadow-[0_0_12px_rgba(129,140,248,0.4)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute left-[35%] bottom-[15%] opacity-10">
          <Terminal className="w-24 h-24 text-indigo-500/40 blur-md drop-shadow-[0_0_18px_rgba(99,102,241,0.6)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute right-[38%] top-[70%] opacity-10 animate-ping delay-700">
          <Server className="w-14 h-14 text-indigo-300/30 blur-md drop-shadow-[0_0_16px_rgba(129,140,248,0.5)] hover:scale-105 transition-transform" />
        </div>
      </motion.div>

      {/* Cabeçalho fixo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Header />
      </motion.div>

      {/* Conteúdo principal */}
      <main
        className="scroll-smooth z-10 relative flex flex-col gap-40 md:gap-60"
        aria-label="Conteúdo principal"
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index * 0.2,
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </main>

      {/* Rodapé animado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </>
  )


}
