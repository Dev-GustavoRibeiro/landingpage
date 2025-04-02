'use client';
import { motion } from 'framer-motion';
import FormationParticles from './components/FormationParticles';
import FormationDecorations from './components/FormationDecorations';
import FormationCard from './components/FormationCard';
import FormationImage from './components/FormationImage';
import { formations } from './hooks/formationData';
import { containerVariants } from './hooks/formationVariants';

export default function FormationSection() {
  return (
    <motion.section
      id="formacao"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[80px] sm:scroll-mt-[100px] container mx-auto px-4 sm:px-6 py-12 md:py-20 relative
      text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
      border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
    >
      <FormationParticles />
      <FormationDecorations />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl mx-auto px-4">
        <div className="flex-1 space-y-6 md:space-y-8 w-full">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-400 mb-6 md:mb-8 drop-shadow-lg text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Formação Acadêmica
          </motion.h2>

          <div className="space-y-6">
            {formations.map((formation, index) => (
              <FormationCard key={index} formation={formation} index={index} />
            ))}
          </div>
        </div>

        <FormationImage />
      </div>
    </motion.section>
  );
}