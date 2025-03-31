"use client";

import { motion } from "framer-motion";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      <span className="text-white">Avaliação:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="text-2xl text-yellow-400"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {star <= rating ? "★" : "☆"}
        </motion.button>
      ))}
    </div>
  );
}
