"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function CodeEditor({ code, setCode, output, runCode, setOutput }) {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [codeCompletion, setCodeCompletion] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const editorRef = useRef(null);
  const clickCount = useRef(0);
  
  // Temas expandidos
  const themes = [
    { name: "Dark", bg: "bg-black", text: "text-green-400", accent: "indigo" },
    { name: "Light", bg: "bg-gray-100", text: "text-gray-800", accent: "blue" },
    { name: "Monokai", bg: "bg-[#272822]", text: "text-[#f8f8f2]", accent: "yellow" },
    { name: "Dracula", bg: "bg-[#282a36]", text: "text-[#f8f8f2]", accent: "pink" },
    { name: "Cyberpunk", bg: "bg-[#031926]", text: "text-[#00ff9f]", accent: "cyan" },
  ];

  // Detecta dispositivos móveis e marca o componente como carregado
  useEffect(() => {
    setIsLoaded(true);
    setLineCount(code.split('\n').length);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [code]);

  // Easter egg - confetti quando o código é executado com sucesso
  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => {
        setConfetti(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [confetti]);

  // Exemplos de código divertidos
  const codeTabs = [
    {
      name: "Calculadora",
      icon: "🧮",
      code: `// Calculadora simples
function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return "Não é possível dividir por zero!";
  }
  return a / b;
}

// Vamos testar nossa calculadora
console.log("5 + 3 =", somar(5, 3));
console.log("10 - 4 =", subtrair(10, 4));
console.log("6 * 7 =", multiplicar(6, 7));
console.log("20 / 5 =", dividir(20, 5));
console.log("10 / 0 =", dividir(10, 0));`
    },
    {
      name: "Jogo",
      icon: "🎮",
      code: `// Jogo de adivinhação
function jogoAdivinhacao() {
  // Gera um número aleatório entre 1 e 10
  const numeroSecreto = Math.floor(Math.random() * 10) + 1;
  
  // Simula algumas tentativas
  const tentativas = [5, 8, 3, 7];
  
  console.log("🎮 JOGO DE ADIVINHAÇÃO 🎮");
  console.log("Tente adivinhar o número entre 1 e 10");
  
  for (let i = 0; i < tentativas.length; i++) {
    const palpite = tentativas[i];
    console.log(\`Tentativa \${i+1}: \${palpite}\`);
    
    if (palpite === numeroSecreto) {
      console.log(\`🎉 Parabéns! Você acertou em \${i+1} tentativas!\`);
      return;
    } else if (palpite < numeroSecreto) {
      console.log("Dica: Tente um número maior");
    } else {
      console.log("Dica: Tente um número menor");
    }
  }
  
  console.log(\`❌ Você não conseguiu! O número era \${numeroSecreto}\`);
}

jogoAdivinhacao();`
    },
    {
      name: "Emoji",
      icon: "😎",
      code: `// Gerador de arte ASCII com emojis
function arteEmoji() {
  const emojis = ["😀", "🚀", "🌈", "🎮", "💻", "🔥", "✨", "🎯"];
  
  console.log("=== ARTE COM EMOJIS ===");
  
  // Cria um padrão de emojis
  for (let i = 0; i < 5; i++) {
    let linha = "";
    for (let j = 0; j <= i; j++) {
      // Escolhe um emoji aleatório
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      linha += emoji + " ";
    }
    console.log(linha);
  }
  
  console.log("\\n✨ Arte gerada com sucesso! ✨");
}

arteEmoji();`
    },
    {
      name: "Piada",
      icon: "🤣",
      code: `// Gerador de piadas de programação
function contarPiada() {
  const piadas = [
    {
      pergunta: "Por que os programadores preferem o frio?",
      resposta: "Porque tem muitos bugs no calor!"
    },
    {
      pergunta: "Como um programador resolve um problema?",
      resposta: "Ctrl+C, Ctrl+V!"
    },
    {
      pergunta: "Quantos programadores são necessários para trocar uma lâmpada?",
      resposta: "Nenhum, é um problema de hardware!"
    },
    {
      pergunta: "O que um programador Java faz quando está com fome?",
      resposta: "Ele come cookies!"
    }
  ];
  
  // Escolhe uma piada aleatória
  const piada = piadas[Math.floor(Math.random() * piadas.length)];
  
  console.log("🤣 PIADA DE PROGRAMAÇÃO 🤣");
  console.log(piada.pergunta);
  console.log("...");
  console.log(piada.resposta);
}

contarPiada();`
    }
  ];

  // Dicas de código para auto-completar
  const codeHints = {
    "con": "console.log();",
    "fun": "function nomeDaFuncao() {\n  \n}",
    "for": "for (let i = 0; i < array.length; i++) {\n  \n}",
    "if": "if (condicao) {\n  \n}",
    "arr": "const array = [];",
  };

  // Verifica se há sugestões de auto-completar
  const checkCompletion = (text) => {
    const lastWord = text.split(/[\s\n.;(){}[\]=+\-*/!|&<>:]+/).pop();
    
    if (lastWord && lastWord.length >= 2) {
      for (const [prefix, completion] of Object.entries(codeHints)) {
        if (prefix.startsWith(lastWord)) {
          setCodeCompletion(completion);
          return;
        }
      }
    }
    
    setCodeCompletion("");
  };

  // Função para aplicar a sugestão de auto-completar
  const applyCompletion = () => {
    if (codeCompletion) {
      const lastWord = code.split(/[\s\n.;(){}[\]=+\-*/!|&<>:]+/).pop();
      const newCode = code.substring(0, code.length - lastWord.length) + codeCompletion;
      setCode(newCode);
      setCodeCompletion("");
    }
  };

  // Easter egg - clique no logo 3 vezes
  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 3) {
      setShowEasterEgg(true);
      clickCount.current = 0;
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  };

  // Renderização otimizada para celulares
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${themes[currentTheme].bg} ${themes[currentTheme].text} font-mono rounded-xl p-2 shadow-lg ring-1 ring-white/10 h-full flex flex-col relative`}
    >
      {/* Easter egg confetti */}
      {confetti && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-${themes[currentTheme].accent}-500`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${Math.random() * 2 + 1}s linear forwards`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Easter egg mensagem */}
      {showEasterEgg && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black/80 p-3 rounded-lg text-center">
          <p className="text-yellow-400 text-sm">🎉 Você encontrou o easter egg! 🎉</p>
          <p className="text-xs mt-1">Desenvolvido com ❤️ por Gustavo Ribeiro</p>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-2 sticky top-0 z-10 bg-inherit pt-1">
        <div 
          className="flex space-x-1.5 cursor-pointer" 
          onClick={handleLogoClick}
          title="Clique 3 vezes para uma surpresa"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="flex space-x-1">
          {/* Seletor de tema */}
          <div className="flex space-x-1">
            {themes.slice(0, isMobile ? 3 : themes.length).map((theme, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTheme(idx)}
                className={`w-4 h-4 rounded-full ${
                  idx === 0 ? "bg-black border border-white/20" : 
                  idx === 1 ? "bg-gray-100" :
                  idx === 2 ? "bg-[#272822]" :
                  idx === 3 ? "bg-[#282a36]" :
                  "bg-[#031926]"
                } ${currentTheme === idx ? `ring-2 ring-${theme.accent}-500` : ""}`}
                aria-label={`Tema ${theme.name}`}
                title={theme.name}
              />
            ))}
          </div>
          
          {/* Botão de dica */}
          <button 
            onClick={() => setShowHint(!showHint)}
            className="text-gray-400 hover:text-white p-1 ml-1"
            title="Mostrar dicas"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Dicas */}
      {showHint && (
        <div className={`mb-2 p-2 text-xs rounded bg-${themes[currentTheme].accent}-500/20 border border-${themes[currentTheme].accent}-500/30`}>
          <p className="font-bold mb-1">💡 Dicas:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Digite "con" para auto-completar console.log()</li>
            <li>Digite "fun" para criar uma função</li>
            <li>Pressione Tab para aplicar a sugestão</li>
            <li>Experimente os diferentes exemplos de código</li>
          </ul>
        </div>
      )}
      
      {/* Abas de exemplos de código */}
      <div className="flex space-x-1 mb-2 overflow-x-auto pb-1 scrollbar-thin">
        {codeTabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(idx);
              setCode(tab.code);
            }}
            className={`px-2 py-1 text-xs rounded-md flex items-center whitespace-nowrap ${
              activeTab === idx 
                ? `bg-${themes[currentTheme].accent}-600 text-white` 
                : `bg-${themes[currentTheme].accent}-900/30 hover:bg-${themes[currentTheme].accent}-800/40`
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {!isMobile && tab.name}
          </button>
        ))}
      </div>

      {/* Editor de código com auto-completar */}
      <div className="relative flex-grow mb-2">
        <div className="absolute left-0 top-0 bottom-0 w-5 bg-black/20 flex flex-col items-center pt-1 text-[10px] text-gray-500 overflow-hidden">
          {Array.from({ length: Math.min(lineCount, 30) }).map((_, i) => (
            <div key={i} className="h-5 w-full text-center">{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setLineCount(e.target.value.split('\n').length);
            checkCompletion(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab' && codeCompletion) {
              e.preventDefault();
              applyCompletion();
            }
          }}
          className={`w-full h-full ${themes[currentTheme].bg} outline-none resize-none border border-white/10 rounded pl-6 pr-1 py-1 overflow-y-auto text-xs`}
          spellCheck="false"
          style={{ minHeight: "120px" }}
        />
        
        {/* Sugestão de auto-completar */}
        {codeCompletion && (
          <div className="absolute bottom-2 left-6 bg-black/70 text-gray-300 text-xs p-1 rounded">
            <span className="opacity-70">Tab para completar:</span> 
            <span className={`ml-1 text-${themes[currentTheme].accent}-400`}>{codeCompletion}</span>
          </div>
        )}
      </div>

      {/* Botões de ação */}
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => {
            runCode();
            // Chance de mostrar confetti quando o código é executado
            if (Math.random() > 0.7) {
              setConfetti(true);
            }
          }}
          className={`flex-1 py-1.5 bg-${themes[currentTheme].accent}-600 text-white rounded text-xs flex items-center justify-center`}
        >
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Executar
        </button>
        <button
          onClick={() => setCode("")}
          className={`px-2 py-1.5 bg-gray-600 text-white rounded text-xs`}
        >
          Limpar
        </button>
        <button
          onClick={() => {
            try {
              // Formatação básica de código
              const formatted = code
                .split('\n')
                .map(line => line.trim())
                .join('\n');
              setCode(formatted);
            } catch (err) {
              console.error("Erro ao formatar:", err);
            }
          }}
          className={`px-2 py-1.5 bg-${themes[currentTheme].accent}-800 text-white rounded text-xs hidden sm:block`}
        >
          Formatar
        </button>
      </div>

      {/* Console com emojis e cores */}
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400 flex items-center">
            <span className="mr-1">📟</span> Console
          </span>
          <button
            onClick={() => setOutput("")}
            className="text-[10px] text-gray-400"
          >
            Limpar
          </button>
        </div>
        <pre 
          className={`bg-black/50 text-white text-xs p-2 rounded whitespace-pre-wrap min-h-[60px] max-h-[80px] overflow-y-auto`}
          style={{
            // Adiciona um pouco de estilo ao console para destacar palavras-chave
            color: output.includes("Erro") ? "#ff6b6b" : 
                  output.includes("Parabéns") ? "#51cf66" : 
                  output.includes("🎮") ? "#74c0fc" : 
                  output.includes("PIADA") ? "#fcc419" : "white"
          }}
        >
          {output || "// A saída do seu código aparecerá aqui ✨"}
        </pre>
      </div>
      
      {/* Rodapé com contador de caracteres */}
      <div className="mt-1 flex justify-between items-center text-[10px] text-gray-500">
        <span>{code.length} caracteres</span>
        <span>{lineCount} linhas</span>
      </div>
    </motion.div>
  );
}