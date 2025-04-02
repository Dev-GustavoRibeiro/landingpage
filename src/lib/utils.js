import { clsx } from 'clsx';

/**
 * Combina múltiplos nomes de classe em uma única string
 * @param {...string} inputs - Nomes de classe para combinar
 * @returns {string} - Nomes de classe combinados
 */
export function cn(...inputs) {
  return clsx(inputs);
}