"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

export default function ContactInfoItem({ icon, label, value, copyValue = value, isLink = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // Fallback para dispositivos móveis
      const textArea = document.createElement("textarea");
      textArea.value = copyValue;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Se copyValue for um e-mail, insere uma quebra de linha antes do domínio
  let formattedValue = copyValue;
  if (copyValue.includes("@")) {
    const [local, domain] = copyValue.split("@");
    formattedValue = (
      <>
        {local}
        <br />@{domain}
      </>
    );
  }

  return (
    <motion.div className="flex items-center gap-3 p-3 hover:bg-gray-800/50 rounded transition">
      <div className="text-indigo-400">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-400">{label}</p>
        {isLink ? (
          <a href={value} target="_blank" className="text-white hover:text-indigo-300">
            {formattedValue}
          </a>
        ) : (
          <div className="flex items-center">
            <span className="text-white">{formattedValue}</span>
            <button onClick={handleCopy} className="ml-2 text-gray-400 hover:text-indigo-400" aria-label="Copiar">
              <FiCopy size={14} />
            </button>
          </div>
        )}
      </div>
      {copied && <span className="text-xs text-green-400">Copiado!</span>}
    </motion.div>
  );
}
