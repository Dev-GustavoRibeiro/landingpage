import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsLinkedin, BsList, BsX, BsController, BsTerminal, BsChevronDown } from "react-icons/bs";
import { navLinks } from "./constants";

export default function Navigation({ 
  isOpen, 
  setIsOpen, 
  setShowCommandPalette,
  activeEasterEgg,
  setSearchOpen,
  startGame
}) {
  const [showGamesMenu, setShowGamesMenu] = useState(false);

  return (
    <>
      {/* Navegau00e7u00e3o para desktop */}
      <nav className="hidden md:flex space-x-1">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={link.href}>
              <motion.div
                className={`px-3 lg:px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeEasterEgg 
                    ? "text-white hover:bg-white/10" 
                    : "text-indigo-100 hover:bg-indigo-800/50"
                }`}
                whileHover={{ 
                  y: -3,
                  scale: 1.05,
                  backgroundColor: activeEasterEgg 
                    ? "rgba(255, 255, 255, 0.15)" 
                    : "rgba(79, 70, 229, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-indigo-300">{link.icon}</span>
                <span className="font-medium text-sm lg:text-base">{link.label}</span>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Au00e7u00f5es interativas para desktop */}
      <div className="hidden md:flex items-center space-x-2">
        <motion.button
          onClick={() => setShowCommandPalette(true)}
          className="p-2 rounded-full bg-white/5 backdrop-blur-sm flex items-center gap-1.5 text-white text-sm"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Abrir paleta de comandos"
        >
          <BsTerminal size={16} className="text-indigo-300" />
          <span className="hidden lg:inline">Comandos</span>
          <span className="text-xs opacity-70 border border-white/20 px-1 rounded hidden lg:inline">Ctrl+K</span>
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => setShowGamesMenu(!showGamesMenu)}
            className="p-2 rounded-full bg-white/5 backdrop-blur-sm flex items-center gap-1.5 text-white text-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Jogos"
          >
            <BsController size={16} className="text-indigo-300" />
            <span className="hidden lg:inline">Jogos</span>
            <BsChevronDown size={12} className={`transition-transform ${showGamesMenu ? 'rotate-180' : ''}`} />
          </motion.button>
          
          <AnimatePresence>
            {showGamesMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-1 bg-indigo-900/90 backdrop-blur-md border border-indigo-700/50 rounded-lg shadow-xl overflow-hidden z-50 w-40"
              >
                <div className="py-1">
                  <button 
                    onClick={() => {
                      startGame("snake");
                      setShowGamesMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-indigo-800/50 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Snake
                  </button>
                  <button 
                    onClick={() => {
                      startGame("pong");
                      setShowGamesMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-indigo-800/50 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Pong
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Redes sociais */}
        <div className="flex items-center space-x-2 ml-2">
          <motion.a
            href="https://github.com/Dev-GustavoRibeiro"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <BsGithub size={18} className="text-white hover:text-purple-300" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <BsLinkedin size={18} className="text-white hover:text-blue-400" />
          </motion.a>
        </div>
      </div>

      {/* Botu00e3o de Menu para mobile */}
      <div className="md:hidden flex items-center space-x-3">
        <motion.button
          onClick={() => {
            setShowCommandPalette(true);
          }}
          className="p-2 rounded-lg bg-indigo-800/50 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Comandos"
        >
          <BsTerminal size={20} className="text-white" />
        </motion.button>
        
        <motion.button
          onClick={() => setShowGamesMenu(!showGamesMenu)}
          className="p-2 rounded-lg bg-indigo-800/50 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Jogos"
        >
          <BsController size={20} className="text-white" />
        </motion.button>
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          className="p-2 rounded-lg bg-indigo-800/50 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <BsX size={24} className="text-white" /> : <BsList size={24} className="text-white" />}
        </motion.button>
        
        <AnimatePresence>
          {showGamesMenu && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-4 mt-1 bg-indigo-900/90 backdrop-blur-md border border-indigo-700/50 rounded-lg shadow-xl overflow-hidden z-50 w-40"
            >
              <div className="py-1">
                <button 
                  onClick={() => {
                    startGame("snake");
                    setShowGamesMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-indigo-800/50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Snake
                </button>
                <button 
                  onClick={() => {
                    startGame("pong");
                    setShowGamesMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-white hover:bg-indigo-800/50 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Pong
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}