import React from "react"

export default function DeviceFrame() {
  return (
    <picture>
      <source 
        media="(max-width: 480px)" 
        srcSet="/images/hero-iphone.png" 
        type="image/png"
      />
      <source 
        media="(max-width: 768px)" 
        srcSet="/images/hero-ipad.png" 
        type="image/png"
      />
      <source 
        srcSet="/images/hero-macbook.png" 
        type="image/png"
      />
      {/* Fallback for browsers that don't support webp */}
      <source media="(max-width: 480px)" srcSet="/images/hero-iphone.png" />
      <source media="(max-width: 768px)" srcSet="/images/hero-ipad.png" />
      <img
        src="/images/hero-macbook.png"
        alt="Device Frame"
        className="w-full h-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </picture>
  )
}