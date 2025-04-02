import { motion } from "framer-motion"
import { itemVariant } from "./animation"
import SkillCard from "./SkillCard"
import LanguageCard from "./LanguageCard"
import SkillProgress from "./SkillProgress"
import Terminal from "./Terminal"

export default function SkillsSection({ isMobile = false }) {
  const technicalSkills = [
    "Desenvolvimento Full Stack com React, Next.js e Node.js",
    "Prisma ORM, Tailwind CSS, Git e Docker",
    "Integração de sistemas e bancos de dados MySQL",
    "Infraestrutura e redes com foco em ambientes GPON"
  ]

  const softSkills = [
    "Comunicação assertiva e gestão de equipes",
    "Capacidade analítica e resolução de problemas",
    "Proatividade, foco em resultados e liderança",
    "Conhecimentos em marketing e estratégias digitais"
  ]

  const languages = [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Intermediário" }
  ]

  const skillLevels = [
    { name: "JavaScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "MySQL", level: 75 }
  ]

  return (
    <div className="space-y-4 md:space-y-6 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <SkillCard title="Habilidades Técnicas" skills={technicalSkills} />
        <SkillCard title="Habilidades Comportamentais" skills={softSkills} />
      </div>
      
      <SkillProgress skills={skillLevels} />
      <LanguageCard languages={languages} />
      
      {/* Terminal ocupa o espaço restante para alinhar com a IDE */}
      <div className="flex-grow">
        <Terminal height="100%" minimal={isMobile} />
      </div>
    </div>
  )
}