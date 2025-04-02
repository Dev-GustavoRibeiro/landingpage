import { 
  FaGraduationCap, 
  FaLaptopCode,
  FaMicrochip,
  FaNetworkWired,
  FaRobot,
  FaDatabase
} from 'react-icons/fa';

export const formations = [
  {
    title: "Engenharia da Computação",
    institution: "UNIFAN – Universidade Nobre",
    period: "Concluído: Junho 2026",
    icon: FaGraduationCap,
    description: "Foco em sistemas embarcados, redes, automação, IA e engenharia de software. Projeto de soluções integradas para desafios computacionais reais.",
    skills: [
      { name: "Sistemas Embarcados", icon: FaMicrochip },
      { name: "Inteligência Artificial", icon: FaRobot },
      { name: "Redes de Computadores", icon: FaNetworkWired },
      { name: "Engenharia de Software", icon: FaLaptopCode }
    ]
  },
  {
    title: "Técnico em Informática",
    institution: "Grupo IETAAM",
    period: "Concluído: 2023",
    icon: FaLaptopCode,
    description: "Desenvolvimento web, redes, manutenção de sistemas e banco de dados. Forte base prática com tecnologias modernas.",
    skills: [
      { name: "Assinatura por Provedores", icon: FaNetworkWired },
      { name: "Redes de Computadores", icon:  FaLaptopCode },
      { name: "Banco de Dados", icon: FaDatabase }
    ]
  }
];