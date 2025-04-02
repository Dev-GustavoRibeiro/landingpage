import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function SearchBar({ searchOpen, setSearchOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const results = [
        { title: "Perfil", description: "Informações sobre Gustavo Ribeiro", link: "#perfil" },
        { title: "Projetos", description: "Portfólio de projetos desenvolvidos", link: "#projects" },
        { title: "Habilidades", description: "Competências técnicas e ferramentas", link: "#skills" },
        { title: "Contato", description: "Informações para contato", link: "#contact" },
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full px-4 py-3 bg-indigo-900/90 backdrop-blur-md border-t border-b border-indigo-700/30"
        >
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar no site..."
                className="w-full py-3 px-5 pr-12 rounded-lg bg-black/30 text-white placeholder-indigo-300/50 border-indigo-700/50 border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-700 hover:bg-indigo-600 rounded-md transition-colors"
                aria-label="Buscar"
              >
                <BsSearch className="text-white" />
              </button>
            </form>
            
            {/* Resultados da pesquisa */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 bg-indigo-950/90 border border-indigo-800/50 rounded-lg overflow-hidden shadow-xl"
                >
                  <div className="p-2 text-xs text-indigo-300 border-b border-indigo-800/50">
                    {searchResults.length} resultados encontrados
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <Link 
                        key={index} 
                        href={result.link}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                      >
                        <motion.div
                          className="p-3 hover:bg-indigo-800/30 border-b border-indigo-800/30 last:border-0"
                          whileHover={{ x: 5 }}
                        >
                          <h4 className="text-white font-medium">{result.title}</h4>
                          <p className="text-sm text-indigo-300">{result.description}</p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 text-xs text-indigo-400 flex justify-between items-center border-t border-indigo-800/50">
                    <span>Pressione ESC para fechar</span>
                    <button 
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="text-indigo-300 hover:text-white"
                    >
                      Fechar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Sugestões de pesquisa */}
            {searchQuery && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-4 bg-indigo-950/90 border border-indigo-800/50 rounded-lg text-center"
              >
                <p className="text-indigo-300">Tente pesquisar por: Projetos, Habilidades, Contato</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}