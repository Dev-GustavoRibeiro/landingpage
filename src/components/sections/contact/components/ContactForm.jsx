"use client";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

export default function ContactForm({ onSubmit, formData, onFieldChange }) {
  // Manipulador de mudança unificado
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFieldChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Campo Nome */}
      <div>
        <label className="text-sm text-gray-400">Seu Nome</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-indigo-500"
          placeholder="Como posso te chamar?"
          required
        />
      </div>

      {/* Campo Mensagem - Corrigido para mobile */}
      <div>
        <label className="text-sm text-gray-400">Mensagem</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-indigo-500"
          rows={4}
          placeholder="Conte-me sobre seu projeto..."
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-white rounded-lg flex items-center justify-center gap-2"
      >
        <FiSend size={18} /> Enviar Mensagem
      </motion.button>
    </form>
  );
}