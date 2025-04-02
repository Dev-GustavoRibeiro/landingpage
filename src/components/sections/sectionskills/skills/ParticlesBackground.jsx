"use client";

import { useEffect, useState } from "react";

export default function ParticlesBackground() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Implementação simplificada de partículas usando canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 -z-10';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    const container = document.getElementById('skills');
    if (container) {
      container.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      const particles = [];
      
      // Ajusta o tamanho do canvas para corresponder ao tamanho do container
      const resizeCanvas = () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      
      // Cria partículas
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: '#6366f1',
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
      
      // Anima as partículas
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
          ctx.fill();
          
          // Move a partícula
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Rebate nas bordas
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      setLoaded(true);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
      };
    }
  }, []);

  return null;
}