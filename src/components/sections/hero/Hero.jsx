"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Componentes estáticos
import DeviceFrame from "./components/DeviceFrame"
import HeroContent from "./components/HeroContent"
import ParticlesBackground from "./components/ParticlesBackground"

// Componente dinâmico
const FloatingApps = dynamic(() => import("./components/FloatingApps"), {
  ssr: false,
  loading: () => null,
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
    },
  },
}

export default function Hero() {
  const [activeApp, setActiveApp] = useState(null)

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full min-h-[80vh] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Fundo de partículas */}
      <ParticlesBackground />

      {/* Container principal */}
      <div className="relative w-full max-w-[1800px] h-full flex items-center justify-center">
        {/* Moldura do dispositivo */}
        <DeviceFrame />

        {/* Área da tela do dispositivo - conteúdo mais próximo das bordas */}
        <div className="absolute w-[94%] h-[80%] top-[5%] left-[3%] 
                       sm:w-[88%] sm:h-[75%] sm:top-[6%] sm:left-[6%]
                       md:w-[82%] md:h-[70%] md:top-[8%] md:left-[9%]
                       lg:w-[90%] lg:h-[65%] lg:top-[2%] lg:left-[6%]
                       flex items-center justify-center">
          
          {/* Container do conteúdo sem padding para maximizar espaço */}
          <div className="w-full h-full flex flex-col items-center justify-center">
            <HeroContent setActiveApp={setActiveApp} />
          </div>
        </div>

        {/* Aplicativos flutuantes */}
        {activeApp && <FloatingApps activeApp={activeApp} setActiveApp={setActiveApp} />}
      </div>
    </motion.section>
  )
}