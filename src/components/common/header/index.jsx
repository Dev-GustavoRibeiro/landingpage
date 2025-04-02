"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsArrowUp, BsYoutube, BsX, BsStars, BsMagic, BsGithub, BsLinkedin, BsTerminal } from "react-icons/bs";
import Navigation from "./Navigation";
import CommandPalette from "./CommandPalette";
import EasterEggHint from "./EasterEggHint";
import GameInterface from "./GameInterface";
import { useEasterEgg } from "./hooks/useEasterEgg";
import useGame from "./hooks/useGame"; // Changed to default import
import { easterEggs, navLinks } from "./constants";



export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showEasterEggHint, setShowEasterEggHint] = useState(false);

  const {
    activeEasterEgg,
    secretCodeProgress,
    handleKeyPress,
    activateEasterEgg
  } = useEasterEgg();

  const {
    // Snake
    snakeDirection,
    snakeBody,
    food,
    score,
    gameSpeed,
    setSnakeDirection,

    // Pong
    paddleLeft,
    paddleRight,
    ball,
    pongGameOver,
    movePongPaddle,

    // Compartilhado
    activeGame,
    gameOver,
    gamePaused,
    startGame,
    restartGame,
    closeGame,
    togglePause,
    handleGameControls
  } = useGame();

  const commands = [
    { name: "Ir para Perfil", action: () => navigateTo("#perfil"), icon: navLinks[0].icon },
    { name: "Ir para Formação", action: () => navigateTo("#formacao"), icon: navLinks[1].icon },
    { name: "Ir para Experiência", action: () => navigateTo("#experiencia"), icon: navLinks[2].icon },
    { name: "Ir para Habilidades", action: () => navigateTo("#skills"), icon: navLinks[3].icon },
    { name: "Ir para Projetos", action: () => navigateTo("#projects"), icon: navLinks[4].icon },
    { name: "Ir para Contato", action: () => navigateTo("#contact"), icon: navLinks[5].icon },
    { name: "Ir para Feedbacks", action: () => navigateTo("#feedbacks"), icon: navLinks[6].icon },
    { name: "Jogar Snake", action: () => startGame("snake"), icon: <BsStars /> },
    { name: "Jogar Pong", action: () => startGame("pong"), icon: <BsStars /> },
    { name: "Ativar Modo TURBO", action: () => activateEasterEgg("TURBO", easterEggs.TURBO), icon: easterEggs.TURBO.icon },
    { name: "Ativar Modo DANCE", action: () => activateEasterEgg("DANCE", easterEggs.DANCE), icon: easterEggs.DANCE.icon },
    { name: "Ativar Modo LOVE", action: () => activateEasterEgg("LOVE", easterEggs.LOVE), icon: easterEggs.LOVE.icon },
    { name: "Ativar Modo POWER", action: () => activateEasterEgg("POWER", easterEggs.POWER), icon: easterEggs.POWER.icon },
    { name: "Ativar Modo ROBOT", action: () => activateEasterEgg("ROBOT", easterEggs.ROBOT), icon: easterEggs.ROBOT.icon },
    { name: "Ativar Modo FIRE", action: () => activateEasterEgg("FIRE", easterEggs.FIRE), icon: easterEggs.FIRE.icon },
    { name: "Ativar Modo SNOW", action: () => activateEasterEgg("SNOW", easterEggs.SNOW), icon: easterEggs.SNOW.icon },
    { name: "Voltar ao Topo", action: () => scrollToTop(), icon: <BsArrowUp /> },
  ];

  const navigateTo = (href) => {
    setShowCommandPalette(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.offsetTop;
      window.scrollTo({
        top: top - 400, // Pequeno ajuste para o título ficar com espaçamento
        behavior: "smooth"
      });
    }
  };
  
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K ou Cmd+K para abrir a paleta de comandos
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
      
      // Escape para fechar modais
      if (e.key === "Escape") {
        setShowCommandPalette(false);
        setShowEasterEggHint(false);
        closeGame();
        setSearchOpen(false);
      }

      // Controles de jogos
      handleGameControls(e);
      
      // Easter eggs
      handleKeyPress(e);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGameControls, handleKeyPress, closeGame]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        onClick={scrollToTop}
        className="fixed top-0 left-0 sm:left-4 z-[51] cursor-pointer px-2 sm:px-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div className="relative flex items-center py-2">
          <motion.img
            src="/images/logo.png"
            alt="Logo"
            className="h-9 md:h-10 w-auto object-contain drop-shadow-xl"
            whileHover={{ rotate: 10, scale: 1.1 }}
          />
          {activeEasterEgg && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg"
            >
              <BsStars className="text-yellow-400 animate-spin" size={14} />
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      <motion.header
        initial={{ y: -100 }}
        animate={{
          y: 0,
          background: activeEasterEgg
            ? `linear-gradient(90deg, ${easterEggs[activeEasterEgg].color})`
            : "linear-gradient(90deg, #312e81 0%, #000000 50%, #312e81 100%)"
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-indigo-700/30 transition-all duration-300 ${scrolled ? "py-1" : "py-2"}`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex justify-between items-center">
          {/* Espaço reservado para a logo que agora está fora do header */}
          <div className="w-16 sm:w-28 md:w-64 opacity-0">
            {/* Este é apenas um espaço reservado para manter o layout */}
          </div>

          <Navigation 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setShowCommandPalette={setShowCommandPalette}
            activeEasterEgg={activeEasterEgg}
            startGame={startGame}
          />
        </div>
      </motion.header>

      {/* Espaçador para evitar que o conteúdo fique escondido atrás do header fixo */}
      <div className="h-14 sm:h-16 md:h-24" />

      {/* Overlay para quando o menu mobile está aberto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-indigo-900/95 backdrop-blur-md z-50 md:hidden border-l border-indigo-700/30 shadow-xl"
          >
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-white text-xl font-semibold">Menu</h2>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-indigo-800/50"
                >
                  <BsX size={24} className="text-white" />
                </motion.button>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <motion.li key={link.href}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link href={link.href} onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-800/50">
                          <span className="text-indigo-300">{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="pt-4 border-t border-indigo-700/30 mt-4">
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="https://github.com/Dev-GustavoRibeiro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="GitHub"
                  >
                    <BsGithub size={20} className="text-white hover:text-purple-300" />
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
                    <BsLinkedin size={20} className="text-white hover:text-blue-400" />
                  </motion.a>
                  <motion.button
                    onClick={() => {
                      setShowCommandPalette(true);
                      setIsOpen(false);
                    }}
                    className="p-2 rounded-full bg-white/5 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Comandos"
                  >
                    <BsTerminal size={20} className="text-white hover:text-indigo-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette 
        showCommandPalette={showCommandPalette}
        setShowCommandPalette={setShowCommandPalette}
        commands={commands}
        startGame={startGame}
      />

      <EasterEggHint 
        showEasterEggHint={showEasterEggHint}
        setShowEasterEggHint={setShowEasterEggHint}
      />

      <GameInterface 
        activeGame={activeGame}
        snakeDirection={snakeDirection}
        snakeBody={snakeBody}
        food={food}
        gameOver={gameOver}
        gamePaused={gamePaused}
        score={score}
        paddleLeft={paddleLeft}
        paddleRight={paddleRight}
        ball={ball}
        pongGameOver={pongGameOver}
        movePongPaddle={movePongPaddle}
        restartGame={restartGame}
        closeGame={closeGame}
        togglePause={togglePause}
        setSnakeDirection={setSnakeDirection}
      />

      {/* Botão de voltar ao topo */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-4 z-40 p-3 rounded-full shadow-lg bg-indigo-800 text-white"
            aria-label="Voltar ao topo"
          >
            <BsArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Player de música (caso algum Easter Egg esteja ativo) */}

    <AnimatePresence>
    {activeEasterEgg && easterEggs[activeEasterEgg]?.music && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-black/80 rounded-xl p-3 shadow-2xl backdrop-blur-sm border border-white/10 w-[330px]">
            <div className="flex items-center gap-2 text-white mb-2">
              <BsStars className="text-yellow-400 flex-shrink-0" />
              <div className="text-sm truncate max-w-xs">
                {easterEggs[activeEasterEgg].hint}
              </div>
              <button
                onClick={() => activateEasterEgg(null)}
                className="ml-auto text-white/50 hover:text-white"
              >
                <BsX size={18} />
              </button>
            </div>

            <iframe
              key={activeEasterEgg} // força recarregamento para autoplay funcionar
              src={`${easterEggs[activeEasterEgg].music}?utm_source=generator`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="rounded-md"
            ></iframe>
          </div>
          </motion.div>
      )}


    </AnimatePresence>


      {/* Indicador de progresso de código secreto */}
      <AnimatePresence>
        {secretCodeProgress && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 z-40 bg-indigo-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-indigo-700/50"
          >
            <div className="flex items-center gap-2">
              <BsMagic className="text-purple-400" />
              <div>
                <div className="text-xs text-indigo-300">Código secreto:</div>
                <div className="text-white font-mono">{secretCodeProgress}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
