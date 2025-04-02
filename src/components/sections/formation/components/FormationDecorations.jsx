'use client';
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';

export default function FormationDecorations() {
  return (
    <>
      <FaBookOpen 
        className="absolute top-4 sm:top-6 left-4 sm:left-10 text-2xl sm:text-3xl text-indigo-400/70 animate-float" 
      />
      <FaGraduationCap 
        className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 text-2xl sm:text-3xl text-indigo-400/70 animate-float" 
      />
    </>
  );
}