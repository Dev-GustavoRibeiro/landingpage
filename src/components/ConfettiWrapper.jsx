"use client";
import React from "react";
import Confetti from "react-confetti";

export default function ConfettiWrapper(props) {
  // Também só será renderizado no cliente
  return <Confetti {...props} />;
}
