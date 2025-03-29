"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Section from "../Section"
import ProjectSlide from "./ProjectSlide"
import NavigationButton from "./NavigationButton"
import { fetchGitHubRepos, getProjectDetails } from "../../lib/githubApi"

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Busca os repositórios do GitHub
        const repos = await fetchGitHubRepos("Dev-GustavoRibeiro")
        
        // Combina os dados do GitHub com os dados locais
        const projectsData = await Promise.all(
          repos.map(async (repo) => {
            const details = await getProjectDetails(repo)
            const localProject = projects.find(p => p.repoName.toLowerCase() === repo.name.toLowerCase())
            return {
              ...details,
              ...localProject, // Sobrescreve com dados locais se existirem
            }
          })
        )

        // Filtra projetos válidos e ordena por data de atualização
        const validProjects = projectsData
          .filter(project => project !== null)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

        setProjects(validProjects)
      } catch (err) {
        console.error("Erro ao carregar projetos:", err)
        setError("Falha ao carregar projetos do GitHub")
      } finally {
        setLoading(false)
      }
    }

    loadProjects()

    // Atualização periódica (opcional)
    const interval = setInterval(loadProjects, 300000)
    return () => clearInterval(interval)
  }, [])

  // Navegação automática
  useEffect(() => {
    if (projects.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [projects]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [projects])

  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length)
  }

  if (loading) {
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
    )
  }

  if (error) {
    return (
      <Section id="projects" label="Projects Section" background="gradient">
        <div className="text-center text-red-400 py-12">
          {error}
        </div>
      </Section>
    )
  }

  if (projects.length === 0) {
    return (
      <Section id="projects" label="Projects Section" background="gradient">
        <div className="text-center text-gray-400 py-12">
          Nenhum projeto encontrado
        </div>
      </Section>
    )
  }

  return (
    <Section
      id="projects"
      label="Projects Section"
      background="gradient"
      highlight={true}
      showDivider={true}
    >
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 40],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Título */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-center text-white mb-12 md:mb-16 font-mono tracking-wide"
      >
        <span className="text-indigo-400">$</span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          my_projects
        </span>{" "}
        --interactive
      </motion.h2>

      {/* Carrossel */}
      <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <div className="flex items-center justify-center gap-4 md:gap-8 relative h-full">
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.id}
                project={project}
                isActive={index === activeIndex}
                position={index - activeIndex}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Navegação */}
      <div className="flex flex-col items-center mt-8 md:mt-12 gap-6">
        <div className="flex justify-center gap-6 md:gap-8">
          <NavigationButton direction="prev" onClick={prevSlide} />
          <NavigationButton direction="next" onClick={nextSlide} />
        </div>
        
        {/* Indicadores */}
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
                animate={{ 
                  width: index === activeIndex ? 24 : 12
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
          }
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          {"<"}
        </button>
        <button
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % projects.length)
          }
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          {">"}
        </button>
      </div>
    </Section>
  )
}