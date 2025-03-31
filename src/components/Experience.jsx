"use client"

import { motion } from "framer-motion"
import { BsLightningChargeFill } from "react-icons/bs"
import { FaNetworkWired, FaCodeBranch, FaLaptopCode } from "react-icons/fa"
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
      className="scroll-mt-[100px] container mx-auto px-6 py-20 md:py-20 relative 
      text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
      border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
    >
      {/* Partículas decorativas */}
      <Particles
        id="tsparticles-experience"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 0.3 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.25 },
            links: { enable: true, color: "#7c3aed", distance: 70, opacity: 0.1 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Ícones flutuantes */}
      <BsLightningChargeFill className="absolute top-10 right-10 text-indigo-500/40 animate-pulse text-3xl z-10" />
      <FaNetworkWired className="absolute bottom-5 left-10 text-indigo-400/30 animate-float text-3xl z-10" />
      <FaLaptopCode className="absolute top-10 left-1/2 -translate-x-1/2 text-indigo-400/30 animate-bounce z-10" />

      <div className="relative z-20 max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 mb-20 drop-shadow-md"
        >
          Experiência Profissional
        </motion.h2>

        <div className="grid gap-16 border-l-2 border-indigo-500/20 pl-8 relative">
          {[{
            title: "Projetista para Provedor",
            company: "TECHNET FIBRA",
            location: "Ipirá",
            period: "jan 2021 – dez 2024",
            icon: "https://cdn-icons-png.flaticon.com/512/6062/6062646.png",
            duties: [
              "Planejamento e execução de projetos de redes e infraestrutura tecnológica, focando em desempenho, escalabilidade e segurança.",
              "Aplicação de boas práticas e tecnologias atualizadas para modernização da operação e entrega de serviços com excelência."
            ]
          },
          {
            title: "Diretor / Gerente Técnico",
            company: "TECHNET FIBRA",
            location: "Ipirá",
            period: "jan 2021 – dez 2024",
            icon: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png",
            duties: [
              "Liderança de times técnicos e administrativos com foco em performance, cultura e eficiência operacional.",
              "Desenvolvimento de estratégias tecnológicas integradas aos objetivos da empresa, fortalecendo a posição no mercado local.",
              "Gestão de indicadores de produtividade e implantação de metodologias que aumentaram os resultados em mais de 30%."
            ]
          },
          {
            title: "Suporte Técnico e Atendimento ao Cliente",
            company: "TECHNET FIBRA",
            location: "Ipirá",
            period: "jan 2020 – dez 2021",
            icon: "https://cdn-icons-png.flaticon.com/512/10333/10333462.png",
            duties: [
              "Atendimento técnico personalizado e resolução ágil de chamados com foco na satisfação do cliente final.",
              "Atuação estratégica na comunicação entre cliente, equipe técnica e administrativa, elevando a taxa de fidelização."
            ]
          },
          {
            title: "Programador / Founder",
            company: "LOADING – Empresa Própria",
            location: "Remoto",
            period: "dez 2024 – Presente",
            icon: "https://cdn-icons-png.flaticon.com/512/5453/5453953.png",
            duties: [
              "Fundador da empresa e responsável pelo desenvolvimento de soluções digitais completas para clientes de diversos segmentos.",
              "Criação de sistemas personalizados, integrações com APIs e automação de processos empresariais.",
              "Aplicação de metodologias ágeis e colaboração com equipes multidisciplinares para entregas consistentes e de alta qualidade."
            ]
          }].map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-6 before:absolute before:-left-[15px] before:top-2 before:w-3.5 before:h-3.5 before:rounded-full before:bg-gradient-to-br before:from-indigo-500 before:to-indigo-300 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <img src={exp.icon} alt="icon" className="w-10 h-10 rounded-md bg-white/10 p-1 shadow-md" />
                <div>
                  <div className="text-sm text-indigo-200/80 tracking-wide uppercase font-medium">
                    {exp.period} — {exp.location}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-100">
                    {exp.title} <span className="font-medium text-white">· {exp.company}</span>
                  </h3>
                </div>
              </div>
              <ul className="list-disc list-inside text-indigo-100/90 mt-2 space-y-2 text-[17px] leading-relaxed">
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
