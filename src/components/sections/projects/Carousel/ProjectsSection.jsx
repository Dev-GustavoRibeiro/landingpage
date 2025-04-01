"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "@/components/core/layout/Section";
import useGitHubProjects from "@/hooks/useGitHubProjects";
import Particles from "./components/Particles";
import ProjectSlide from "./components/ProjectSlide";
import Controls from "./components/Controls";
import GitHubLink from "./components/GitHubLink";
import SectionHeader from "./components/SectionHeader";

export default function ProjectsSection() {
  const { projects, isLoading, error } = useGitHubProjects("Dev-GustavoRibeiro");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(null);

  // Debug - verifique os projetos no console
  useEffect(() => {
    if (projects?.length > 0) {
      console.log("Projetos carregados (com fallback):", projects);
    }
  }, [projects]);

  const nextSlide = () => setActiveIndex(prev => (prev + 1) % projects.length);
  const prevSlide = () =>
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);

  // Funções para detectar swipe (toque)
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 50; // px de diferença para considerar como swipe

    if (diffX > swipeThreshold) {
      nextSlide(); // Swipe para a esquerda
    } else if (diffX < -swipeThreshold) {
      prevSlide(); // Swipe para a direita
    }
    setTouchStartX(null);
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  // Fallback visual se nenhum projeto carregar
  if (!projects?.length) {
    return (
      <Section id="projects" label="Seção de Projetos" background="gradient">
        <div className="text-center py-16 text-gray-400 min-h-[50vh] flex flex-col items-center justify-center">
          <p>Nenhum projeto encontrado</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-indigo-600 rounded-md text-white"
          >
            Tentar novamente
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects" label="Seção de Projetos" background="gradient">
      <div className="container mx-auto px-5 py-16 sm:py-20 relative">
        <Particles />
        <SectionHeader />
        
        {/* Área do carrossel com suporte a swipe */}
        <div
          className="relative w-full h-[500px] overflow-hidden mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => {
                const position = index - activeIndex;
                // Mostra apenas o slide ativo e os 2 adjacentes
                if (Math.abs(position) > 1) return null;

                return (
                  <ProjectSlide
                    key={project.id}
                    project={project}
                    isActive={position === 0}
                    position={position}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <Controls
          projects={projects}
          activeIndex={activeIndex}
          isPlaying={isPlaying}
          onPrev={prevSlide}
          onNext={nextSlide}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onDotClick={setActiveIndex}
        />

        <GitHubLink />
      </div>
    </Section>
  );
}

// Componentes de estado (mantidos no mesmo arquivo)
const LoadingState = () => (
  <Section id="projects" label="Seção de Projetos" background="gradient">
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
      />
      <p className="text-gray-400">Carregando projetos...</p>
    </div>
  </Section>
);

const ErrorState = ({ error }) => (
  <Section id="projects" label="Seção de Projetos" background="gradient">
    <div className="text-center py-16 text-gray-400 min-h-[50vh] flex flex-col items-center justify-center">
      <p className="text-red-400 mb-4">Erro ao carregar projetos</p>
      <code className="bg-gray-800 p-2 rounded text-sm mb-4">
        {error.message || String(error)}
      </code>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-indigo-600 rounded-md text-white"
      >
        Tentar novamente
      </button>
    </div>
  </Section>
);
