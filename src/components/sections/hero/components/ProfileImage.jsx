import { motion } from "framer-motion"

export default function ProfileImage() {
  return (
    <motion.div
      className="flex-shrink-0 flex justify-center mb-3 sm:mb-4 md:mb-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src="/images/foto1.png"
        alt="Foto de Gustavo Ribeiro"
        loading="lazy"
        className="
          w-20 xs:w-24 sm:w-32 md:w-40 lg:w-60 
          h-auto object-cover 
          drop-shadow-2xl 
          rounded-full border-4 border-indigo-500/30 
          hover:scale-105 transition-transform duration-500
        "
        width={240}
        height={240}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = "/images/foto1.png"
        }}
      />
    </motion.div>
  )
}