import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground({ isMobile }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: false,
    background: { color: "transparent" },
    particles: {
      number: { value: isMobile ? 30 : 60 },
      size: { value: { min: 1, max: 2 } },
      move: { enable: true, speed: 0.5 },
      color: { value: "#7c3aed" },
      opacity: { value: { min: 0.1, max: 0.3 } },
      links: {
        enable: true,
        color: "#7c3aed",
        distance: 80,
        opacity: 0.1,
      },
    },
  };

  return (
    <Particles
      id="tsparticles-projects"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
}