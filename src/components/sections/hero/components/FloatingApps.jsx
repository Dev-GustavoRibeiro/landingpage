'use client'
import { useState, useEffect, useRef } from "react"
import { FaTimes } from "react-icons/fa"
import { Rnd } from "react-rnd"

export default function FloatingApps({ activeApp, setActiveApp }) {
  const [youtubeQuery, setYoutubeQuery] = useState("")
  const [videoId, setVideoId] = useState("_Yhyp-_hX2s")
  const [isMobile, setIsMobile] = useState(false)
  const rndRef = useRef(null)
  const defaultVideos = ["_Yhyp-_hX2s"]

  // Verifica se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Configuração inicial do vídeo
  useEffect(() => {
    if (activeApp === "youtube" && !youtubeQuery) {
      const random = defaultVideos[Math.floor(Math.random() * defaultVideos.length)]
      setVideoId(random)
    }
  }, [activeApp, youtubeQuery])

  // Busca no YouTube
  const handleYoutubeSearch = async (e) => {
    e.preventDefault()
    if (!youtubeQuery.trim()) return

    try {
      const response = await fetch(
        `/api/youtube-search?q=${encodeURIComponent(youtubeQuery)}`
      )
      const data = await response.json()
      const firstVideo = data.items?.[0]
      if (firstVideo) {
        setVideoId(firstVideo.id.videoId)
      }
    } catch (error) {
      console.error("Erro ao buscar vídeo no YouTube:", error)
      // Fallback para vídeo padrão em caso de erro
      setVideoId(defaultVideos[0])
    }
  }

  // Fecha o player
  const closePlayer = () => {
    setActiveApp(null)
  }

  // Configurações responsivas
  const getDefaultPosition = () => ({
    x: isMobile ? 10 : 20,
    y: isMobile ? 10 : 50,
    width: isMobile ? 300 : 350,
    height: isMobile ? 220 : 250
  })

  if (activeApp !== "youtube") return null

  return (
    <Rnd
      ref={rndRef}
      default={getDefaultPosition()}
      bounds="window"
      minWidth={isMobile ? 280 : 300}
      minHeight={isMobile ? 200 : 220}
      dragHandleClassName="handle"
      enableResizing={!isMobile} // Desativa redimensionamento em mobile
      style={{ zIndex: 1000 }}
      disableDragging={isMobile} // Desativa arrastar em mobile
    >
      <div className="rounded-xl bg-black shadow-xl border border-white/10 flex flex-col overflow-hidden h-full w-full">
        {/* Cabeçalho */}
        <div className="handle bg-gray-900 px-3 py-2 text-white text-xs font-semibold flex justify-between items-center">
          <span>YouTube Player</span>
          <button
            onClick={closePlayer}
            className="cursor-pointer hover:text-red-500 focus:outline-none"
            aria-label="Fechar player"
            style={{
              padding: isMobile ? '8px' : '4px', // Área de toque maior em mobile
              touchAction: 'manipulation' // Melhora resposta em touch
            }}
          >
            <FaTimes size={isMobile ? 18 : 16} />
          </button>
        </div>

        {/* Campo de busca */}
        <form onSubmit={handleYoutubeSearch} className="px-3 py-2">
          <input
            type="text"
            placeholder="Buscar música..."
            value={youtubeQuery}
            onChange={(e) => setYoutubeQuery(e.target.value)}
            className="px-3 py-2 rounded w-full text-sm text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{
              fontSize: isMobile ? '14px' : '13px',
              padding: isMobile ? '10px 12px' : '8px 12px'
            }}
          />
        </form>

        {/* Player do YouTube */}
        <div className="flex-1 relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
            title="YouTube Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Botão de fechar adicional para mobile */}
        {isMobile && (
          <div className="p-3 border-t border-gray-700">
            <button
              onClick={closePlayer}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              Fechar Player
            </button>
          </div>
        )}
      </div>
    </Rnd>
  )
}