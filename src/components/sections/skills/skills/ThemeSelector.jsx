"use client";

export default function ThemeSelector({ currentTheme, setCurrentTheme, themes, minimal = false }) {
  // Versão minimalista para dispositivos móveis
  if (minimal) {
    return (
      <div className="flex space-x-1 mb-2">
        {themes.map((theme, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTheme(idx)}
            className={`w-4 h-4 rounded-full touch-manipulation ${
              idx === 0 ? "bg-black" : 
              idx === 1 ? "bg-gray-100" : 
              idx === 2 ? "bg-[#272822]" : 
              "bg-[#282a36]"
            } ${currentTheme === idx ? "ring-2 ring-indigo-500" : ""}`}
            aria-label={`Tema ${theme.name}`}
          />
        ))}
      </div>
    );
  }

  // Versão completa para desktop
  return (
    <div className="flex flex-wrap gap-1 mb-2">
      {themes.map((theme, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentTheme(idx)}
          className={`px-2 py-1 text-xs rounded-md transition touch-manipulation ${
            currentTheme === idx 
              ? "bg-indigo-600 text-white" 
              : `${theme.bg} ${theme.text} bg-opacity-50 hover:bg-opacity-70`
          }`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}