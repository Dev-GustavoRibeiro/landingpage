import NavigationButton from "./NavigationButton";
import { Pause, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Controls({
  projects,
  activeIndex,
  isPlaying,
  onPrev,
  onNext,
  onPlayPause,
  onDotClick
}) {
  return (
    <div className="relative z-10 mt-10 sm:mt-14 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        <div className="flex gap-4 sm:gap-6">
          <NavigationButton direction="prev" onClick={onPrev} />
          <motion.button
            onClick={onPlayPause}
            className="p-3 sm:p-3.5 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </motion.button>
          <NavigationButton direction="next" onClick={onNext} />
        </div>

        <div className="flex gap-3 sm:gap-4">
          {projects.map((_, index) => (
            <button key={index} onClick={() => onDotClick(index)}>
              <div className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-indigo-400" : "w-3 bg-gray-600"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}