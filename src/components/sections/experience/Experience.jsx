'use client';
import { motion } from 'framer-motion';
import ExperienceParticles from './components/ExperienceParticles';
import ExperienceTimeline from './components/ExperienceTimeline';
import ExperienceDecorations from './components/ExperienceDecorations'
import { containerVariants, titleVariants } from './hooks/experienceVariants';

const ExperienceSection = () => {
  return (
    <motion.section
      id="experiencia"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[80px] sm:scroll-mt-[100px] container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 backdrop-blur-xl"
    >
      <ExperienceParticles />
      <ExperienceDecorations />

      <div className="relative z-20 max-w-5xl mx-auto px-2 sm:px-4">
        <motion.h2
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-indigo-400 mb-10 sm:mb-12 md:mb-16 drop-shadow-md"
        >
          Experiência Profissional
        </motion.h2>

        <ExperienceTimeline />

        <motion.div 
          className="mt-12 text-center"
          variants={titleVariants}
        >
          <a 
            href="#contact" 
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-white transition-colors duration-300 shadow-lg hover:shadow-indigo-500/20"
          >
            Vamos trabalhar juntos?
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;