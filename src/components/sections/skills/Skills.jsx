"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

// Importação estática de componentes leves
import SectionTitle from "./skills/SectionTitle";

// Componente de carregamento para o CodeEditor
const EditorLoading = () => (
  <div className="bg-black/90 text-green-400 font-mono rounded-xl p-3 shadow-lg ring-1 ring-white/10 h-full flex flex-col justify-center items-center">
    <div className="animate-pulse flex flex-col items-center">
      <div className="h-2 w-20 bg-indigo-500 rounded mb-3"></div>
      <div className="h-20 w-full bg-gray-800 rounded mb-3"></div>
      <div className="h-8 w-32 bg-indigo-600 rounded"></div>
    </div>
  </div>
);

// Importação dinâmica com prioridade para o CodeEditor
const CodeEditor = dynamic(() => import('./skills/CodeEditor'), {
  ssr: false,
  loading: () => <EditorLoading />
});

// Importação dinâmica com baixa prioridade para componentes secundários
const SkillsSection = dynamic(() => import('./skills/SkillsSection'), {
  ssr: false,
  loading: () => (
    <div className="bg-black/50 rounded-xl p-3 shadow-lg ring-1 ring-white/10 h-full animate-pulse">
      <div className="h-4 bg-indigo-500/30 rounded w-1/3 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  )
});

// Variantes de animação simplificadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Skills() {
  const [code, setCode] = useState(`// Calculadora simples
function somar(a, b) {
  return a + b;
}

console.log("5 + 3 =", somar(5, 3));`);
  const [output, setOutput] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Detecta ambiente cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const runCode = () => {
    try {
      const log = [];
      const originalLog = console.log;
      console.log = (...args) => log.push(args.join(" "));
      
      // Código simplificado e seguro para execução
      eval(`
        try {
          ${code}
        } catch (e) {
          console.log("Erro:", e.message);
        }
      `);
      
      console.log = originalLog;
      setOutput(log.join("\n"));
    } catch (err) {
      setOutput("Erro: " + err.message);
    }
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="scroll-mt-[100px] container mx-auto px-3 py-8 relative
        text-white rounded-2xl overflow-hidden shadow-lg border 
        border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 via-[#1a1c2c]/50 to-[#0e0f1c]/60 
        backdrop-blur-xl"
    >
      <motion.div className="relative z-10 max-w-7xl mx-auto space-y-6" variants={itemVariant}>
        <SectionTitle>Habilidades</SectionTitle>

        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch" variants={itemVariant}>
          {isClient && <SkillsSection />}
          {isClient && (
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              output={output} 
              runCode={runCode}
              setOutput={setOutput}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}