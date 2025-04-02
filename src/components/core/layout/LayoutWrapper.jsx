"use client";

import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer/Footer";
import { Code2, Network, Terminal, Server } from "lucide-react";
import dynamic from "next/dynamic";

// Carregamento dinâmico das partículas para melhorar a performance inicial
const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), { ssr: false });

// Componentes memorizados para evitar re-renderizações desnecessárias
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

// Configurações de partículas pré-definidas para melhorar a performance
const getParticlesConfig = (isMobile) => ({
  particles: {
    number: { value: isMobile ? 15 : 40 },
    size: { value: 3 },
    move: { enable: true, speed: isMobile ? 0.5 : 1 },
    color: { value: ["#a78bfa", "#4f46e5"] },
    opacity: { value: 0.3 },
    links: { enable: !isMobile, color: "#a78bfa", distance: 150, opacity: 0.2 },
  },
  interactivity: {
    events: { onHover: { enable: !isMobile, mode: "repulse" } },
    modes: { repulse: { distance: 100 } },
  },
});

export default function LayoutWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [particlesConfig, setParticlesConfig] = useState(null);

  // Efeito para detectar dispositivos móveis e configurar partículas
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setParticlesConfig(getParticlesConfig(mobile));
    };
    
    // Inicialização
    handleResize();
    
    // Listener para redimensionamento
    window.addEventListener("resize", handleResize);
    
    // Limpeza
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Fundo Principal - Otimizado com animação mais leve para dispositivos móveis */}
      <motion.div
        className="fixed inset-0 -z-50"
        animate={isMobile ? {
          scale: [1, 1.01, 1],
        } : {
          scale: [1, 1.02, 1],
          backgroundPosition: ["0% 50%", "50% 50%", "0% 50%"],
        }}
        transition={{
          duration: isMobile ? 20 : 28,
          repeat: Infinity,
          repeatType: "mirror",
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          backgroundImage: 'url("/images/fundo.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      />

      {/* Partículas - Carregadas condicionalmente */}
      {particlesConfig && (
        <Particles
          options={particlesConfig}
          className="fixed inset-0 -z-40"
        />
      )}

      {/* Película Roxa - Otimizada para melhor performance em dispositivos móveis */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-900/30 to-transparent -z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          backdropFilter: isMobile ? 'blur(4px)' : 'blur(8px)',
        }}
      />

      {/* Ícones Decorativos - Escondidos em dispositivos móveis para melhorar a performance */}
      {!isMobile && (
        <motion.div
          className="fixed inset-0 -z-20 pointer-events-none hidden md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-[15%] top-[20%] opacity-10 animate-pulse">
            <Code2 className="w-16 md:w-20 h-16 md:h-20 text-indigo-400/40 blur-sm drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]" />
          </div>
          <div className="absolute right-[12%] top-[50%] opacity-10 animate-bounce">
            <Network className="w-12 md:w-16 h-12 md:h-16 text-indigo-300/40 blur-sm drop-shadow-[0_0_12px_rgba(129,140,248,0.4)]" />
          </div>
          <div className="absolute left-[35%] bottom-[15%] opacity-10">
            <Terminal className="w-20 md:w-24 h-20 md:h-24 text-indigo-500/40 blur-md drop-shadow-[0_0_18px_rgba(99,102,241,0.6)]" />
          </div>
          <div className="absolute right-[38%] top-[70%] opacity-10 animate-ping delay-700">
            <Server className="w-10 md:w-14 h-10 md:h-14 text-indigo-300/30 blur-md drop-shadow-[0_0_16px_rgba(129,140,248,0.5)]" />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <MemoizedHeader />
      </motion.div>

      <main
        className="scroll-smooth z-10 relative flex flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        aria-label="Conteúdo principal"
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 1 : 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: isMobile ? index * 0.1 : index * 0.2,
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
            transition={{ duration: isMobile ? 1 : 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </main>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <MemoizedFooter />
      </motion.div>
    </>
  );
}