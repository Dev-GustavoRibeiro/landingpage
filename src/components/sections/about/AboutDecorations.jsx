import Particles from "@/components/core/layout/ParticlesWrapper";

const decorationItems = [
  {
    src: "/images/computador.png",
    alt: "Computador",
    className: "top-6 sm:top-10 left-4 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
    animation: "animate-float",
  },
  {
    src: "/images/brainstorm.png",
    alt: "Cérebro",
    className: "bottom-4 sm:bottom-6 right-4 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10",
    animation: "animate-spin-slow",
  },
  {
    src: "/images/local-area.png",
    alt: "Rede",
    className: "top-6 sm:top-10 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10",
    animation: "animate-bounce",
  },
];

export default function AboutDecorations() {
  return (
    <>
      <Particles />
      {decorationItems.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt={item.alt}
          className={`absolute ${item.className} ${item.animation} opacity-70 pointer-events-none`}
          loading="lazy"
        />
      ))}
    </>
  );
}