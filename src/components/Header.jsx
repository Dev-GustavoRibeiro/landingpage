"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { 
  BsGithub, BsLinkedin, BsList, BsX, BsRocket, 
  BsEmojiSunglasses, BsMusicNoteBeamed, BsStars,
  BsHeartFill, BsLightningFill, BsRobot, BsYoutube,
  BsPerson, BsBook, BsBriefcase, BsCodeSlash, BsCollection, BsEnvelope,
  BsSpotify
} from "react-icons/bs";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const MotionNav = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.nav),
  { ssr: false }
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeEasterEgg, setActiveEasterEgg] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();


  // Configuração dos Easter Eggs com músicas
  const easterEggs = {
    "TURBO": {
      icon: <BsRocket className="text-purple-400" />,
      color: "from-purple-900 to-indigo-900",
      effect: "rotate",
      duration: 30000,
      music: "https://www.youtube.com/embed/qig2RneE3VY?autoplay=1",
      hint: "Relaxa e aproveita o flow!"
    },
    "DANCE": {
      icon: <BsEmojiSunglasses className="text-pink-400" />,
      color: "from-pink-900 to-rose-900",
      effect: "bounce",
      duration: 30000,
      music: "https://www.youtube.com/embed/WpzuDyiwfSg?autoplay=1",
      hint: "Hora do passinho!"
    },
    "LOVE": {
      icon: <BsHeartFill className="text-red-400" />,
      color: "from-red-900 to-pink-900",
      effect: "heartbeat",
      duration: 30000,
      music: "https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1",
      hint: "Amor e alegria!"
    },
    "POWER": {
      icon: <BsLightningFill className="text-blue-400" />,
      color: "from-blue-900 to-cyan-900",
      effect: "shake",
      duration: 30000,
      music: "https://www.youtube.com/embed/_Yhyp-_hX2s?autoplay=1",
      hint: "Momento de superação!"
    },
    "ROBOT": {
      icon: <BsRobot className="text-green-400" />,
      color: "from-green-900 to-emerald-900",
      effect: "robot-dance",
      duration: 30000,
      music: "https://www.youtube.com/embed/8CdcCD5V-d8?autoplay=1",
      hint: "Fluxo robótico!"
    }
  };

  // Links de navegação com ícones
  const navLinks = [
    { label: "Perfil", href: "#perfil", icon: <BsPerson className="mr-2" /> },
    { label: "Formação", href: "#formacao", icon: <BsBook className="mr-2" /> },
    { label: "Experiência", href: "#experiencia", icon: <BsBriefcase className="mr-2" /> },
    { label: "Habilidades", href: "#skills", icon: <BsCodeSlash className="mr-2" /> },
    { label: "Projetos", href: "#projects", icon: <BsCollection className="mr-2" /> },
    { label: "Contato", href: "#contact", icon: <BsEnvelope className="mr-2" /> },
  ];

  // Ajuste de estilo ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Captura de teclas para ativar Easter Eggs
  const handleKeyDown = useCallback((e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    setTypedText(prev => (prev + e.key).slice(-20).toUpperCase());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    for (const [word, config] of Object.entries(easterEggs)) {
      if (typedText.includes(word)) {
        activateEasterEgg(word, config);
        setTypedText("");
        break;
      }
    }
  }, [typedText]);

  const activateEasterEgg = (word, config) => {
    setActiveEasterEgg(word);
    setTimeout(() => setActiveEasterEgg(null), config.duration);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Define as propriedades de animação com base no efeito do Easter Egg ativo
  const getAnimationProps = () => {
    if (!activeEasterEgg) return {};
    
    const config = easterEggs[activeEasterEgg];
    
    switch(config.effect) {
      case "rotate":
        return {
          animate: { rotate: 360 },
          transition: { repeat: Infinity, duration: 2, ease: "linear" }
        };
      case "bounce":
        return {
          animate: { y: [0, -15, 0] },
          transition: { repeat: Infinity, duration: 0.5 }
        };
      case "heartbeat":
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { repeat: Infinity, duration: 1 }
        };
      case "shake":
        return {
          animate: { x: [0, 10, -10, 0] },
          transition: { repeat: Infinity, duration: 0.3 }
        };
      case "robot-dance":
        return {
          animate: { 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.05, 1]
          },
          transition: { repeat: Infinity, duration: 1 }
        };
      default:
        return {};
    }
  };

  return (
    <>
      <motion.header

        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          background: activeEasterEgg 
            ? `linear-gradient(90deg, ${easterEggs[activeEasterEgg].color})`
            : "linear-gradient(90deg, #312e81 0%, #000000 50%, #312e81 100%)"
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-indigo-700/30 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo com efeito 3D */}
          <motion.div
            onClick={scrollToTop}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div {...getAnimationProps()} className="relative">
              <motion.img
                src="/images/logo.png"
                alt="Logo"
                className="w-auto h-8 object-contain drop-shadow-xl"
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

          {/* Navegação para desktop */}
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
                    className={`px-4 py-2 rounded-lg flex items-center transition-all ${
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
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Redes Sociais para desktop */}
          <div className="hidden md:flex items-center space-x-3">
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
          </div>

          {/* Botão de Menu para mobile */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            className="md:hidden p-2 rounded-lg bg-indigo-800/50 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <BsX size={24} className="text-white" /> : <BsList size={24} className="text-white" />}
          </motion.button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <MotionNav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-gradient-to-b from-indigo-900/95 to-black/95 backdrop-blur-lg px-4 overflow-hidden"
          >
            <div className="flex flex-col py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className="px-4 py-3 rounded-lg flex items-center text-white hover:bg-indigo-800/50 transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </motion.div>
                </Link>
              ))}

              <div className="flex justify-center space-x-4 pt-4">
                {[
                  { icon: <BsGithub size={20} />, href: "https://github.com/Dev-GustavoRibeiro" },
                  { icon: <BsLinkedin size={20} />, href: "https://linkedin.com/in/gustavo-ribeiro-48b18433b/" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Ativação dos Easter Eggs no mobile */}
              <div className="pt-4">
                <p className="text-xs text-center text-indigo-300 mb-2">Ativar modos especiais:</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(easterEggs).map(([word, config]) => (
                    <motion.button
                      key={word}
                      onClick={() => activateEasterEgg(word, config)}
                      className={`px-2 py-1 rounded-md text-xs flex items-center justify-center gap-1 ${
                        activeEasterEgg === word ? "bg-white/20 text-white" : "bg-indigo-900/50 text-indigo-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {config.icon}
                      {word}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </MotionNav>
        )}
      </motion.header>

      {/* Espaçador para evitar que o conteúdo fique escondido atrás do header fixo */}
      <div className="h-16 md:h-20" />

      {/* Player de música (caso algum Easter Egg esteja ativo) */}
      {activeEasterEgg && easterEggs[activeEasterEgg]?.music && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-black/80 rounded-xl p-3 shadow-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 text-white mb-2">
              <BsYoutube className="text-red-500 flex-shrink-0" />
              <div className="text-sm truncate max-w-xs">
                {easterEggs[activeEasterEgg].hint}
              </div>
              <button 
                onClick={() => setActiveEasterEgg(null)}
                className="ml-auto text-white/50 hover:text-white"
              >
                <BsX size={18} />
              </button>
            </div>
            <iframe
              width="280"
              height="80"
              src={easterEggs[activeEasterEgg].music}
              title="YouTube player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="rounded-lg"
            ></iframe>
          </div>
        </motion.div>
      )}
    </>
  );
}
