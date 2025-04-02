"use client";

import { motion } from "framer-motion";
import AboutDecorations from "./AboutDecorations";
import AboutImage from "./AboutImage.jsx";
import AboutContent from "./AboutContent";

export default function AboutSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <motion.section
      id="perfil"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-4 sm:px-6 py-12 md:py-20 relative text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 backdrop-blur-xl"
    >
      <AboutDecorations />
      
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        <AboutImage />
        <AboutContent />
      </motion.div>
    </motion.section>
  );
}