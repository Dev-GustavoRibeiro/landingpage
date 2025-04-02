'use client';
import { motion } from 'framer-motion';
import ExperienceItem from './ExperienceItem';
import { experiences } from '../hooks/experienceData';

const ExperienceTimeline = () => {
  return (
    <motion.div 
      className="grid gap-8 border-l-2 border-indigo-500/20 pl-4 sm:pl-8 relative"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {experiences.map((exp, index) => (
        <ExperienceItem key={index} exp={exp} />
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;