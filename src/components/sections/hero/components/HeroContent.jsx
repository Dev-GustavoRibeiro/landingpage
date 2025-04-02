import { motion } from "framer-motion"
import ProfileImage from "./ProfileImage"
import ExpandableText from "./ExpandableText"
import DockMenu from "./DockMenu"

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroContent({ setActiveApp }) {
  const handleZoom = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <motion.div
      className={`
        absolute z-10 flex flex-col justify-between
        /* Positioning for different screen sizes */
        top-[6%] left-[4%] w-[92%] h-[70%]
        sm:top-[8%] sm:left-[8%] sm:w-[84%] sm:h-[65%]
        md:top-[10%] md:left-[12%] md:w-[76%] md:h-[60%]
        lg:top-[12%] lg:left-[16%] lg:w-[68%] lg:h-[50%]
      `}
    >
      <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-3 md:flex-row md:px-4">
        {/* Profile Image */}
        <ProfileImage />
        
        {/* Text Content */}
        <motion.div className="text-center md:text-left max-w-md md:ml-4 lg:ml-8 space-y-2 sm:space-y-3">
          <motion.h1
            variants={textVariants}
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-indigo-400"
          >
            Gustavo Ribeiro
          </motion.h1>
          
          <motion.p
            variants={textVariants}
            className="text-xs xs:text-sm sm:text-base md:text-lg font-medium text-indigo-100"
          >
            Desenvolvedor Full Cycle
          </motion.p>
          
          <ExpandableText
            maxLength={80}
            className="text-[10px] xs:text-xs sm:text-sm px-2 md:text-base lg:text-lg text-gray-300 leading-relaxed"
          >
            Soluções modernas do front-end ao back-end, com APIs, DevOps, automação e foco total em performance. 
            Sempre em busca de inovação e melhoria contínua, unindo criatividade e tecnologia para transformar ideias em realidade. 
            Experiência com frameworks modernos, metodologias ágeis e design responsivo.
          </ExpandableText>
          
          {/* Action Buttons */}
          <motion.div
            variants={textVariants}
            className="flex flex-col xs:flex-row gap-1.5 xs:gap-2 px-4 justify-center md:justify-start mt-1.5 sm:mt-2"
          >
            <button
              onClick={() => handleZoom("perfil")}
              className="bg-white text-indigo-700 font-medium 
                px-3 py-1.5 rounded-full shadow-lg 
                transition-all duration-300 
                hover:scale-105 active:scale-95 hover:shadow-indigo-500/30 
                text-xs xs:text-sm sm:text-[13px] md:text-sm
                min-w-[90px] xs:min-w-[100px] sm:min-w-[110px]"
            >
              Saiba Mais
            </button>
            <button
              onClick={() => handleZoom("contact")}
              className="bg-indigo-600 text-white font-medium 
                px-3 py-1.5 rounded-full shadow-lg 
                transition-all duration-300 
                hover:scale-105 active:scale-95 hover:shadow-white/20 
                text-xs xs:text-sm sm:text-[13px] md:text-sm
                min-w-[90px] xs:min-w-[100px] sm:min-w-[110px]"
            >
              Contrate-me
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Dock Menu */}
      <DockMenu setActiveApp={setActiveApp} />
    </motion.div>
  )
}