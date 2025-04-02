import { motion } from "framer-motion";

const paragraphs = [
  "Sou apaixonado por tecnologia, engenharia e soluções inteligentes. Em formação como Engenheiro da Computação pela UNIFAN e Técnico em Informática pelo Grupo IETAAM, busco unir visão estratégica com habilidades técnicas para criar sistemas eficientes e impactantes.",
  "Tenho experiência prática em desenvolvimento, arquitetura de sistemas e organização de equipes técnicas. Além disso, aprofundei meus conhecimentos em gestão de negócios, finanças corporativas e liderança de pessoas, atuando diretamente na estruturação de processos operacionais e administrativos em empresas de tecnologia.",
  "Minha visão é construir soluções completas — da estratégia ao código — entregando resultados reais para empresas que buscam inovação, crescimento e eficiência.",
];

export default function AboutContent() {
  return (
    <motion.div
      className="text-center md:text-left w-full md:max-w-2xl px-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-indigo-400 mb-4 sm:mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Sobre Mim
      </motion.h2>

      {paragraphs.map((text, index) => (
        <motion.p
          key={index}
          className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-indigo-100 mb-3 sm:mb-4 text-justify"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {text}
        </motion.p>
      ))}
    </motion.div>
  );
}