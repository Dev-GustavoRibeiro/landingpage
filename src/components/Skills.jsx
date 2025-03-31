"use client"

import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { useCallback, useState } from "react"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  const particlesInit = useCallback(async engine => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  const [code, setCode] = useState(`function saudacao(nome) {
  return "Olá, " + nome + "! Seja bem-vindo ao meu portfólio.";
}

function soma(a, b) {
  return a + b;
}

console.log(saudacao("visitante"));
console.log("Soma de 2 + 3:", soma(2, 3));`)  
  const [output, setOutput] = useState("")

  const runCode = () => {
    try {
      const log = []
      const originalLog = console.log
      console.log = (...args) => log.push(args.join(" "))
      eval(code)
      console.log = originalLog
      setOutput(log.join("\n"))
    } catch (err) {
      setOutput("Erro: " + err.message)
    }
  }

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-6 py-15 md:py-20 relative
    text-white rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.4)] border 
    border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
      backdrop-blur-xl"
      >
      <Particles
        id="tsparticles-skills"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 70 },
            size: { value: 1.8 },
            move: { enable: true, speed: 0.4 },
            color: { value: "#7c3aed" },
            opacity: { value: 0.25 },
            links: { enable: true, color: "#7c3aed", distance: 80, opacity: 0.1 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <motion.div className="relative z-10 max-w-7xl mx-auto space-y-20" variants={itemVariant}>
        <motion.h2
          variants={itemVariant}
          className="text-4xl md:text-5xl font-extrabold text-center text-indigo-400 drop-shadow-md"
        >
          Habilidades
        </motion.h2>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start" variants={itemVariant}>
          {/* LADO ESQUERDO - HABILIDADES */}
          <div className="space-y-10">
            <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10">
              <h3 className="text-2xl font-bold text-indigo-300 mb-3">Habilidades Técnicas</h3>
              <ul className="list-disc list-inside text-indigo-100/90 space-y-2 text-base">
                <li>Desenvolvimento Full Stack com React, Next.js e Node.js</li>
                <li>Prisma ORM, Tailwind CSS, Git e Docker</li>
                <li>Integração de sistemas e bancos de dados MySQL</li>
                <li>Infraestrutura e redes com foco em ambientes GPON</li>
              </ul>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10">
              <h3 className="text-2xl font-bold text-indigo-300 mb-3">Habilidades Comportamentais</h3>
              <ul className="list-disc list-inside text-indigo-100/90 space-y-2 text-base">
                <li>Comunicação assertiva e gestão de equipes</li>
                <li>Capacidade analítica e resolução de problemas</li>
                <li>Proatividade, foco em resultados e liderança</li>
                <li>Conhecimentos em marketing e estratégias digitais</li>
              </ul>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10 text-center">
              <h3 className="text-2xl font-bold text-indigo-300 mb-2">Idiomas</h3>
              <p className="text-indigo-100/90 text-lg">
                Português: Nativo <br /> Inglês: Intermediário
              </p>
            </div>
          </div>

          {/* LADO DIREITO - IDE */}
          <motion.div
            variants={itemVariant}
            className="bg-black/90 text-green-400 font-mono rounded-xl p-6 shadow-lg ring-1 ring-white/10"
          >
            <div className="flex justify-center flex-wrap gap-4 mb-6">
              {"javascript python php nodejs bash".split(" ").map((tech, idx) => (
                <img
                  key={idx}
                  src={`https://raw.githubusercontent.com/devicons/devicon/master/icons/${tech}/${tech}-original.svg`}
                  alt={tech}
                  className="w-10 h-10 opacity-70 hover:scale-110 transition-transform"
                />
              ))}
            </div>
            <label className="text-sm text-gray-400 block mb-2" htmlFor="editor">
              ~/projetos/hello.js <span className="text-indigo-400 ml-2">(edite e execute 👇)</span>
            </label>
            <textarea
              id="editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[380px] bg-transparent outline-none resize-none text-green-400 border border-white/10 rounded p-2"
            />
            <button
              onClick={runCode}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
            >
              Executar
            </button>
            <pre className="mt-4 bg-black/50 text-white text-sm p-3 rounded whitespace-pre-wrap min-h-[80px]">
              {output || "// Saída será exibida aqui"}
            </pre>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
