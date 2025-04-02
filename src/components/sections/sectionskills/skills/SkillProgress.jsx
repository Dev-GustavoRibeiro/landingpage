import { motion } from "framer-motion"

export default function SkillProgress({ skills }) {
  return (
    <div className="bg-white/10 p-4 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10 hover:shadow-indigo-500/20 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-indigo-300 mb-3 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
        Proficiência Técnica
      </h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-indigo-100/90 text-sm md:text-base">{skill.name}</span>
              <span className="text-indigo-200 text-xs md:text-sm">{skill.level}%</span>
            </div>
            <div className="w-full bg-black/30 rounded-full h-2">
              <motion.div 
                className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}