"use client"

import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { useCallback } from "react"

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Formation() {
  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  return (
    <motion.section
      id="formacao"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariant}
      className="scroll-mt-[100px] container mx-auto px-6 py-40 md:py-56 relative text-white rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 via-indigo-900/5 to-transparent"
    >
      {/* Partículas animadas no fundo */}
      <Particles
        id="tsparticles-formation"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 1.8 },
            move: { enable: true, speed: 0.4 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.25 },
            links: { enable: true, color: "#7c3aed", distance: 80, opacity: 0.1 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Elementos visuais decorativos */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1995/1995531.png"
        alt="Diploma"
        className="absolute top-10 left-10 w-12 h-12 animate-float opacity-70"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
        alt="Capelo"
        className="absolute bottom-10 right-10 w-10 h-10 animate-float opacity-70"
      />

      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto"
        variants={itemVariant}
      >
        <motion.div
          className="flex-1 space-y-10"
          variants={itemVariant}
        >
          <motion.h2
            id="formacao-titulo"
            variants={itemVariant}
            className="text-4xl md:text-5xl font-extrabold text-indigo-400 mb-6 drop-shadow-lg text-center md:text-left"
          >
            Formação Acadêmica
          </motion.h2>

          <motion.div
            variants={itemVariant}
            className="p-6 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md text-indigo-100 hover:scale-[1.02] transition duration-500"
          >
            <h3 className="text-2xl font-semibold text-indigo-300">
              Engenharia da Computação
            </h3>
            <p className="mt-2 text-sm">UNIFAN – Universidade Nobre</p>
            <p className="text-sm mb-4">Conclusão prevista: Junho de 2026</p>
            <p className="text-[15px] leading-relaxed">
              Foco em sistemas embarcados, redes, automação, IA e engenharia de software. Projeto de soluções integradas para desafios computacionais reais em ambientes corporativos e industriais.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariant}
            className="p-6 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md text-indigo-100 hover:scale-[1.02] transition duration-500"
          >
            <h3 className="text-2xl font-semibold text-indigo-300">
              Técnico em Informática
            </h3>
            <p className="mt-2 text-sm">Grupo IETAAM</p>
            <p className="text-sm mb-4">Concluído: 2023</p>
            <p className="text-[15px] leading-relaxed">
              Desenvolvimento web, redes, manutenção de sistemas e banco de dados. Forte base prática com uso de linguagens modernas e infraestrutura de TI aplicada a pequenos negócios.
            </p>
          </motion.div>
        </motion.div>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
          alt="Graduação"
          className="w-64 h-auto rounded-2xl drop-shadow-xl hidden md:block"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </motion.div>
    </motion.section>
  )
}
