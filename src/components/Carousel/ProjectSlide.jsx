"use client";

import { motion } from "framer-motion";
import { FiStar, FiGithub, FiExternalLink } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

// Configurações de animação
const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

export default function ProjectSlide({ project, isActive, position }) {
  const slideVariants = {
    active: {
      scale: 1.1,
      opacity: 1,
      zIndex: 20,
      x: "0%",
      rotateY: 0,
      filter: "brightness(1) drop-shadow(0 15px 30px rgba(99, 102, 241, 0.3))",
      transition: {
        ...ANIMATION_CONFIG,
        type: "spring",
        stiffness: 90,
        damping: 20,
      },
    },
    next: {
      scale: 0.95,
      opacity: 0.8,
      zIndex: 10,
      x: "30%", // Ajustado para espaçamento adequado
      rotateY: "-10deg",
      filter: "brightness(0.7) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.2))",
      transition: ANIMATION_CONFIG,
    },
    prev: {
      scale: 0.95,
      opacity: 0.8,
      zIndex: 10,
      x: "-30%", // Ajustado para espaçamento adequado
      rotateY: "10deg",
      filter: "brightness(0.7) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.2))",
      transition: ANIMATION_CONFIG,
    },
    hidden: {
      scale: 0.75,
      opacity: 0,
      zIndex: 0,
      x: `${position > 0 ? "200%" : "-200%"}`,
      rotateY: `${position > 0 ? "-20deg" : "20deg"}`,
      transition: ANIMATION_CONFIG,
    },
  };

  const contentVariants = {
    active: {
      opacity: 1,
      y: 0,
      transition: { ...ANIMATION_CONFIG, delay: 0.3 },
    },
    inactive: {
      opacity: 0,
      y: 15,
      transition: ANIMATION_CONFIG,
    },
  };

  const imageVariants = {
    active: {
      scale: 1,
      transition: { ...ANIMATION_CONFIG, delay: 0.1 },
    },
    inactive: {
      scale: 1.03,
      transition: ANIMATION_CONFIG,
    },
  };

  const getVariant = () => {
    if (isActive) return "active";
    if (position === 1) return "next";
    if (position === -1) return "prev";
    return "hidden";
  };

  const formatDate = (dateString) => {
    const options = { month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      animate={getVariant()}
      whileHover={isActive ? { scale: 1.12, transition: { duration: 0.3 } } : {}}
      className={`absolute w-[90%] sm:w-[85%] md:w-[600px] h-[400px] rounded-2xl p-4 
        ${
          isActive
            ? "bg-gradient-to-br from-gray-800/90 via-indigo-900/70 to-gray-900/90 backdrop-blur-xl border border-indigo-500/30 shadow-xl"
            : "bg-gray-900/60 backdrop-blur-md border border-gray-700/20 shadow-md"
        } overflow-hidden flex flex-col`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Imagem Ampliada */}
      <motion.div
        className="relative w-full h-80 rounded-xl overflow-hidden group"
        variants={imageVariants}
        animate={isActive ? "active" : "inactive"}
      >
        <motion.img
          src={
            project.previewImages?.[0] ||
            `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${project.repoName}/main/preview.png`
          }
          alt={`Preview do projeto ${project.name}`}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/project-fallback.jpg";
          }}
        />
      </motion.div>

      {/* Conteúdo do projeto */}
      <motion.div
        variants={contentVariants}
        animate={isActive ? "active" : "inactive"}
        className="flex-1 flex flex-col mt-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white tracking-tight uppercase">
            {project.name}
          </h3>
          <div className="flex items-center text-xs text-gray-300">
            <FiStar className="mr-1 text-yellow-400" />
            {project.stars || 5}
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-1 line-clamp-2 leading-tight">
          {project.description || "Sem descrição disponível"}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs text-gray-400">{formatDate(project.createdAt)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}