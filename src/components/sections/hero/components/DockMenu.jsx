import { FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa"

export default function DockMenu({ setActiveApp }) {
  return (
    <div className="
      flex items-center justify-center gap-4
      text-xs sm:text-sm md:text-base
      bg-black/30 
      px-2.5 sm:px-4 md:px-10
      py-1.5 sm:py-2 md:py-3
      w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%]
      max-w-full
      mx-auto 
      rounded-full 
      backdrop-blur-sm 
      shadow-lg
      overflow-hidden
    ">
      <button 
        onClick={() => setActiveApp("youtube")}
        className="text-red-500 hover:scale-110 active:scale-95 transition-transform p-2"
        aria-label="YouTube"
      >
        <FaYoutube size={18} className="xs:scale-110 sm:scale-125" />
      </button>
      
      <a
        href="https://github.com/Dev-GustavoRibeiro"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:scale-110 active:scale-95 transition-transform p-2"
        aria-label="GitHub"
      >
        <FaGithub size={18} className="xs:scale-110 sm:scale-125" />
      </a>
      
      <a
        href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:scale-110 active:scale-95 transition-transform p-2"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={18} className="xs:scale-110 sm:scale-125" />
      </a>
    </div>
  )
}