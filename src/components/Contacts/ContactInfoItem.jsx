"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

const ContactInfoItem = ({ icon, label, value, copyValue, tooltipId, isLink = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyValue) {
      navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div 
      className="flex items-start gap-4 p-3 hover:bg-gray-800/30 rounded-lg transition-colors"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        whileHover={{ scale: 1.2, rotate: 10 }}
        className="text-indigo-400 mt-0.5 flex-shrink-0"
      >
        {icon}
      </motion.div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
        {isLink ? (
          <a
            href={value.startsWith('http') ? value : `mailto:${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-indigo-300 transition-colors text-base font-medium block truncate"
          >
            {copyValue || value}
          </a>
        ) : (
          <p className="text-white text-base font-medium">
            {value}
            {copyValue && (
              <motion.button
                onClick={handleCopy}
                className="ml-2 text-gray-400 hover:text-indigo-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiCopy size={16} />
              </motion.button>
            )}
          </p>
        )}
      </div>
      {tooltipId && copied && (
        <span className="text-xs text-green-400 ml-2">Copiado!</span>
      )}
    </motion.div>
  );
};

export default ContactInfoItem;
