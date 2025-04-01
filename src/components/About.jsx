"use client";

import { motion } from "framer-motion";
import React from "react"; 
import Particles from "./ParticlesWrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <motion.section
      id="perfil"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-6 py-20 md:py-20 relative 
      text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
      border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
    >
      {/* Fundo animado com partículas */}
      <Particles/>

      {/* Elementos visuais animados */}
      <img
        src="/images/computador.png"
        alt="Computador"
        className="absolute top-10 left-6 w-10 h-10 md:w-12 md:h-12 animate-float opacity-70 pointer-events-none"
        loading="lazy"
      />
      <img
        src="/images/brainstorm.png"
        alt="Cérebro"
        className="absolute bottom-6 right-6 w-8 h-8 md:w-10 md:h-10 animate-spin-slow opacity-70 pointer-events-none"
        loading="lazy"
      />
      <img
        src="/images/local-area.png"
        alt="Rede"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 animate-bounce opacity-70 pointer-events-none"
        loading="lazy"
      />

      {/* Conteúdo da seção */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl mx-auto"
        variants={itemVariants}
      >
        {/* Foto */}
        <motion.img
          src="/images/foto2.png"
          alt="Gustavo Ribeiro"
          className="w-60 h-60 md:w-80 md:h-100 object-cover rounded-full border-4 border-indigo-500 shadow-xl hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.png"; // Fallback image
          }}
        />

        {/* Texto */}
        <motion.div
          variants={itemVariants}
          className="text-center md:text-left w-full md:max-w-2xl px-2"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-400 mb-6 drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sobre Mim
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl leading-relaxed text-indigo-100 mb-4 text-justify"
          >
            Sou apaixonado por tecnologia, engenharia e soluções inteligentes. Em formação como Engenheiro da Computação pela UNIFAN e Técnico em Informática pelo Grupo IETAAM, busco unir visão estratégica com habilidades técnicas para criar sistemas eficientes e impactantes.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl leading-relaxed text-indigo-100 mb-4 text-justify"
          >
            Tenho experiência prática em desenvolvimento, arquitetura de sistemas e organização de equipes técnicas. Além disso, aprofundei meus conhecimentos em gestão de negócios, finanças corporativas e liderança de pessoas, atuando diretamente na estruturação de processos operacionais e administrativos em empresas de tecnologia.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg lg:text-xl leading-relaxed text-indigo-100 text-justify"
          >
            Minha visão é construir soluções completas — da estratégia ao código — entregando resultados reais para empresas que buscam inovação, crescimento e eficiência.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}