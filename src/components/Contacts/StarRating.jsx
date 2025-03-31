"use client";

import { motion } from "framer-motion";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-white font-medium">Sua avaliação:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          type="button" // importante para evitar submit acidental
          key={star}
          onClick={() => setRating(star)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-3xl text-yellow-400 focus:outline-none"
        >
          {star <= rating ? "★" : "☆"}
        </motion.button>
      ))}
    </div>
  );
};

export default StarRating;
