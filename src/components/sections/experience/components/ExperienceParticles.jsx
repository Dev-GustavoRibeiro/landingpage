'use client';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ExperienceParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-experience"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: 'transparent' },
        particles: {
          number: { value: 30 },
          size: { value: 1.5 },
          move: { enable: true, speed: 0.3 },
          color: { value: '#7c3aed' },
          opacity: { value: 0.2 },
          links: { 
            enable: true, 
            color: '#7c3aed', 
            distance: 80, 
            opacity: 0.1 
          },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
};

export default ExperienceParticles;