"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Code2, Network, Terminal, Server } from "lucide-react";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), { ssr: false });

export default function LayoutWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Fundo Principal */}
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
          backgroundImage: 'url("/images/fundo.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Partículas */}
      <Particles
        options={{
          particles: {
            number: { value: isMobile ? 20 : 60 },
            size: { value: 3 },
            move: { enable: true, speed: isMobile ? 0.5 : 1 },
            color: { value: ["#a78bfa", "#4f46e5"] },
            opacity: { value: 0.3 },
            links: { enable: !isMobile, color: "#a78bfa", distance: 150, opacity: 0.2 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
        }}
        className="fixed inset-0 -z-40"
      />

      {/* Película Roxa */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-indigo-900/30 via-gray-900/30 to-transparent -z-30 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{
          backdropFilter: 'blur(8px)',

        }}
      />

      {/* Ícones Decorativos */}
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

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Header />
      </motion.div>

      <main
        className="scroll-smooth z-10 relative flex flex-col gap-16 sm:gap-24 md:gap-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </>
  );
}