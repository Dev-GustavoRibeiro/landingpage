'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function FormationParticles() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-formation"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "transparent" },
        particles: {
          number: { value: 50 },
          size: { value: 1.8 },
          move: { enable: true, speed: 0.4 },
          color: { value: "#7c3aed" },
          opacity: { value: 0.25 },
          links: { 
            enable: true, 
            color: "#7c3aed", 
            distance: 80, 
            opacity: 0.1 
          },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
}