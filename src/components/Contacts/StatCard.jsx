"use client";

import { motion } from "framer-motion";

const StatCard = ({ value, label, icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-gray-900/40 p-4 rounded-xl border border-gray-800 text-center"
  >
    <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
      {icon}
      {value}
    </div>
    <p className="text-sm text-gray-300">{label}</p>
  </motion.div>
);

export default StatCard;
