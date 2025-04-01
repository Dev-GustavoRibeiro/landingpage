import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function GitHubLink() {
  return (
    <motion.a
      href="https://github.com/Dev-GustavoRibeiro"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 text-base sm:text-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Github size={22} />
      <span>Ver todos os projetos no GitHub</span>
    </motion.a>
  );
}