"use client";

import { useState, useEffect, useMemo } from "react";
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
import StarRating from "./StarRating";
import {
  FiPhone,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiSend,
  FiExternalLink,
  FiMaximize2,
  FiCheck,
  FiAward,
  FiClock,
  FiUsers,
  FiZap,
  FiMapPin,
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

export default function Contact() {
  const [state, setState] = useState({
    mounted: false,
    isMobile: typeof window !== "undefined" && window.innerWidth < 768,
    windowSize: {
      width: typeof window !== "undefined" ? window.innerWidth : 0,
      height: typeof window !== "undefined" ? window.innerHeight : 0
    },
    formData: { name: "", message: "" },
    feedbackData: { rating: 0, comment: "", name: "", email: "", service: "" },
    feedbacks: [],
    showConfetti: false,
    isMapExpanded: false,
    activeTab: "contact"
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      setState((s) => ({
        ...s,
        windowSize: { width, height: window.innerHeight },
        isMobile: width < 768
      }));
    }, 150);

    window.addEventListener("resize", handleResize);
    handleResize();
    setState((s) => ({ ...s, mounted: true }));

    // Busca dos feedbacks
    fetch("/api/feedbacks")
      .then((res) => (res.ok ? res.json() : Promise.reject(`Erro HTTP: ${res.status}`)))
      .then((data) => setState((s) => ({ ...s, feedbacks: data })))
      .catch((err) => console.error("Erro ao buscar feedbacks:", err));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dados
  const stats = useMemo(
    () => [
      { value: "50+", label: "Projetos", icon: <FiCheck className="text-green-400" /> },
      { value: "100%", label: "Satisfação", icon: <FiAward className="text-yellow-400" /> },
      { value: "24h", label: "Resposta", icon: <FiClock className="text-blue-400" /> },
      { value: "40+", label: "Clientes", icon: <FiUsers className="text-purple-400" /> }
    ],
    []
  );

  const contactMethods = useMemo(
    () => [
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
        copyValue: "contatogustavoribeirohm@gmail.com",
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

  const averageRating = state.feedbacks.length
    ? (
        state.feedbacks.reduce((acc, curr) => acc + curr.rating, 0) /
        state.feedbacks.length
      ).toFixed(1)
    : 0;

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setState((s) => ({ ...s, showConfetti: true }));
    setTimeout(() => setState((s) => ({ ...s, showConfetti: false })), 3000);

    // Abrir WhatsApp
    window.open(
      `https://api.whatsapp.com/send?phone=5575992191260&text=${encodeURIComponent(
        `Olá, sou ${state.formData.name}! ${state.formData.message}`
      )}`,
      "_blank"
    );
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!state.feedbackData.rating) return;
    try {
      const res = await fetch("/api/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...state.feedbackData,
          name: state.feedbackData.name || "Anônimo"
        })
      });
      if (!res.ok) throw new Error("Erro ao enviar feedback");

      const newFeedback = await res.json();
      setState((s) => ({
        ...s,
        feedbacks: [newFeedback, ...s.feedbacks],
        showConfetti: true,
        feedbackData: { rating: 0, comment: "", name: "", email: "", service: "" }
      }));
      setTimeout(() => setState((s) => ({ ...s, showConfetti: false })), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  if (!state.mounted) return <div>Carregando...</div>;

  // Desabilita animações no mobile
  const getAnimationProps = (props) =>
    state.isMobile ? {} : props;

  return (
    <section
      id="contact"
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
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
            <StatCard
              key={`stat-${i}`}
              {...stat}
              isMobile={state.isMobile}
            />
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
                onClick={() => setState((s) => ({ ...s, activeTab: tab }))}
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
                {contactMethods.map((method, i) => (
                  <ContactInfoItem
                    key={`method-${i}`}
                    {...method}
                    isMobile={state.isMobile}
                  />
                ))}
              </div>
              <div className="p-4 md:p-6 border-t border-gray-800"></div>
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
                    setState((s) => ({ ...s, formData: data }))
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
                    <FiMapPin size={14} /> Feira de Santana, BA
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
                  onClick={() =>
                    setState((s) => ({ ...s, isMapExpanded: !s.isMapExpanded }))
                  }
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

        {/* Depoimentos */}
        <motion.div
          {...getAnimationProps({
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            transition: { duration: 0.6 }
          })}
          className="scroll-mt-[100px] px-4 py-8 md:py-12 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 via-indigo-900/5 to-transparent"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <div className="bg-indigo-700 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 md:gap-2 mb-4">
                <FiZap className="animate-pulse" size={14} /> DEPOIMENTOS
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Clientes Felizes Falam por Mim!
              </h3>
              <p className="text-indigo-100 text-base md:text-lg">
                Junte-se a quem já transformou ideias em sucesso!
              </p>
              <div className="mt-4 text-2xl text-white flex items-center justify-center gap-2">
                <span>{averageRating}</span>
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(averageRating))}
                  {averageRating % 1 >= 0.5 && "⯪"}
                  {"☆".repeat(5 - Math.ceil(averageRating))}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleFeedbackSubmit}
              className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/20 mb-6"
            >
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                Faça Parte Dessa História!
              </h4>
              <div className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  value={state.feedbackData.name}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      feedbackData: { ...s.feedbackData, name: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                  placeholder="Seu nome (opcional)"
                />
                <input
                  type="email"
                  value={state.feedbackData.email}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      feedbackData: { ...s.feedbackData, email: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                  placeholder="Seu e-mail (opcional)"
                />
                <select
                  value={state.feedbackData.service}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      feedbackData: { ...s.feedbackData, service: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                >
                  <option value="">Escolha o serviço...</option>
                  <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                  <option value="SEO">SEO</option>
                  <option value="Branding">Branding</option>
                  <option value="Outro">Outro</option>
                </select>
                <StarRating
                  rating={state.feedbackData.rating}
                  setRating={(rating) =>
                    setState((s) => ({
                      ...s,
                      feedbackData: { ...s.feedbackData, rating }
                    }))
                  }
                  isMobile={state.isMobile}
                />
                <textarea
                  value={state.feedbackData.comment}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      feedbackData: { ...s.feedbackData, comment: e.target.value }
                    }))
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                  rows={3}
                  placeholder="Compartilhe sua experiência!"
                />
                <motion.button
                  type="submit"
                  {...getAnimationProps({ whileHover: { scale: 1.03 } })}
                  className="bg-white text-indigo-700 font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center justify-center gap-1 md:gap-2 w-full mt-2 text-sm md:text-base"
                  disabled={!state.feedbackData.rating}
                >
                  <FiSend size={16} /> Envie Agora
                </motion.button>
              </div>
            </form>

            <motion.div layout className="space-y-3 md:space-y-4">
              {state.feedbacks.length ? (
                state.feedbacks.map((f, i) => (
                  <motion.div
                    key={f.id || `feedback-${i}`}
                    {...getAnimationProps({
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 }
                    })}
                    className="bg-gray-800/50 border border-gray-700 p-3 md:p-4 rounded-lg shadow hover:-translate-y-1 hover:shadow-lg"
                    layout
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm md:text-lg">
                          {(f.name || "Anônimo").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-sm md:text-base">
                            {f.name || "Anônimo"}
                          </h5>
                          {f.service && (
                            <p className="text-xs md:text-sm text-indigo-200">
                              Serviço: {f.service}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-sm md:text-lg">
                        {"★".repeat(f.rating || 0)}
                        {"☆".repeat(5 - (f.rating || 0))}
                      </div>
                    </div>
                    <p className="text-white/80 italic text-sm md:text-base">
                      "{f.comment || ""}"
                    </p>
                    {f.createdAt && (
                      <p className="text-white/50 text-xs mt-1 md:mt-2 text-right">
                        {new Date(f.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-white text-center py-4">
                  Seja o primeiro a brilhar aqui!
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          {...getAnimationProps({
            initial: { opacity: 0, y: 50 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.6 }
          })}
          className="text-center mt-12 md:mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Não Espere Mais!
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Seu projeto incrível está a um clique de começar. Vamos criar juntos?
          </p>
          <motion.a
            href="#contact-form"
            {...getAnimationProps({ whileHover: { scale: 1.05 } })}
            className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-indigo-500/30"
          >
            Comece Hoje!
          </motion.a>
        </motion.div>
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
