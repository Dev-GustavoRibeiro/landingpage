export default function TechIcons() {
  const icons = [
    { src: "/icons/js.svg", alt: "JavaScript" },
    { src: "/icons/python.svg", alt: "Python" },
    { src: "/icons/php.svg", alt: "PHP" },
    { src: "/icons/node.svg", alt: "Node.js" }
  ]

  return (
    <div className="flex space-x-2 mb-2">
      {icons.map((icon, idx) => (
        <div 
          key={idx} 
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
          title={icon.alt}
        >
          <img 
            src={icon.src} 
            alt={icon.alt} 
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}