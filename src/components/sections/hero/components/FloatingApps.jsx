import { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import { Rnd } from "react-rnd"

export default function FloatingApps({ activeApp, setActiveApp }) {
  const [youtubeQuery, setYoutubeQuery] = useState("")
  const [videoId, setVideoId] = useState("_Yhyp-_hX2s")
  const defaultVideos = ["_Yhyp-_hX2s"]

  useEffect(() => {
    if (activeApp === "youtube" && !youtubeQuery) {
      const random = defaultVideos[Math.floor(Math.random() * defaultVideos.length)]
      setVideoId(random)
    }
  }, [activeApp, youtubeQuery])

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
    }
  }

  if (activeApp !== "youtube") return null

  return (
    <Rnd
      default={{ x: 20, y: 50, width: 280, height: 220 }}
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
            className="px-2 py-1 rounded w-full text-xs text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
        <div className="flex-1 relative">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            title="YouTube Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </Rnd>
  )
}