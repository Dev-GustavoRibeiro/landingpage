"use client"

import { motion } from "framer-motion"
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

export default function About() {
  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  return (
    <motion.section
      id="perfil"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-6 py-40 md:py-56 relative text-white rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 via-indigo-900/5 to-transparent"
    >
      {/* Partículas com react-tsparticles */}
      <Particles
        id="tsparticles-about"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 70 },
            size: { value: 1.8 },
            move: { enable: true, speed: 0.4 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.25 },
            links: { enable: true, color: "#7c3aed", distance: 80, opacity: 0.1 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Elementos visuais animados */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
        alt="Computador"
        className="absolute top-10 left-10 w-12 h-12 animate-float opacity-70"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/3004/3004613.png"
        alt="Cérebro"
        className="absolute bottom-8 right-10 w-10 h-10 animate-spin-slow opacity-70"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/5900/5900525.png"
        alt="Rede"
        className="absolute top-16 right-1/2 translate-x-1/2 w-10 h-10 animate-bounce opacity-70"
      />

      {/* Conteúdo da seção */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 max-w-6xl mx-auto"
        variants={itemVariants}
      >
        {/* Foto */}
        <motion.img
          src="/images/foto2.png"
          alt="Gustavo Ribeiro"
          className="w-80 h-100 object-cover rounded-full border-4 border-indigo-500 shadow-xl hover:scale-105 transition duration-300"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* Texto */}
        <motion.div
          variants={itemVariants}
          className="text-center md:text-left max-w-2xl"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-400 mb-6 drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sobre Mim
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-indigo-100 mb-4"
          >
            Sou apaixonado por tecnologia, engenharia e soluções inteligentes. Em formação como Engenheiro da Computação pela UNIFAN e Técnico em Informática pelo Grupo IETAAM, busco unir visão estratégica com habilidades técnicas para criar sistemas eficientes e impactantes.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-indigo-100 mb-4"
          >
            Tenho experiência prática em desenvolvimento, arquitetura de sistemas e organização de equipes técnicas. Além disso, aprofundei meus conhecimentos em gestão de negócios, finanças corporativas e liderança de pessoas, atuando diretamente na estruturação de processos operacionais e administrativos em empresas de tecnologia.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-indigo-100"
          >
            Minha visão é construir soluções completas — da estratégia ao código — entregando resultados reais para empresas que buscam inovação, crescimento e eficiência.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
