"use client";

import { useEffect, useReducer, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamic imports
const Particles = dynamic(
  () => import("react-tsparticles").then((mod) => mod.default),
  { ssr: false }
);
const Confetti = dynamic(
  () => import("react-confetti").then((mod) => mod.default),
  { ssr: false }
);

// Componentes e ícones
import ContactInfoItem from "./ContactInfoItem";
import ContactForm from "./ContactForm";
import StatCard from "./StatCard";
import {
  FiPhone,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiExternalLink,
  FiMaximize2,
  FiCheck,
  FiAward,
  FiClock,
  FiUsers,
  FiGlobe,
  FiCalendar,
  FiMessageSquare,
  FiThumbsUp
} from "react-icons/fi";

// Função debounce
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Estado inicial e reducer para a área de contato (sem feedback)
const initialState = {
  mounted: false,
  isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  windowSize: {
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  },
  formData: { name: "", message: "" },
  showConfetti: false,
  isMapExpanded: false,
  activeTab: "contact"
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MOUNTED":
      return { ...state, mounted: action.payload };
    case "SET_WINDOW_SIZE":
      return {
        ...state,
        windowSize: action.payload,
        isMobile: action.payload.width < 768
      };
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "SET_CONFETTI":
      return { ...state, showConfetti: action.payload };
    case "TOGGLE_MAP_EXPANDED":
      return { ...state, isMapExpanded: !state.isMapExpanded };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}

export default function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hooks chamados no topo
  const stats = useMemo(
    () => [
      { value: "50+", label: "Projetos", icon: <FiCheck className="text-green-400" /> },
      { value: "100%", label: "Satisfação", icon: <FiAward className="text-yellow-400" /> },
      { value: "24h", label: "Resposta", icon: <FiClock className="text-blue-400" /> },
      { value: "40+", label: "Clientes", icon: <FiUsers className="text-purple-400" /> }
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "Desenvolvimento Web",
        description: "Seu site dos sonhos",
        icon: <FiGlobe className="text-indigo-400" size={24} />
      },
      {
        title: "UI/UX Design",
        description: "Experiências que encantam",
        icon: <FiThumbsUp className="text-purple-400" size={24} />
      },
      {
        title: "Consultoria",
        description: "Soluções que impulsionam",
        icon: <FiMessageSquare className="text-blue-400" size={24} />
      },
      {
        title: "Manutenção",
        description: "Seu sucesso garantido",
        icon: <FiCalendar className="text-green-400" size={24} />
      }
    ],
    []
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      dispatch({
        type: "SET_WINDOW_SIZE",
        payload: { width, height: window.innerHeight }
      });
    }, 150);

    window.addEventListener("resize", handleResize);
    handleResize();
    dispatch({ type: "SET_MOUNTED", payload: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simplifica animações no mobile
  const getAnimationProps = (props) => (state.isMobile ? {} : props);

  // Handler para envio do formulário de contato
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_CONFETTI", payload: true });
    setTimeout(() => dispatch({ type: "SET_CONFETTI", payload: false }), 3000);

    window.open(
      `https://api.whatsapp.com/send?phone=5575992191260&text=${encodeURIComponent(
        `Olá, sou ${state.formData.name}! ${state.formData.message}`
      )}`,
      "_blank"
    );
  };

  if (!state.mounted) return <div>Carregando...</div>;

  return (
    <section
      id="contact"
      className="relative py-4 md:py-9 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
    >
      {/* Particles somente em desktop */}
      {!state.isMobile && (
        <Particles
          options={{
            particles: {
              number: { value: state.isMobile ? 20 : 60 },
              size: { value: 3 },
              move: { enable: true, speed: state.isMobile ? 0.5 : 1 },
              color: { value: ["#a78bfa", "#4f46e5"] },
              opacity: { value: 0.3 },
              links: {
                enable: !state.isMobile,
                color: "#a78bfa",
                distance: 150,
                opacity: 0.2
              }
            }
          }}
          className="absolute inset-0 z-0"
        />
      )}

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Título principal */}
        <motion.div
          {...getAnimationProps({
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: -60 },
            transition: { duration: 0.8 }
          })}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 leading-snug pb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Realize Seu Projeto Agora!
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl md:max-w-3xl mx-auto">
            Sua ideia merece ganhar vida com soluções únicas e poderosas!
          </p>
        </motion.div>

        {/* Estatísticas */}
        <motion.div
          {...getAnimationProps({
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            transition: { staggerChildren: 0.1 }
          })}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
        >
          {stats.map((stat, i) => (
            <StatCard key={`stat-${i}`} {...stat} isMobile={state.isMobile} />
          ))}
        </motion.div>

        {/* Serviços */}
        <motion.div
          {...getAnimationProps({
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6 }
          })}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Por Que Escolher Meus Serviços?
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Resultados que transformam seu negócio!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={`service-${i}`}
                {...getAnimationProps({ whileHover: { y: -5 } })}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-indigo-400/30"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-indigo-500/10 rounded-lg">
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {service.title}
                  </h4>
                </div>
                <p className="text-gray-300 text-sm md:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabs no mobile */}
        {state.isMobile && (
          <div className="flex mb-6 rounded-lg bg-white/10 p-1">
            {["contact", "form", "location"].map((tab) => (
              <button
                key={`tab-${tab}`}
                onClick={() => dispatch({ type: "SET_ACTIVE_TAB", payload: tab })}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                  state.activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab === "contact"
                  ? "Contato"
                  : tab === "form"
                  ? "Mensagem"
                  : "Localização"}
              </button>
            ))}
          </div>
        )}

        {/* Cards: Contato / Formulário / Localização */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Card Contato */}
          {(!state.isMobile || state.activeTab === "contact") && (
            <motion.div
              key="card-contato"
              {...getAnimationProps({
                initial: { opacity: 0, x: -50 },
                whileInView: { opacity: 1, x: 0 },
                transition: { duration: 0.8 }
              })}
              className="scroll-mt-[100px] px-4 py-6 md:py-8 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 via-indigo-900/5 to-transparent"
            >
              <div className="p-4 md:p-6 border-b border-gray-800">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                  Fale Comigo Hoje!
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Escolha o canal que preferir
                </p>
              </div>
              <div className="divide-y divide-gray-800">
                {[
                  {
                    icon: <FiPhone size={20} />,
                    label: "Telefone",
                    value: "(75) 99219-1260",
                    copyValue: "5575992191260",
                    tooltipId: "copy-phone"
                  },
                  {
                    icon: <FiMail size={20} />,
                    label: "E-mail",
                    value: "mailto:contatogustavoribeirohm@gmail.com",
                    copyValue: "Clique para enviar um e-mail",
                    tooltipId: "copy-email",
                    isLink: true
                  },
                  {
                    icon: <FiLinkedin size={20} />,
                    label: "LinkedIn",
                    value: "https://linkedin.com/in/gustavo-ribeiro-48b18433b/",
                    copyValue: "linkedin.com/in/gustavo-ribeiro",
                    isLink: true
                  },
                  {
                    icon: <FiGithub size={20} />,
                    label: "GitHub",
                    value: "https://github.com/Dev-GustavoRibeiro",
                    copyValue: "",
                    isLink: true
                  }
                ].map((method, i) => (
                  <ContactInfoItem
                    key={`method-${i}`}
                    {...method}
                    isMobile={state.isMobile}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Card Formulário */}
          {(!state.isMobile || state.activeTab === "form") && (
            <motion.div
              key="card-form"
              {...getAnimationProps({
                initial: { opacity: 0, y: 50 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8 }
              })}
              className="scroll-mt-[100px] px-4 py-6 md:py-8 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 via-indigo-900/5 to-transparent"
              id="contact-form"
            >
              <div className="p-4 md:p-6 border-b border-gray-800">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                  Dê o Primeiro Passo!
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Envie sua mensagem agora e comece já
                </p>
              </div>
              <div className="p-4 md:p-6">
                <ContactForm
                  onSubmit={handleSubmit}
                  formData={state.formData}
                  setFormData={(data) =>
                    dispatch({ type: "SET_FORM_DATA", payload: data })
                  }
                  isMobile={state.isMobile}
                />
              </div>
            </motion.div>
          )}

          {/* Card Localização */}
          {(!state.isMobile || state.activeTab === "location") && (
            <motion.div
              key="card-location"
              {...getAnimationProps({
                initial: { opacity: 0, x: 50 },
                whileInView: { opacity: 1, x: 0 },
                transition: { duration: 0.8 }
              })}
              className="scroll-mt-[100px] px-4 py-6 md:py-8 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 via-indigo-900/5 to-transparent"
            >
              <div className="p-4 md:p-6 border-b border-gray-800 flex justify-between items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    Onde Estou?
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base flex items-center gap-1">
                    <FiMaximize2 size={14} /> Feira de Santana, BA
                  </p>
                </div>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Pronto para Você
                </span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  state.isMapExpanded ? "h-64 md:h-96" : "h-48 md:h-64"
                }`}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3895.614614614614!2d-38.965382685185185!3d-12.254614991295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7143b3b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sFeira%20de%20Santana%2C%20BA%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1698771234567!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div className="p-3 md:p-4 border-t border-gray-800 flex justify-between">
                <motion.a
                  key="maps-link"
                  href="https://goo.gl/maps/xyz"
                  target="_blank"
                  rel="noopener"
                  {...getAnimationProps({ whileHover: { scale: 1.03 } })}
                  className="text-indigo-400 text-xs md:text-sm flex items-center gap-1 md:gap-2"
                >
                  <FiExternalLink size={14} /> Ver no Maps
                </motion.a>
                <motion.button
                  key="maps-expand"
                  onClick={() => dispatch({ type: "TOGGLE_MAP_EXPANDED" })}
                  {...getAnimationProps({ whileHover: { scale: 1.03 } })}
                  className="text-indigo-400 text-xs md:text-sm flex items-center gap-1 md:gap-2"
                >
                  <FiMaximize2 size={14} />
                  {state.isMapExpanded ? "Reduzir" : "Expandir"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Confetti somente em desktop */}
      {!state.isMobile &&
        state.showConfetti &&
        state.windowSize.width > 0 &&
        state.windowSize.height > 0 && (
          <Confetti
            width={state.windowSize.width}
            height={state.windowSize.height}
            numberOfPieces={100}
          />
        )}
    </section>
  );
}
