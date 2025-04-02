import { motion } from "framer-motion";

export default function AboutImage() {
  return (
    <motion.img
      src="/images/foto2.png"
      alt="Gustavo Ribeiro"
      className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-80 lg:w-80 lg:h-96 object-cover rounded-full border-4 border-indigo-500 shadow-xl hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "/images/placeholder.png";
      }}
    />
  );
}