// components/TechBadge.jsx
"use client";

import { motion } from "framer-motion";

export default function TechBadge({ tech, icon }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.05 }}
      className="flex items-center gap-1 px-2 py-1 bg-indigo-900/30 rounded-full 
      border border-indigo-500/20 text-xs sm:text-sm text-gray-200"
    >
      {icon && <span className="text-sm">{icon}</span>}
      <span className="capitalize">{tech}</span>
    </motion.div>
  );
}