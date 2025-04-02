import { useCallback } from "react"
import { Particles } from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles-hero"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "transparent" },
        particles: {
          number: { 
            value: 30,
            density: {
              enable: true,
              value_area: 800
            }
          },
          size: { 
            value: 2,
            random: true
          },
          move: { 
            enable: true, 
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
          },
          color: { value: "#7c3aed" },
          opacity: { 
            value: 0.2,
            animation: {
              enable: true,
              speed: 1,
              sync: false
            }
          },
          links: { 
            enable: true, 
            color: "#7c3aed", 
            distance: 100, 
            opacity: 0.15,
            width: 1
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab"
            }
          }
        }
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}