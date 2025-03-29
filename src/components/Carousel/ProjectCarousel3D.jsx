// ProjectsCarousel3D.jsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ProjectSlide from "./ProjectSlide"
import { projects } from "@/lib/projects"
import { ArrowLeft, ArrowRight, Code2, Server, Terminal, Network } from "lucide-react"

export default function ProjectsCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = projects.length
  const intervalRef = useRef(null)

  const rotateLeft = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const rotateRight = () => {
    setActiveIndex((prev) => (prev + 1) % total)
  }

  useEffect(() => {
    intervalRef.current = setInterval(rotateRight, 8000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") rotateLeft()
      if (e.key === "ArrowRight") rotateRight()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[620px] perspective-[1500px] overflow-hidden">
      {/* Ícones flutuantes no fundo com framer-motion */}
      <motion.div
        className="fixed inset-0 -z-30 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-[15%] top-[20%] opacity-10 animate-pulse">
          <Code2 className="w-20 h-20 text-indigo-400/40 blur-sm drop-shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute right-[12%] top-[50%] opacity-10 animate-bounce">
          <Network className="w-16 h-16 text-indigo-300/40 blur-sm drop-shadow-[0_0_12px_rgba(129,140,248,0.4)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute left-[35%] bottom-[15%] opacity-10">
          <Terminal className="w-24 h-24 text-indigo-500/40 blur-md drop-shadow-[0_0_18px_rgba(99,102,241,0.6)] hover:scale-105 transition-transform" />
        </div>
        <div className="absolute right-[38%] top-[70%] opacity-10 animate-ping delay-700">
          <Server className="w-14 h-14 text-indigo-300/30 blur-md drop-shadow-[0_0_16px_rgba(129,140,248,0.5)] hover:scale-105 transition-transform" />
        </div>
      </motion.div>

      <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-1000 ease-in-out flex items-center justify-center">
        {projects.map((project, index) => {
          const offset = index - activeIndex
          const modOffset = ((offset + total) % total > total / 2)
            ? offset - total
            : offset
          const rotateY = modOffset * 40
          const translateZ = 500

          return (
            <div
              key={project.id}
              className="absolute transition-all duration-700 ease-in-out w-[90%] sm:w-[85%] md:w-[460px] h-full"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                opacity: Math.abs(modOffset) > 2 ? 0 : 1,
                pointerEvents: index === activeIndex ? "auto" : "none",
                zIndex: -Math.abs(modOffset),
              }}
            >
              <ProjectSlide project={project} isActive={index === activeIndex} />
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-10">
        <button
          onClick={rotateLeft}
          className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-indigo-500/30 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={rotateRight}
          className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-indigo-500/30 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
