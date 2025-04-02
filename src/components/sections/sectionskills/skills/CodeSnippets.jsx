"use client";

import { useState } from "react";

export default function CodeSnippets({ setCode }) {
  const [activeTab, setActiveTab] = useState(0);
  
  const snippets = [
    {
      name: "React Hook",
      language: "jsx",
      code: `// Hook simples para obter o tamanho da janela
function useWindowSize() {
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}`
    },
    {
      name: "Algoritmo",
      language: "javascript",
      code: `// Função para verificar se um número é primo
function isPrimo(numero) {
  // Números menores que 2 não são primos
  if (numero < 2) return false;
  
  // Verificar divisibilidade até a raiz quadrada do número
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) {
      return false;
    }
  }
  
  return true;
}

// Testar alguns números
console.log("2 é primo?", isPrimo(2));
console.log("7 é primo?", isPrimo(7));
console.log("10 é primo?", isPrimo(10));
console.log("13 é primo?", isPrimo(13));`
    },
    {
      name: "Iniciante",
      language: "javascript",
      code: `// Código simples para iniciantes
// Calculadora básica

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
    return "Não é possível dividir por zero";
  }
  return a / b;
}

// Vamos testar nossa calculadora
console.log("Soma: 5 + 3 =", somar(5, 3));
console.log("Subtração: 10 - 4 =", subtrair(10, 4));
console.log("Multiplicação: 6 * 7 =", multiplicar(6, 7));
console.log("Divisão: 20 / 5 =", dividir(20, 5));`
    },
    {
      name: "Diversão",
      language: "javascript",
      code: `// Gerador de frases motivacionais aleatórias

const frases = [
  "A persistência é o caminho do êxito.",
  "O sucesso é a soma de pequenos esforços repetidos diariamente.",
  "Acredite em você mesmo e tudo será possível.",
  "Não espere por oportunidades, crie você mesmo as suas.",
  "O único lugar onde o sucesso vem antes do trabalho é no dicionário."
];

function fraseDoDia() {
  // Gera um número aleatório entre 0 e o tamanho do array
  const indice = Math.floor(Math.random() * frases.length);
  
  // Retorna a frase na posição do índice gerado
  return frases[indice];
}

console.log("🌟 Sua frase motivacional do dia é:");
console.log(fraseDoDia());
console.log("Tenha um ótimo dia! 😊");`
    }
  ];

  return (
    <div className="bg-white/10 p-2 md:p-3 rounded-xl shadow-md backdrop-blur-md ring-1 ring-white/10 mb-2 md:mb-3">
      <h3 className="text-sm font-bold text-indigo-300 mb-1 md:mb-2 flex items-center">
        <svg className="w-3 h-3 md:w-4 md:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Exemplos de Código
      </h3>
      
      <div className="flex flex-wrap gap-1 md:gap-2 mb-1 md:mb-2">
        {snippets.map((snippet, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(idx);
              setCode(snippet.code);
            }}
            className={`px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs rounded-full transition touch-manipulation ${
              activeTab === idx 
                ? "bg-indigo-600 text-white" 
                : "bg-white/10 text-indigo-200 hover:bg-white/20"
            }`}
          >
            {snippet.name}
          </button>
        ))}
      </div>
      
      <p className="text-indigo-100/90 text-[10px] md:text-xs">
        Clique em um exemplo para carregá-lo no editor.
      </p>
    </div>
  );
}