import { motion } from "framer-motion";

export default function SectionHeader() {
  return (
    <div className="relative z-10 mb-12 sm:mb-16 px-2">
      <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-white font-mono tracking-wide">
        <span className="text-indigo-400">$</span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          meus_projetos
        </span>{" "}
        --interativo
      </motion.h2>
      <motion.p className="text-center text-gray-400 mt-4 text-base sm:text-lg max-w-3xl mx-auto px-4">
        Explore meus projetos do GitHub com slides interativos
      </motion.p>
    </div>
  );
}