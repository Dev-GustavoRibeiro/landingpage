"use client";

import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

export default function ContactForm({ onSubmit, formData, setFormData }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-gray-400">Seu Nome</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-indigo-500"
          placeholder="Como posso te chamar?"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Mensagem</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-indigo-500 resize-none"
          rows="4"
          placeholder="Conte-me sobre seu projeto..."
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
      >
        <FiSend size={18} /> Enviar Mensagem
      </motion.button>
    </form>
  );
}
