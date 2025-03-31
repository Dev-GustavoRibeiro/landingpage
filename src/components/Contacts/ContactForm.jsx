"use client";

import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

const ContactForm = ({ onSubmit, formData, setFormData }) => (
  <form onSubmit={onSubmit} className="space-y-5">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
        Seu Nome
      </label>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        placeholder="Como posso te chamar?"
        required
      />
    </div>
    
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
        Sua Mensagem
      </label>
      <textarea
        id="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
        rows="4"
        placeholder="Conte-me sobre seu projeto..."
        required
      />
    </div>
    
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-indigo-500/30"
    >
      <FiSend size={20} />
      Enviar Mensagem
    </motion.button>
  </form>
);

export default ContactForm;
