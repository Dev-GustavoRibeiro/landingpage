"use client"

import { motion } from "framer-motion"
import { BsLightningChargeFill } from "react-icons/bs"
import { FaNetworkWired, FaLaptopCode } from "react-icons/fa"
import Particles from "react-tsparticles"
import { useCallback } from "react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Experience() {
  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  return (
    <motion.section
      id="experiencia"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative 
      text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
      border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
    >
      <Particles
        id="tsparticles-experience"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            size: { value: 1.5 },
            move: { enable: true, speed: 0.3 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.2 },
            links: { enable: true, color: "#7c3aed", distance: 80, opacity: 0.1 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <BsLightningChargeFill className="absolute top-8 right-8 text-indigo-500/40 animate-pulse text-3xl z-10" />
      <FaNetworkWired className="absolute bottom-6 left-8 text-indigo-400/30 animate-float text-3xl z-10" />
      <FaLaptopCode className="absolute top-12 left-1/2 -translate-x-1/2 text-indigo-400/30 animate-bounce z-10" />

      <div className="relative z-20 max-w-5xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-extrabold text-center text-indigo-400 mb-16 drop-shadow-md"
        >
          Experiência Profissional
        </motion.h2>

        <div className="grid gap-12 border-l-2 border-indigo-500/20 pl-4 sm:pl-8 relative">
          {[
            {
              title: "Projetista para Provedor",
              company: "TECHNET FIBRA",
              location: "Ipirá",
              period: "jan 2021 – dez 2024",
              icon: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
              duties: [
                "Planejamento e execução de projetos de redes e infraestrutura tecnológica.",
                "Modernização da operação com tecnologias atualizadas."
              ]
            },
            {
              title: "Diretor / Gerente Técnico",
              company: "TECHNET FIBRA",
              location: "Ipirá",
              period: "jan 2021 – dez 2024",
              icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
              duties: [
                "Liderança técnica e administrativa focada em performance operacional.",
                "Estratégias tecnológicas alinhadas aos objetivos da empresa.",
                "Aumento dos resultados através de gestão eficiente."
              ]
            },
            {
              title: "Suporte Técnico e Atendimento",
              company: "TECHNET FIBRA",
              location: "Ipirá",
              period: "jan 2020 – dez 2021",
              icon: "https://cdn-icons-png.flaticon.com/512/10333/10333462.png",
              duties: [
                "Atendimento ágil focado na satisfação do cliente.",
                "Comunicação estratégica com equipes técnicas e administrativas."
              ]
            },
            {
              title: "Programador / Founder",
              company: "LOADING",
              location: "Remoto",
              period: "dez 2024 – Presente",
              icon: "https://cdn-icons-png.flaticon.com/512/5453/5453953.png",
              duties: [
                "Desenvolvimento de soluções digitais personalizadas.",
                "Integrações com APIs e automação de processos.",
                "Uso de metodologias ágeis para entregas de alta qualidade."
              ]
            }
          ].map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-6 before:absolute before:-left-[15px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-gradient-to-br before:from-indigo-500 before:to-indigo-300 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={exp.icon} alt="icon" className="w-8 h-8 rounded-md bg-white/10 p-1 shadow-md" />
                <div>
                  <div className="text-xs sm:text-sm text-indigo-200/80 tracking-wide uppercase font-medium">
                    {exp.period} — {exp.location}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-indigo-100">
                    {exp.title} <span className="font-medium text-white">· {exp.company}</span>
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-indigo-100/90 mt-2 space-y-1 text-[15px] sm:text-[17px] leading-relaxed">
                {exp.duties.map((duty, i) => (
                  <li key={i}>{duty}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
