'use client';
import { BsLightningChargeFill } from 'react-icons/bs';
import { FaNetworkWired, FaLaptopCode } from 'react-icons/fa';

const ExperienceDecorations = () => {
  return (
    <>
      <BsLightningChargeFill className="absolute top-4 sm:top-8 right-4 sm:right-8 text-indigo-500/40 animate-pulse text-2xl sm:text-3xl z-10" />
      <FaNetworkWired className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 text-indigo-400/30 animate-float text-2xl sm:text-3xl z-10" />
      <FaLaptopCode className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 text-indigo-400/30 animate-bounce text-2xl sm:text-3xl z-10" />
    </>
  );
};

export default ExperienceDecorations;