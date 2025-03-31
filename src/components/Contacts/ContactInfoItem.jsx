"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

export default function ContactInfoItem({ icon, label, value, copyValue, isLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      className="flex items-center gap-3 p-3 hover:bg-gray-800/50 rounded transition"
      whileHover={{ x: 5 }}
    >
      <div className="text-indigo-400">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" className="text-white hover:text-indigo-300">
            {copyValue || value}
          </a>
        ) : (
          <div className="flex items-center">
            <span className="text-white">{value}</span>
            {copyValue && (
              <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-indigo-400">
                <FiCopy size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      {copied && <span className="text-xs text-green-400">Copiado!</span>}
    </motion.div>
  );
}
