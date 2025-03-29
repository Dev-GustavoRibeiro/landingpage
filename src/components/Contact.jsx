"use client"

import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Contact() {
  return (
    <motion.section
      id="contact"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="container mx-auto px-4 py-16 relative"
    >
      {/* Overlay de efeito glass */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl"></div>
      
      <div className="relative z-10 text-center text-white">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
          Contato
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl mb-8">
          Entre em contato para oportunidades e parcerias.
        </motion.p>
        <motion.div variants={itemVariants} className="space-y-4 text-lg">
          <p>
            <strong>Telefone:</strong> (75) 99219-1260
          </p>
          <p>
            <strong>E-mail:</strong>{" "}
            <a href="mailto:contatogustavoribeirohm@gmail.com" className="underline text-white">
              contatogustavoribeirohm@gmail.com
            </a>
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              linkedin.com/in/gustavo-ribeiro-48b18433b/
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/Dev-GustavoRibeiro"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              github.com/Dev-GustavoRibeiro
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
