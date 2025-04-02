'use client';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaAward } from 'react-icons/fa';

export default function FormationImage() {
  return (
    <motion.div
      className="hidden md:flex flex-col items-center justify-center w-56 lg:w-64 relative"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="relative">
        <FaUserGraduate className="text-[115px] text-indigo-400/30" />
        <FaAward className="absolute -bottom-2 -right-4 text-3xl text-indigo-300 animate-pulse" />
      </div>
      <div className="mt-5 bg-indigo-600/80 text-white text-xs px-5 py-1 rounded-full shadow-lg">
        Em progresso
      </div>
    </motion.div>
  );
}