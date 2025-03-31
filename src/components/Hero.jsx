"use client"

import { motion, useAnimation } from "framer-motion"
import { useCallback, useRef, useState, useEffect } from "react"
import Particles from "react-tsparticles"
import { FaYoutube, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa"
import dynamic from "next/dynamic"

// RND para a janela flutuante do YouTube
const Rnd = dynamic(() => import("react-rnd").then((mod) => mod.Rnd), {
  ssr: false,
  loading: () => null,
})

// Componente para texto expansível
const ExpandableText = ({ children, maxLength = 120, className = "" }) => {
  const [expanded, setExpanded] = useState(false)
  const toggle = () => setExpanded(!expanded)
  const text = typeof children === "string" ? children : ""
  if (!text) return null

  const displayText =
    expanded || text.length <= maxLength ? text : text.slice(0, maxLength) + "..."

  return (
    <motion.p
      onClick={toggle}
      className={`cursor-pointer ${className}`}
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.5 }}
    >
      {displayText}{" "}
      {text.length > maxLength && (
        <span className="text-indigo-400 font-bold">
          {expanded ? "Ver menos" : "Ver mais"}
        </span>
      )}
    </motion.p>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  const particlesInit = useCallback(async (engine) => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  const screenRef = useRef()
  const screenAnimation = useAnimation()
  const [activeApp, setActiveApp] = useState(null)
  const [youtubeQuery, setYoutubeQuery] = useState("")
  const [videoId, setVideoId] = useState("_Yhyp-_hX2s")

  const defaultVideos = ["_Yhyp-_hX2s"]

  useEffect(() => {
    if (activeApp === "youtube" && !youtubeQuery) {
      const random =
        defaultVideos[Math.floor(Math.random() * defaultVideos.length)]
      setVideoId(random)
    }
  }, [activeApp, youtubeQuery])

  const handleZoom = async (id) => {
    await screenAnimation.start({
      scale: 1.2,
      y: -50,
      transition: { duration: 0.6, ease: "easeInOut" },
    })
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setTimeout(() => {
      screenAnimation.start({
        scale: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      })
    }, 1000)
  }

  const handleYoutubeSearch = async (e) => {
    e.preventDefault()
    if (!youtubeQuery.trim()) return

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
          youtubeQuery
        )}&key=AIzaSyD0eCfCia5Lh-buVoRS7N5Js-fjJ4oZJkg`
      )
      const data = await response.json()
      const firstVideo = data.items?.[0]
      if (firstVideo) {
        setVideoId(firstVideo.id.videoId)
      }
    } catch (error) {
      console.error("Erro ao buscar vídeo no YouTube:", error)
    }
  }

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full min-h-[80vh] flex items-start justify-center text-white overflow-hidden mt-auto"
    >
      <div className="relative w-[95vw] sm:w-[90vw] max-w-[1800px] h-auto">
        {/* Imagens responsivas: iPhone, iPad, MacBook */}
        <picture>
          <source media="(max-width: 480px)" srcSet="/images/hero-iphone.png" />
          <source media="(max-width: 768px)" srcSet="/images/hero-ipad.png" />
          <img
            src="/images/hero-macbook.png"
            alt="Moldura do Dispositivo"
            className="w-full h-auto object-contain"
          />
        </picture>

        {/* Partículas de fundo */}
        <Particles
          id="tsparticles-hero"
          init={particlesInit}
          options={{
            fullScreen: false,
            background: { color: "transparent" },
            particles: {
              number: { value: 50 }, // Reduzido para telas menores
              size: { value: 2 },
              move: { enable: true, speed: 0.5 },
              color: { value: "#7c3aed" },
              opacity: { value: 0.2 },
              links: { enable: true, color: "#7c3aed", distance: 70, opacity: 0.15 },
            },
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Janela do YouTube flutuante, se ativada */}
        {typeof window !== "undefined" && activeApp === "youtube" && Rnd && (
          <Rnd
            default={{ x: 20, y: 50, width: 280, height: 220 }} // Tamanhos menores para mobile
            bounds="window"
            minWidth={240}
            minHeight={180}
            dragHandleClassName="handle"
            enableResizing={{ bottomRight: true }}
            style={{ zIndex: 1000 }}
          >
            <div className="rounded-xl bg-black shadow-xl border border-white/10 flex flex-col overflow-hidden h-full w-full">
              <div className="handle bg-gray-900 px-3 py-1 text-white text-xs font-semibold cursor-move flex justify-between items-center">
                <span>YouTube Player</span>
                <FaTimes
                  onClick={() => setActiveApp(null)}
                  className="cursor-pointer hover:text-red-500"
                />
              </div>
              <form onSubmit={handleYoutubeSearch} className="px-2 pt-2">
                <input
                  type="text"
                  placeholder="Buscar música..."
                  value={youtubeQuery}
                  onChange={(e) => setYoutubeQuery(e.target.value)}
                  className="px-2 py-1 rounded w-full text-xs text-white"
                />
              </form>
              <iframe
                className="flex-1"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Rnd>
        )}

        {/* Área que simula a "tela" do dispositivo */}
        <motion.div
          ref={screenRef}
          animate={screenAnimation}
          className={`
            absolute z-10 flex flex-col justify-between
            /* Extra Small */
            top-[6%] left-[4%] w-[92%] h-[70%]
            /* sm */
            sm:top-[8%] sm:left-[8%] sm:w-[84%] sm:h-[65%]
            /* md */
            md:top-[10%] md:left-[12%] md:w-[76%] md:h-[60%]
            /* lg */
            lg:top-[12%] lg:left-[16%] lg:w-[68%] lg:h-[50%]
          `}
        >
          {/* Conteúdo: foto + texto + botões */}
          <motion.div
            variants={containerVariants}
            className="flex-1 flex flex-col items-center justify-center px-2 sm:px-3 md:flex-row md:px-4"
          >
            {/* Foto */}
            <motion.div
              variants={textVariants}
              className="flex-shrink-0 flex justify-center mb-3 sm:mb-4 md:mb-0"
            >
              <img
                src="/images/foto1.png"
                alt="Foto de Gustavo Ribeiro"
                loading="lazy"
                className="
                  w-20 xs:w-24 sm:w-32 md:w-40 lg:w-60 
                  h-auto object-cover 
                  drop-shadow-2xl 
                  rounded-full border-4 border-indigo-500/30 
                  hover:scale-105 transition-transform duration-500
                "
              />
            </motion.div>

            {/* Texto e informações */}
            <motion.div
              variants={containerVariants}
              className="text-center md:text-left max-w-md md:ml-4 space-y-2 sm:space-y-3"
            >
              <motion.h1
                variants={textVariants}
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-indigo-400"
              >
                Gustavo Ribeiro
              </motion.h1>
              <motion.p
                variants={textVariants}
                className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-indigo-100"
              >
                Desenvolvedor Full Cycle
              </motion.p>
              {/* Expandable description */}
              <ExpandableText
                maxLength={80} // Reduzido para telas menores
                className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed"
              >
                Soluções modernas do front-end ao back-end, com APIs, DevOps, automação e foco total em performance. 
                Sempre em busca de inovação e melhoria contínua, unindo criatividade e tecnologia para transformar ideias em realidade. 
                Experiência com frameworks modernos, metodologias ágeis e design responsivo.
              </ExpandableText>
              {/* Botões */}
              <motion.div
                    variants={textVariants}
                    className="flex flex-col xs:flex-row gap-1.5 xs:gap-2 justify-center md:justify-start mt-1.5 sm:mt-2"
                  >
                    <button
                      onClick={() => handleZoom("perfil")}
                      className="bg-white text-indigo-700 font-medium 
                        px-3 py-1.5 rounded-full shadow-lg 
                        transition-all duration-300 
                        hover:scale-105 active:scale-95 hover:shadow-indigo-500/30 
                        text-xs xs:text-sm sm:text-[13px] md:text-sm
                        min-w-[90px] xs:min-w-[100px] sm:min-w-[110px]"
                    >
                      Saiba Mais
                    </button>
                    <button
                      onClick={() => handleZoom("contact")}
                      className="bg-indigo-600 text-white font-medium 
                        px-3 py-1.5 rounded-full shadow-lg 
                        transition-all duration-300 
                        hover:scale-105 active:scale-95 hover:shadow-white/20 
                        text-xs xs:text-sm sm:text-[13px] md:text-sm
                        min-w-[90px] xs:min-w-[100px] sm:min-w-[110px]"
                    >
                      Contrate-me
                    </button>
                </motion.div>
            </motion.div>
          </motion.div>

          {/* Mini-menu no rodapé da "tela" do dispositivo */}
          <div className="
              flex gap-3 xs:gap-4 sm:gap-5 text-base sm:text-lg 
              bg-black/30 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 
              rounded-xl backdrop-blur-sm shadow-lg
              items-center justify-center
              w-full max-w-[280px] xs:max-w-[320px] sm:max-w-none
            ">
              <button 
                onClick={() => setActiveApp("youtube")}
                className="text-red-500 hover:scale-110 active:scale-95 transition-transform"
                aria-label="YouTube"
              >
                <FaYoutube size={18} className="xs:scale-110 sm:scale-125" />
              </button>
              
              <a
                href="https://github.com/Dev-GustavoRibeiro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:scale-110 active:scale-95 transition-transform"
                aria-label="GitHub"
              >
                <FaGithub size={18} className="xs:scale-110 sm:scale-125" />
              </a>
              
              <a
                href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:scale-110 active:scale-95 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} className="xs:scale-110 sm:scale-125" />
              </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}