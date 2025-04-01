"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

const BASE_ANIMATION = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1],
};

const MOBILE_BREAKPOINT = 768;
const SLIDE_DURATION = 10;

export default function ProjectSlide({ project, isActive, position }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const formatDate = useCallback((dateString) => {
    const options = { month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  }, []);

  const slideVariantsDesktop = {
    active: {
      scale: [1, 1.05],
      opacity: 1,
      zIndex: 20,
      x: "0%",
      rotateY: 0,
      filter: "brightness(1) drop-shadow(0 10px 20px rgba(99,102,241,0.3))",
      transition: { ...BASE_ANIMATION, type: "spring", stiffness: 100, damping: 15 },
    },
    next: {
      scale: 0.92,
      opacity: 0.9,
      zIndex: 10,
      x: "40%",
      rotateY: "-15deg",
      filter: "brightness(0.7) drop-shadow(0 5px 10px rgba(0,0,0,0.2))",
      transition: BASE_ANIMATION,
    },
    prev: {
      scale: 0.92,
      opacity: 0.9,
      zIndex: 10,
      x: "-40%",
      rotateY: "15deg",
      filter: "brightness(0.7) drop-shadow(0 5px 10px rgba(0,0,0,0.2))",
      transition: BASE_ANIMATION,
    },
    hidden: {
      scale: 0.85,
      opacity: 0,
      zIndex: 0,
      x: `${position > 0 ? "200%" : "-200%"}`,
      rotateY: `${position > 0 ? "-25deg" : "25deg"}`,
      transition: BASE_ANIMATION,
    },
  };

  const slideVariantsMobile = {
    active: {
      scale: 1,
      opacity: 1,
      zIndex: 20,
      x: "0%",
      transition: { duration: 0.25 },
    },
    next: {
      scale: 0.95,
      opacity: 0,
      zIndex: 10,
      x: "100%",
      transition: { duration: 0.25 },
    },
    prev: {
      scale: 0.95,
      opacity: 0,
      zIndex: 10,
      x: "-100%",
      transition: { duration: 0.25 },
    },
    hidden: {
      scale: 0.9,
      opacity: 0,
      zIndex: 0,
      x: `${position > 0 ? "120%" : "-120%"}`,
      transition: { duration: 0.25 },
    },
  };

  const slideVariants = isMobile ? slideVariantsMobile : slideVariantsDesktop;

  const contentVariants = {
    active: { opacity: 1, y: 0, transition: { ...BASE_ANIMATION, delay: 0.15 } },
    inactive: { opacity: 0, y: 10, transition: BASE_ANIMATION },
  };

  const imageVariants = {
    active: { scale: 1, transition: { ...BASE_ANIMATION, delay: 0.1 } },
    inactive: { scale: 1.03, transition: BASE_ANIMATION },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.15 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const progressBarVariants = {
    active: { width: "100%", transition: { duration: SLIDE_DURATION, ease: "linear" } },
    inactive: { width: "0%", transition: { duration: 0 } },
  };

  const getVariant = () => {
    if (isActive) return "active";
    if (position === 1) return "next";
    if (position === -1) return "prev";
    return "hidden";
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/images/project-fallback.jpg";
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      animate={getVariant()}
      whileHover={!isMobile && isActive ? { scale: 1.07 } : {}}
      className={`absolute w-full max-w-[95vw] sm:w-[85%] md:w-[700px] lg:w-[800px] h-auto rounded-2xl p-3 sm:p-4 md:p-5 overflow-hidden flex flex-col
        ${isActive
          ? "bg-gradient-to-br from-gray-900/95 via-indigo-950/90 to-gray-900/95 backdrop-blur-lg border border-indigo-500/40 shadow-lg"
          : "bg-gray-900/80 backdrop-blur-sm border border-gray-700/30 shadow-sm"}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Imagem de Preview maior */}
      <motion.div
        className="relative w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[340px] rounded-lg overflow-hidden group"
        variants={imageVariants}
        animate={isActive ? "active" : "inactive"}
      >
        <motion.img
          src={
            project.previewImages?.[0] ||
            `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${project.repoName}/main/preview.png`
          }
          alt={`Preview do projeto ${project.name}`}
          loading="eager"
          className={`w-full h-full object-contain rounded-lg transition-all duration-300 group-hover:scale-105 bg-gray-800/50`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        {isActive && (
          <div className="absolute top-2 right-2 flex gap-1.5">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-indigo-600/80 rounded-full text-white shadow-xs"
                variants={buttonVariants}
                whileHover={!isMobile ? "hover" : {}}
                whileTap="tap"
                data-tooltip-id="live-tooltip"
                data-tooltip-content="Ver projeto ao vivo"
              >
                <FiExternalLink size={14} />
              </motion.a>
            )}
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-800/80 rounded-full text-white shadow-xs"
              variants={buttonVariants}
              whileHover={!isMobile ? "hover" : {}}
              whileTap="tap"
              data-tooltip-id="github-tooltip"
              data-tooltip-content="Ver repositório no GitHub"
            >
              <FiGithub size={14} />
            </motion.a>
          </div>
        )}
      </motion.div>

      {isActive && (
        <motion.div className="w-full h-0.5 bg-gray-700/30 rounded-full mt-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            variants={progressBarVariants}
            initial="inactive"
            animate="active"
          />
        </motion.div>
      )}

      <motion.div
        variants={contentVariants}
        animate={isActive ? "active" : "inactive"}
        className="flex-1 flex flex-col mt-3"
      >
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
            {project.name}
          </h3>
          <div className="flex items-center text-xs text-yellow-400/90 font-mono">
            <FiStar className="mr-0.5" size={12} />
            {project.stars || 5}
          </div>
        </div>

        <div className="text-[0.65rem] sm:text-xs text-indigo-300/80 font-semibold uppercase mb-2">
          {project.status === "active"
            ? "🔵 Em Produção"
            : project.status === "development"
            ? "🧪 Em Desenvolvimento"
            : "⚪ Projeto Arquivado"}
        </div>

        <div className="text-xs sm:text-sm text-gray-200/90 leading-relaxed">
          <p
            className={`transition-all duration-200 ${
              isDescriptionExpanded || !isMobile ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {project.description || "Sem descrição disponível. Veja mais no repositório!"}
          </p>
          {project.description && project.description.length > 80 && isMobile && (
            <motion.button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-1 flex items-center gap-1 text-indigo-400/80 text-[0.65rem] font-medium"
              whileHover={!isMobile ? { x: 1 } : {}}
              whileTap="tap"
            >
              {isDescriptionExpanded ? (
                <>
                  <span>Menos</span>
                  <FiChevronUp size={12} />
                </>
              ) : (
                <>
                  <span>Mais</span>
                  <FiChevronDown size={12} />
                </>
              )}
            </motion.button>
          )}
        </div>

        {project.techs?.frontend && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {project.techs.frontend.slice(0, isMobile ? 3 : 5).map((tech) => (
              <motion.span
                key={tech}
                className="px-1.5 py-0.5 bg-indigo-600/15 border border-indigo-500/20 rounded-full text-[0.6rem] sm:text-xs text-indigo-100/90"
                whileHover={!isMobile ? { scale: 1.03 } : {}}
              >
                {tech}
              </motion.span>
            ))}
            {project.techs.frontend.length > (isMobile ? 3 : 5) && (
              <span className="px-1.5 py-0.5 bg-indigo-600/15 border border-indigo-500/20 rounded-full text-[0.6rem] sm:text-xs text-indigo-100/90">
                +{project.techs.frontend.length - (isMobile ? 3 : 5)}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-[0.6rem] sm:text-xs text-gray-400/80 font-mono">
            Criado em {formatDate(project.createdAt)}
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl && isActive && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem] sm:text-xs text-indigo-300/80 font-medium"
                variants={buttonVariants}
                whileHover={!isMobile ? "hover" : {}}
                whileTap="tap"
              >
                Ver Ao Vivo
              </motion.a>
            )}
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.65rem] sm:text-xs text-indigo-300/80 font-medium"
                variants={buttonVariants}
                whileHover={!isMobile ? "hover" : {}}
                whileTap="tap"
              >
                Código
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      <Tooltip id="github-tooltip" place="top" className="z-50 text-xs bg-gray-800/90 backdrop-blur-sm" />
      <Tooltip id="live-tooltip" place="top" className="z-50 text-xs bg-gray-800/90 backdrop-blur-sm" />
    </motion.div>
  );
}