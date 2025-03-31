"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

const ANIMATION_CONFIG = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

export default function ProjectSlide({ project, isActive, position }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const slideVariants = {
    active: {
      scale: [1, 1.1],
      opacity: 1,
      zIndex: 20,
      x: "0%",
      rotateY: 0,
      filter: "brightness(1) drop-shadow(0 20px 40px rgba(99, 102, 241, 0.5))",
      transition: {
        ...ANIMATION_CONFIG,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    next: {
      scale: 0.92,
      opacity: 0.9,
      zIndex: 10,
      x: "40%",
      rotateY: "-20deg",
      filter: "brightness(0.65) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
      transition: ANIMATION_CONFIG,
    },
    prev: {
      scale: 0.92,
      opacity: 0.9,
      zIndex: 10,
      x: "-40%",
      rotateY: "20deg",
      filter: "brightness(0.65) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
      transition: ANIMATION_CONFIG,
    },
    hidden: {
      scale: 0.85,
      opacity: 0,
      zIndex: 0,
      x: `${position > 0 ? "250%" : "-250%"}`,
      rotateY: `${position > 0 ? "-30deg" : "30deg"}`,
      transition: ANIMATION_CONFIG,
    },
  };

  const contentVariants = {
    active: {
      opacity: 1,
      y: 0,
      transition: { ...ANIMATION_CONFIG, delay: 0.4 },
    },
    inactive: {
      opacity: 0,
      y: 25,
      transition: ANIMATION_CONFIG,
    },
  };

  const imageVariants = {
    active: {
      scale: 1,
      transition: { ...ANIMATION_CONFIG, delay: 0.2 },
    },
    inactive: {
      scale: 1.08,
      transition: ANIMATION_CONFIG,
    },
  };

  const buttonVariants = {
    hover: { scale: 1.15, transition: { duration: 0.25 } },
    tap: { scale: 0.9, transition: { duration: 0.15 } },
  };

  const progressBarVariants = {
    active: {
      width: "100%",
      transition: { duration: 5, ease: "linear" }, // 5 segundos
    },
    inactive: {
      width: "0%",
      transition: { duration: 0 },
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
      className={`absolute w-[90%] sm:w-[80%] md:w-[680px] lg:w-[720px] max-w-[95vw] h-auto min-h-[420px] sm:min-h-[500px] md:min-h-[600px] rounded-3xl p-4 sm:p-5 md:p-6
        ${
          isActive
            ? "bg-gradient-to-br from-gray-900/95 via-indigo-950/90 to-gray-900/95 backdrop-blur-2xl border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.6)]"
            : "bg-gray-900/80 backdrop-blur-lg border border-gray-700/40 shadow-xl"
        } overflow-hidden flex flex-col transition-all duration-500`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Imagem */}
      <motion.div
        className="relative w-full h-[160px] sm:h-[200px] md:h-[280px] lg:h-[300px] rounded-xl overflow-hidden group"
        variants={imageVariants}
        animate={isActive ? "active" : "inactive"}
      >
        <motion.img
          src={
            project.previewImages?.[0] ||
            `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${project.repoName}/main/preview.png`
          }
          alt={`Prévia do projeto ${project.name}`}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-115"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/project-fallback.jpg";
          }}
        />
        {isActive && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-indigo-600/90 hover:bg-indigo-700 rounded-full text-white shadow-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                data-tooltip-id="live-tooltip"
                data-tooltip-content="Ver projeto ao vivo"
              >
                <FiExternalLink size={16} />
              </motion.a>
            )}
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-full text-white shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              data-tooltip-id="github-tooltip"
              data-tooltip-content="Ver repositório no GitHub"
            >
              <FiGithub size={16} />
            </motion.a>
          </div>
        )}
      </motion.div>

      {/* Barra de Progresso (aparece apenas no slide ativo) */}
      {isActive && (
        <motion.div
          className="w-full h-1 bg-gray-700/50 rounded-full mt-2 sm:mt-3"
        >
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            variants={progressBarVariants}
            initial="inactive"
            animate="active"
          />
        </motion.div>
      )}

      {/* Conteúdo */}
      <motion.div
        variants={contentVariants}
        animate={isActive ? "active" : "inactive"}
        className="flex-1 flex flex-col mt-4 sm:mt-5 md:mt-6"
      >
        {/* Título + Estrelas */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider truncate">
            {project.name}
          </h3>
          <div className="flex items-center text-xs sm:text-sm text-yellow-400 font-mono">
            <FiStar className="mr-1" />
            {project.stars || 5}
          </div>
        </div>

        {/* Status */}
        <div className="text-xs sm:text-sm text-indigo-300 font-semibold uppercase mb-2 sm:mb-3">
          {project.status === "active"
            ? "🔵 Em Produção"
            : project.status === "development"
            ? "🧪 Em Desenvolvimento"
            : "⚪ Projeto Arquivado"}
        </div>

        {/* Descrição com expansão em telas menores */}
        <div className="text-sm sm:text-base text-gray-200 leading-relaxed">
          <p
            className={`${
              isDescriptionExpanded || window.innerWidth >= 640
                ? "line-clamp-none"
                : "line-clamp-2 sm:line-clamp-3"
            } transition-all duration-300`}
          >
            {project.description || "Sem descrição disponível. Veja mais no repositório!"}
          </p>
          {project.description && project.description.length > 100 && (
            <motion.button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm font-medium sm:hidden"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDescriptionExpanded ? (
                <>
                  <span>Menos</span>
                  <FiChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Mais</span>
                  <FiChevronDown size={14} />
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Tecnologias */}
        {project.techs?.frontend && (
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {project.techs.frontend.slice(0, 5).map((tech) => (
              <motion.span
                key={tech}
                className="px-2 sm:px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-xs sm:text-sm text-indigo-100 hover:bg-indigo-600/30 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.techs.frontend.length > 5 && (
              <span className="px-2 sm:px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-xs sm:text-sm text-indigo-100">
                +{project.techs.frontend.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Rodapé */}
        <div className="mt-auto pt-3 sm:pt-4 md:pt-6 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-400 font-mono">
            Criado em {formatDate(project.createdAt)}
          </span>
          <div className="flex items-center gap-3 sm:gap-4">
            {project.liveUrl && isActive && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-indigo-300 hover:text-indigo-200 font-medium transition-colors"
                variants={buttonVariants}
                whileHover="hover"
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
                className="text-xs sm:text-sm text-indigo-300 hover:text-indigo-200 font-medium transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Código
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tooltips */}
      <Tooltip id="github-tooltip" place="top" className="z-50 text-xs" />
      <Tooltip id="live-tooltip" place="top" className="z-50 text-xs" />
    </motion.div>
  );
}