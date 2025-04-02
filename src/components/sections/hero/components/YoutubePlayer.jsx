'use client';
import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsX } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Dialog } from '@headlessui/react';

// Carregamento dinâmico com fallback melhorado
const YouTubeEmbed = dynamic(
  () => import('react-youtube').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Carregando player...</div>
      </div>
    )
  }
);

export default function YoutubePlayer({ activeApp, setActiveApp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Verifica se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sincroniza o estado do modal
  useEffect(() => {
    setIsOpen(activeApp === "youtube");
  }, [activeApp]);

  // Fecha o modal corretamente
  const closeModal = useCallback(() => {
    setActiveApp(null);
    setIsOpen(false);
  }, [setActiveApp]);

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Opções responsivas para o player
  const getPlayerOpts = useCallback(() => ({
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      playsinline: 1, // Melhora experiência em iOS
    },
  }), []);

  // Eventos do player
  const handlePlayerReady = (event) => {
    // Pode adicionar controles personalizados aqui
    console.log('Player pronto', event);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog 
          static 
          as="div"
          open={isOpen} 
          onClose={closeModal}
          className="fixed inset-0 z-[100]"
        >
          {/* Overlay com gesto de fechar em mobile */}
          <Dialog.Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={isMobile ? closeModal : undefined}
          />
          
          {/* Container principal */}
          <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                damping: 20,
                stiffness: 300
              }}
              className={`
                relative w-full max-w-4xl aspect-video bg-black rounded-lg 
                overflow-hidden shadow-2xl border border-white/10 z-50
                pointer-events-auto
              `}
            >
              {/* Barra de controles */}
              <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-white/10">
                <Dialog.Title className="flex items-center gap-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-white text-xs sm:text-sm ml-2">
                    YouTube - Canal Gustavo Ribeiro
                  </span>
                </Dialog.Title>
                
                {/* Botão de fechar melhorado para mobile */}
                <button
                  onClick={closeModal}
                  className={`
                    text-white hover:text-red-500 transition-colors 
                    focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full
                    ${isMobile ? 'p-1' : ''}
                  `}
                  aria-label="Fechar"
                >
                  <BsX size={isMobile ? 20 : 24} />
                </button>
              </div>
              
              {/* Container do player */}
              <div className="w-full h-[calc(100%-2.5rem)] bg-black">
                <YouTubeEmbed
                  videoId="dQw4w9WgXcQ" // Substitua pelo ID do seu vídeo
                  opts={getPlayerOpts()}
                  className="w-full h-full"
                  onReady={handlePlayerReady}
                  onError={(e) => console.error('Erro no player:', e)}
                  onEnd={() => {
                    console.log('Vídeo finalizado');
                    // Pode adicionar lógica de autoplay aqui
                  }}
                />
              </div>
              
              {/* Controles adicionais para mobile */}
              {isMobile && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <button
                    onClick={closeModal}
                    className="w-full py-2 text-white text-sm bg-red-600/90 rounded"
                  >
                    Fechar Player
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}