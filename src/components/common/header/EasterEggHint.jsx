import { motion, AnimatePresence } from "framer-motion";
import { BsStars, BsX } from "react-icons/bs";
import { easterEggs } from "./constants";

export default function EasterEggHint({ showEasterEggHint, setShowEasterEggHint }) {
  return (
    <AnimatePresence>
      {showEasterEggHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setShowEasterEggHint(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-indigo-900 to-black border border-indigo-700/50 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-indigo-800/50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BsStars className="text-yellow-400" />
                Easter Eggs Secretos
              </h3>
              <button 
                onClick={() => setShowEasterEggHint(false)}
                className="text-indigo-400 hover:text-white"
              >
                <BsX size={24} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-indigo-200 mb-4">
                Este site contém modos especiais que podem ser ativados digitando palavras-chave no teclado. Descubra-os!
              </p>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(easterEggs).map(([word, config], index) => (
                  <motion.div
                    key={word}
                    className="bg-indigo-800/30 rounded-lg p-3 flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-2 bg-indigo-700/50 rounded-full">
                      {config.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{word}</h4>
                      <p className="text-xs text-indigo-300">{config.hint}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <motion.button
                  onClick={() => setShowEasterEggHint(false)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Entendi, vou descobrir!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}