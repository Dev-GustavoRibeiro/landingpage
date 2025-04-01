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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Verificação de mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carregamento das partículas
  const particlesInit = useCallback(async (engine) => {
    const { loadSlim } = await import("tsparticles-slim");
    await loadSlim(engine);
  }, []);

  // Controle do slideshow
  useEffect(() => {
    if (projects.length <= 1 || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [projects, isPlaying]);

  // Navegação
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  if (isLoading) {
    return (
      <Section id="projects" label="Seção de Projetos" background="gradient">
        <div className="flex justify-center items-center min-h-[50vh] py-12">
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
        <div className="text-center py-16 text-gray-400 min-h-[50vh] flex items-center justify-center">
          {error || "Nenhum projeto encontrado"}
        </div>
      </Section>
    );
  }

  const particlesOptions = {
    fullScreen: false,
    background: { color: "transparent" },
    particles: {
      number: { value: isMobile ? 30 : 60 },
      size: { value: { min: 1, max: 2 } },
      move: { enable: true, speed: 0.5 },
      color: { value: "#7c3aed" },
      opacity: { value: { min: 0.1, max: 0.3 } },
      links: {
        enable: true,
        color: "#7c3aed",
        distance: 80,
        opacity: 0.1,
      },
    },
  };

  return (
    <Section id="projects" label="Seção de Projetos" background="gradient">
      <motion.div
        className="container mx-auto px-5 py-16 sm:py-20 relative" // Ajuste de padding
      >
        <Particles
          id="tsparticles-projects"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />

        {/* Cabeçalho com margens ajustadas */}
        <div className="relative z-10 mb-12 sm:mb-16 px-2"> {/* Ajuste de margin */}
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-white font-mono tracking-wide"
          >
            <span className="text-indigo-400">$</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              meus_projetos
            </span>{" "}
            --interativo
          </motion.h2>
          <motion.p
            className="text-center text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4" // Ajuste de padding e tamanho
          >
            Explore meus projetos do GitHub com slides interativos
          </motion.p>
        </div>

        {/* Container do slider com altura responsiva */}
        <div className="relative w-full h-[480px] sm:h-[560px] overflow-hidden mx-auto max-w-6xl"> {/* Ajuste de height e max-width */}
          <AnimatePresence mode="popLayout">
            <div className="flex items-center justify-center h-full">
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

        {/* Controles de navegação */}
        <div className="relative z-10 mt-10 sm:mt-14 px-4"> {/* Ajuste de margin */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <div className="flex gap-4 sm:gap-6">
              <NavigationButton direction="prev" onClick={prevSlide} />
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 sm:p-3.5 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30" // Ajuste de padding
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </motion.button>
              <NavigationButton direction="next" onClick={nextSlide} />
            </div>

            <div className="flex gap-3 sm:gap-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="focus:outline-none"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? "w-6 bg-indigo-400" 
                        : "w-3 bg-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Link para GitHub */}
          <motion.a
            href="https://github.com/Dev-GustavoRibeiro"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 text-base sm:text-lg" // Ajuste de tamanho
          >
            <Github size={22} />
            <span>Ver todos os projetos no GitHub</span>
          </motion.a>
        </div>
      </motion.div>
    </Section>
  );
}