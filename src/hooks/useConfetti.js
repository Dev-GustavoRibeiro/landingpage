"use client";
import { useState } from "react";

export default function useConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return { showConfetti, triggerConfetti };
}