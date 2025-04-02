import { motion } from "framer-motion"
import { useState } from "react"

export default function ExpandableText({ children, maxLength = 120, className = "" }) {
  const [expanded, setExpanded] = useState(false)
  const toggle = () => setExpanded(!expanded)
  const text = typeof children === "string" ? children : ""
  
  if (!text) return null

  const displayText =
    expanded || text.length <= maxLength ? text : text.slice(0, maxLength) + "..."

  return (
    <motion.p
      onClick={toggle}
      className={`cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}{" "}
      {text.length > maxLength && (
        <span className="text-indigo-400 font-bold">
          {expanded ? "Ver menos" : "Ver mais"}
        </span>
      )}
    </motion.p>
  )
}