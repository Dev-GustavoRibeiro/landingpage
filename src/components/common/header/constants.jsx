import {
  BsRocket, BsEmojiSunglasses, BsHeartFill, BsLightningFill,
  BsRobot, BsFire, BsSnow, BsPerson, BsBook, BsBriefcase,
  BsCodeSlash, BsCollection, BsEnvelope, BsStars,
  BsArrowRight, BsJoystick
} from "react-icons/bs";

export const easterEggs = {
  TURBO: {
    icon: <BsRocket className="text-purple-400" />,
    color: "from-purple-900 to-indigo-900",
    effect: "rotate",
    duration: null, // Música toca até o usuário parar
    music: "https://open.spotify.com/embed/track/43DHLzDkncpby82Po5jlOZ", // Queen - Don't Stop Me Now
    hint: "Aproveite a energia!"
  },
  DANCE: {
    icon: <BsEmojiSunglasses className="text-pink-400" />,
    color: "from-pink-900 to-rose-900",
    effect: "bounce",
    duration: null,
    music: "https://open.spotify.com/embed/track/57bgtoPSgt236HzfBOd8kj", // AC/DC - Thunderstruck
    hint: "Hora de agitar!"
  },
  LOVE: {
    icon: <BsHeartFill className="text-red-400" />,
    color: "from-red-900 to-pink-900",
    effect: "heartbeat",
    duration: null,
    music: "https://open.spotify.com/embed/track/7o2CTH4ctstm8TNelqjb51", // Guns N' Roses - Sweet Child O' Mine
    hint: "Sinta o amor no ar!"
  },
  POWER: {
    icon: <BsLightningFill className="text-blue-400" />,
    color: "from-blue-900 to-cyan-900",
    effect: "shake",
    duration: null,
    music: "https://open.spotify.com/embed/track/78lgmZwycJ3nzsdgmPPGNx", // Led Zeppelin - Immigrant Song
    hint: "Liberte o poder dentro de você!"
  },
  ROBOT: {
    icon: <BsRobot className="text-green-400" />,
    color: "from-green-900 to-emerald-900",
    effect: "robot-dance",
    duration: null,
    music: "https://open.spotify.com/embed/track/3Qm86XLflmIXVm1wcwkgDK", // Daft Punk - Robot Rock
    hint: "Movimentos robóticos ativados!"
  },
  FIRE: {
    icon: <BsFire className="text-orange-400" />,
    color: "from-orange-900 to-red-900",
    effect: "flame",
    duration: null,
    music: "https://open.spotify.com/embed/track/5LI7PoHEolR8plrf3I16sq", // Jimi Hendrix - Fire
    hint: "Pegando fogo!"
  },
  SNOW: {
    icon: <BsSnow className="text-blue-200" />,
    color: "from-blue-800 to-cyan-800",
    effect: "snow",
    duration: null,
    music: "https://open.spotify.com/embed/track/2Cdvbe2G4hZsnhNMKyGrie", // Joan Jett & the Blackhearts - I Love Rock 'N Roll
    hint: "Clima de inverno!"
  }
};





export const navLinks = [
  { label: "Perfil", href: "#perfil", icon: <BsPerson className="mr-2" /> },
  { label: "Formação", href: "#formacao", icon: <BsBook className="mr-2" /> },
  { label: "Experiência", href: "#experiencia", icon: <BsBriefcase className="mr-2" /> },
  { label: "Habilidades", href: "#skills", icon: <BsCodeSlash className="mr-2" /> },
  { label: "Projetos", href: "#projects", icon: <BsCollection className="mr-2" /> },
  { label: "Contato", href: "#contact", icon: <BsEnvelope className="mr-2" /> },
  { label: "Feedbacks", href: "#feedbacks", icon: <BsStars className="mr-2" /> },
];

export const games = [
  { 
    id: "snake", 
    name: "Jogo da Cobra", 
    icon: <BsArrowRight />, 
    description: "Controle a cobra e coma as frutas para crescer" 
  },
  { 
    id: "pong", 
    name: "Pong", 
    icon: <BsJoystick />, 
    description: "Clássico jogo de ping-pong" 
  },
];