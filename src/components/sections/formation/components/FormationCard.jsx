'use client';
import { motion } from 'framer-motion';
import { itemVariants } from '../hooks/formationVariants';

export default function FormationCard({ formation, index }) {
  const Icon = formation.icon;
  
  return (
    <motion.div
      variants={itemVariants}
      className="p-5 sm:p-6 bg-white/10 rounded-2xl shadow-xl backdrop-blur-md text-indigo-100 hover:scale-[1.02] transition duration-300 hover:bg-white/15 group"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300 group-hover:text-indigo-200 transition-colors">
          <Icon className="text-xl sm:text-2xl" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-indigo-300 group-hover:text-indigo-200 transition-colors">
            {formation.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1 text-xs sm:text-sm">
            <span className="bg-indigo-900/30 px-2 py-1 rounded">{formation.institution}</span>
            <span className="bg-indigo-900/30 px-2 py-1 rounded">{formation.period}</span>
          </div>
        </div>
      </div>
      
      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed">
        {formation.description}
      </p>
      
      {formation.skills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {formation.skills.map((skill, i) => {
            const SkillIcon = skill.icon;
            return (
              <span 
                key={i} 
                className="flex items-center gap-1 text-xs bg-indigo-800/20 px-2 py-1 rounded-full"
              >
                <SkillIcon className="text-indigo-300" />
                {skill.name}
              </span>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}