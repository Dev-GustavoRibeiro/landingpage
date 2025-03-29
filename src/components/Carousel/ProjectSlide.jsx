"use client"

import { useState, useEffect, useRef } from "react"
import ProjectSlide from "./ProjectSlide"
import { projects } from "../../data/projects"

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

      {/* Botões de navegação */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 z-10">
        <button
          onClick={rotateLeft}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-indigo-500/30 transition"
        >
          &larr;
        </button>
        <button
          onClick={rotateRight}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-indigo-500/30 transition"
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}
