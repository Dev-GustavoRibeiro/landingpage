import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsTerminal, BsJoystick, BsX } from "react-icons/bs";
import { games } from "./constants";

export default function CommandPalette({ 
  showCommandPalette, 
  setShowCommandPalette,
  commands,
  startGame
}) {
  const [commandSearch, setCommandSearch] = useState("");
  const commandInputRef = useRef(null);

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <AnimatePresence>
      {showCommandPalette && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setShowCommandPalette(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-indigo-950 border border-indigo-700/50 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-indigo-800/50">
              <div className="flex items-center gap-3">
                <BsTerminal className="text-indigo-400" size={20} />
                <input
                  ref={commandInputRef}
                  type="text"
                  placeholder="Digite um comando ou pesquise..."
                  className="bg-transparent border-none outline-none text-white w-full placeholder-indigo-400"
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                />
                <div className="text-xs text-indigo-400 border border-indigo-700/50 px-2 py-1 rounded">ESC</div>
              </div>
            </div>
            
            {/* Seção de jogos em destaque */}
            {!commandSearch && (
              <div className="p-3 border-b border-indigo-800/50">
                <h3 className="text-indigo-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <BsJoystick />
                  Jogos Clássicos
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {games.map((game) => (
                    <motion.button
                      key={game.id}
                      className="bg-indigo-800/30 hover:bg-indigo-700/40 rounded-lg p-3 flex flex-col items-center gap-2 text-center"
                      onClick={() => {
                        startGame(game.id);
                        setShowCommandPalette(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="p-2 bg-indigo-700/50 rounded-full">
                        {game.icon}
                      </div>
                      <span className="text-white text-sm">{game.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <motion.button
                    key={index}
                    className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-indigo-800/30 text-indigo-100"
                    onClick={() => {
                      cmd.action();
                      setShowCommandPalette(false);
                    }}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <span className="text-indigo-400">{cmd.icon}</span>
                    <span>{cmd.name}</span>
                  </motion.button>
                ))
              ) : (
                <div className="p-4 text-center text-indigo-400">
                  Nenhum comando encontrado
                </div>
              )}
            </div>
            <div className="p-3 border-t border-indigo-800/50 text-xs text-indigo-400 flex justify-between">
              <span>Dica: Use as setas para navegar</span>
              <span>Enter para selecionar</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}