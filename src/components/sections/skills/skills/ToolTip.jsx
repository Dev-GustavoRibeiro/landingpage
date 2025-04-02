import { useState } from "react"

export default function ToolTip({ children, text, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false)
  
  const positions = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  }
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute ${positions[position]} z-10 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm whitespace-nowrap`}>
          {text}
          <div className={`absolute ${
            position === "top" ? "top-full left-1/2 transform -translate-x-1/2 border-t-gray-900" : 
            position === "bottom" ? "bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900" :
            position === "left" ? "left-full top-1/2 transform -translate-y-1/2 border-l-gray-900" :
            "right-full top-1/2 transform -translate-y-1/2 border-r-gray-900"
          } border-solid border-8 border-transparent`}></div>
        </div>
      )}
    </div>
  )
}