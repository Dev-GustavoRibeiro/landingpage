"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import Section from "../Section";
import ProjectSlide from "./ProjectSlide";
import NavigationButton from "./NavigationButton";
import { useGitHubProjects } from "../../hooks/useGitHubProjects";

export default function ProjectsSection() {
  const { projects, isLoading, error } = useGitHubProjects();
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  }


  // Navegação automática
  useEffect(() => {
    if (projects.length <= 1 || isDragging) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [projects, isDragging]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects]);

  // Funções de navegação
  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // Eventos de toque (swipe)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    const threshold = 50; // Sensibilidade do swipe

    if (diff > threshold) {
      nextSlide(); // Swipe para a esquerda
    } else if (diff < -threshold) {
      prevSlide(); // Swipe para a direita
    }
  };

  if (isLoading) {
    return (
      <Section id="projects" label="Projects Section" background="gradient">
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
          />
        </div>
      </Section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <Section id="projects" label="Projects Section" background="gradient">
        <div className="text-center py-12 text-gray-400">
          {error || "Nenhum projeto encontrado"}
        </div>
      </Section>
    );
  }

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-6 py-15 md:py-20 relative
    text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
    border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
      >
      {/* Fundo animado com partículas */}
      <Particles
      id="tsparticles-projects"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "transparent" },
        detectRetina: true,
        particles: {
          number: { value: 70 },
          size: { value: 1.8 },
          move: { enable: true, speed: 0.4 },
          color: { value: "#7c3aed" },
          opacity: { value: 0.25 },
          links: {
            enable: true,
            color: "#7c3aed",
            distance: 80,
            opacity: 0.1,
          },
        },
      }}
      className="absolute inset-0 z-0"/>

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16 font-mono tracking-wide relative z-10"
      >
        <span className="text-indigo-400">$</span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          my_projects
        </span>{" "}
        --interactive
      </motion.h2>

      {/* Carrossel com suporte a swipe */}
      <div
        className="relative w-full h-[520px] md:h-[600px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout">
          <div className="flex items-center justify-center gap-4 md:gap-8 relative h-full">
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.repoName}
                project={project}
                isActive={index === activeIndex}
                position={index - activeIndex}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Navegação e Indicadores */}
      <div className="flex flex-col items-center mt-8 md:mt-12 gap-6 relative z-10">
        <div className="flex justify-center gap-6 md:gap-8">
          <NavigationButton direction="prev" onClick={prevSlide} />
          <NavigationButton direction="next" onClick={nextSlide} />
        </div>
        <div className="flex gap-2 md:gap-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="focus:outline-none"
              aria-label={`Ir para projeto ${index + 1}`}
            >
              <motion.div
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                  index === activeIndex ? "bg-indigo-400" : "bg-gray-600"
                }`}
                animate={{ width: index === activeIndex ? 24 : 12 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}