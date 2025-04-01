"use client";
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesWrapper(props) {
  // Este componente será renderizado apenas no cliente
  return (
    <Particles
      init={async (engine) => {
        
        await loadFull(engine);
      }}
      {...props}
    />
  );
}
