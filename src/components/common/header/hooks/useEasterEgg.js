import { useState, useEffect } from 'react';
import { easterEggs } from '../constants';

export function useEasterEgg() {
  const [activeEasterEgg, setActiveEasterEgg] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [secretCodeProgress, setSecretCodeProgress] = useState("");

  useEffect(() => {
    for (const [word, config] of Object.entries(easterEggs)) {
      if (typedText.includes(word.toUpperCase())) {
        activateEasterEgg(word, config);
        setTypedText("");
        break;
      }
    }

    // Mostrar progresso de digitação para easter eggs
    for (const word of Object.keys(easterEggs)) {
      for (let i = 2; i <= word.length; i++) {
        const prefix = word.substring(0, i).toUpperCase();
        if (typedText.endsWith(prefix)) {
          setSecretCodeProgress(prefix);
          setTimeout(() => setSecretCodeProgress(""), 2000);
          break;
        }
      }
    }
  }, [typedText]);

  const activateEasterEgg = (word, config) => {
    setActiveEasterEgg(word);
    // Música continuará tocando até usuário clicar em fechar
  };

  const handleKeyPress = (e) => {
    if (!e.ctrlKey && !e.altKey && !e.metaKey) {
      setTypedText(prev => (prev + e.key).slice(-20).toUpperCase());
    }
  };

  return {
    activeEasterEgg,
    secretCodeProgress,
    handleKeyPress,
    activateEasterEgg,
    easterEggs
  };
}
