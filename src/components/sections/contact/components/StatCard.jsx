"use client";

import { motion } from "framer-motion";

export default function StatCard({ value, label, icon }) {
  return (
    <motion.div
      className="p-4 bg-gray-900 border border-gray-800 rounded-xl text-center"
      whileHover={{ y: -5 }}
    >
      <div className="text-2xl text-white font-bold flex items-center justify-center gap-1">
        {icon} {value}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  );
}
