"use client";
import { motion } from "framer-motion";
import { FiZap, FiSend } from "react-icons/fi";
import StarRating from "./components/StarRating";
import useFeedback from "@/hooks/useFeedback";

export default function Feedbacks() {
  const { state, dispatch } = useFeedback();

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
      const newFeedback = await res.json();
      dispatch({ type: "ADD_FEEDBACK", payload: newFeedback });
      dispatch({ type: "RESET_FEEDBACK_DATA" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="feedbacks"
      className=""
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl md:rounded-3xl py-8 md:py-12 px-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 via-indigo-900/5 to-transparent"
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
              <span>{state.averageRating}</span>
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(state.averageRating))}
                {state.averageRating % 1 >= 0.5 && "⯪"}
                {"☆".repeat(5 - Math.ceil(state.averageRating))}
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
                  dispatch({ type: "UPDATE_FEEDBACK_DATA", payload: { name: e.target.value } })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                placeholder="Seu nome (opcional)"
              />
              <input
                type="email"
                value={state.feedbackData.email}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_FEEDBACK_DATA", payload: { email: e.target.value } })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                placeholder="Seu e-mail (opcional)"
              />
              <select
                value={state.feedbackData.service}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_FEEDBACK_DATA", payload: { service: e.target.value } })
                }
                className="w-full px-3 py-2 bg-gray-400/35 border border-white/10 rounded-lg text-neutral-400 text-sm md:text-base"
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
                  dispatch({ type: "UPDATE_FEEDBACK_DATA", payload: { rating } })
                }
              />
              <textarea
                value={state.feedbackData.comment}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_FEEDBACK_DATA", payload: { comment: e.target.value } })
                }
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm md:text-base"
                rows={3}
                placeholder="Compartilhe sua experiência!"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
    </section>
  );
}