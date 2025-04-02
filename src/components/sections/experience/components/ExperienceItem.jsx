'use client';
import { motion } from 'framer-motion';

const ExperienceItem = ({ exp }) => {
  const IconComponent = exp.icon;
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative pl-6 pb-8 before:absolute before:-left-[15px] before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-gradient-to-br before:from-indigo-500 before:to-indigo-300 shadow-sm group"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white/10 p-1 shadow-md flex-shrink-0 flex items-center justify-center text-indigo-300">
          <IconComponent className="text-lg sm:text-xl" />
        </div>
        <div>
          <div className="text-xs sm:text-sm text-indigo-200/80 tracking-wide uppercase font-medium">
            {exp.period} — {exp.location}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-indigo-100">
            {exp.title} <span className="font-medium text-white">· {exp.company}</span>
          </h3>
        </div>
      </div>
      <ul className="list-disc list-inside text-indigo-100/90 mt-2 space-y-1 text-sm sm:text-base leading-relaxed pl-2">
        {exp.duties.map((duty, i) => (
          <li key={i} className="group-hover:text-indigo-50 transition-colors duration-200">
            {duty}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ExperienceItem;