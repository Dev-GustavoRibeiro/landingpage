import { useState, useEffect, useRef } from "react"

export default function Terminal({ height = "300px", minimal = false }) {
  const [commands, setCommands] = useState([
    { text: "Bem-vindo ao terminal do portfólio!", type: "system" },
    { text: "Digite 'help' para ver os comandos disponíveis.", type: "system" }
  ])
  const [input, setInput] = useState("")
  const terminalRef = useRef(null)
  
  const availableCommands = {
    help: "Mostra a lista de comandos disponíveis",
    about: "Exibe informações sobre mim",
    skills: "Lista minhas habilidades técnicas",
    contact: "Mostra informações de contato",
    clear: "Limpa o terminal"
  }

  const handleCommand = (cmd) => {
    setCommands(prev => [...prev, { text: `$ ${cmd}`, type: "command" }])
    
    switch(cmd.toLowerCase()) {
      case "help":
        Object.entries(availableCommands).forEach(([cmd, desc]) => {
          setCommands(prev => [...prev, { text: `${cmd.padEnd(10)} - ${desc}`, type: "response" }])
        })
        break
      case "about":
        setCommands(prev => [...prev, { 
          text: "Desenvolvedor Full Cycle com experiência em React, Next.js e Banco de Dados.", 
          type: "response" 
        }])
        break
      case "skills":
        const skills = ["JavaScript", "React", "Next.js", "PHP", "Tailwind CSS"]
        setCommands(prev => [...prev, { text: skills.join(", "), type: "response" }])
        break
      case "contact":
        setCommands(prev => [...prev, { 
          text: "Email: contatogustavoribeirohm@gmail.com | GitHub: https://github.com/Dev-GustavoRibeiro", 
          type: "response" 
        }])
        break
      case "clear":
        setCommands([])
        break
      default:
        setCommands(prev => [...prev, { 
          text: `Comando não reconhecido: '${cmd}'. Digite 'help' para ver os comandos disponíveis.`, 
          type: "error" 
        }])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  return (
    <div className="bg-black/90 text-green-400 font-mono rounded-xl p-3 md:p-4 shadow-lg ring-1 ring-white/10 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[10px] md:text-xs text-gray-400">terminal@portfolio:~</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-grow overflow-y-auto mb-2 text-xs md:text-sm"
        style={{ maxHeight: minimal ? "150px" : "none" }}
      >
        {commands.map((cmd, idx) => (
          <div 
            key={idx} 
            className={`mb-1 ${
              cmd.type === "command" ? "text-white" : 
              cmd.type === "error" ? "text-red-400" : 
              cmd.type === "system" ? "text-blue-400" : "text-green-400"
            }`}
          >
            {cmd.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-white">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white ml-2 text-xs md:text-sm"
          autoComplete="off"
        />
      </form>
    </div>
  )
}