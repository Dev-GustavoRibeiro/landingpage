"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import Section from "../Section";
import ProjectSlide from "./ProjectSlide";
import NavigationButton from "./NavigationButton";
import { useGitHubProjects } from "../../hooks/useGitHubProjects";
import { Pause, Play, Github } from "lucide-react";

export default function ProjectsSection() {
  const { projects, isLoading, error } = useGitHubProjects("Dev-GustavoRibeiro");
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim");
    await loadSlim(engine);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  // Navegação automática
  useEffect(() => {
    if (projects.length <= 1 || isDragging || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [projects, isDragging, isPlaying]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " ") setIsPlaying((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [projects]);

  // Funções de navegação
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

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
    const threshold = 50;
    if (diff > threshold) nextSlide();
    else if (diff < -threshold) prevSlide();
  };

  if (isLoading) {
    return (
      <Section id="projects" label="Seção de Projetos" background="gradient">
        <div className="flex justify-center items-center min-h-[50vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
          />
        </div>
      </Section>
    );
  }

  if (error || projects.length === 0) {
    return (
      <Section id="projects" label="Seção de Projetos" background="gradient">
        <div className="text-center py-12 text-gray-400 min-h-[50vh] flex items-center justify-center">
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
      className="scroll-mt-20 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative text-white 
        rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border border-indigo-500/30 
        bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 backdrop-blur-xl"
    >
      <Particles
        id="tsparticles-projects"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          detectRetina: true,
          particles: {
            number: { value: { base: 70, density: { enable: true, value_area: 800 } } },
            size: { value: { min: 1, max: 2 } },
            move: { enable: true, speed: { min: 0.2, max: 0.6 } },
            color: { value: "#7c3aed" },
            opacity: { value: { min: 0.1, max: 0.3 } },
            links: {
              enable: true,
              color: "#7c3aed",
              distance: 80,
              opacity: 0.1,
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Cabeçalho */}
      <div className="relative z-10 mb-10 md:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white font-mono tracking-wide"
        >
          <span className="text-indigo-400">$</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            meus_projetos
          </span>{" "}
          --interativo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto"
        >
          Explore meus projetos mais recentes do GitHub com slides interativos. Deslize, clique ou use as setas do teclado para navegar.
        </motion.p>
      </div>

      {/* Carrossel */}
      <div
        className="relative w-full h-[400px] sm:h-[480px] md:h-[600px] overflow-hidden px-2 sm:px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout">
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 relative h-full">
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

      {/* Controles */}
      <div className="relative z-10 mt-8 sm:mt-10 md:mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className="flex gap-4 sm:gap-6">
            <NavigationButton direction="prev" onClick={prevSlide} />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
              aria-label={isPlaying ? "Pausar apresentação" : "Reproduzir apresentação"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            <NavigationButton direction="next" onClick={nextSlide} />
          </div>

          {/* Indicadores */}
          <div className="flex gap-2 sm:gap-3">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="focus:outline-none"
                aria-label={`Ir para o projeto ${index + 1}`}
              >
                <motion.div
                  className={`h-2 md:h-3 rounded-full ${
                    index === activeIndex ? "bg-indigo-400" : "bg-gray-600"
                  }`}
                  animate={{ width: index === activeIndex ? 24 : 8 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Link para GitHub */}
        <motion.a
          href="https://github.com/Dev-GustavoRibeiro"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="mt-6 flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm sm:text-base"
        >
          <Github size={20} />
          <span>Ver todos os projetos no GitHub</span>
        </motion.a>
      </div>
    </motion.section>
  );
}