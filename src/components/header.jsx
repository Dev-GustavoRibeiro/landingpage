"use client"
/*
  "use client" indica que esse componente é renderizado no lado do cliente,
  permitindo uso de interatividade, hooks, etc.
*/
import Link from 'next/link'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
/*
  Exemplos de ícones do react-icons (opcional).
  Você pode instalar com "yarn add react-icons" se quiser usá-los.
*/

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* 
        Container central para limitar a largura e alinhar conteúdo 
        px-4 -> padding horizontal
        py-3 -> padding vertical
        flex -> exibe itens em linha
        justify-between -> espaço entre logo/menu
        items-center -> alinha verticalmente
      */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo ou Nome */}
        <Link href="#perfil">
          <a className="text-xl font-bold hover:text-blue-500 transition-colors">
            Gustavo Ribeiro
          </a>
        </Link>
        
        {/* Navegação principal */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#perfil">
                <a className="hover:text-blue-500 transition-colors">Perfil</a>
              </Link>
            </li>
            <li>
              <Link href="#formacao">
                <a className="hover:text-blue-500 transition-colors">Formação</a>
              </Link>
            </li>
            <li>
              <Link href="#experiencia">
                <a className="hover:text-blue-500 transition-colors">Experiência</a>
              </Link>
            </li>
            <li>
              <Link href="#habilidades">
                <a className="hover:text-blue-500 transition-colors">Habilidades</a>
              </Link>
            </li>
            <li>
              <Link href="#projetos">
                <a className="hover:text-blue-500 transition-colors">Projetos</a>
              </Link>
            </li>
            <li>
              <Link href="#contato">
                <a className="hover:text-blue-500 transition-colors">Contato</a>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Ícones de Redes Sociais (opcional) */}
        <div className="flex space-x-4 ml-4">
          <a 
            href="https://github.com/Dev-GustavoRibeiro" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-gray-600"
          >
            <BsGithub size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-gray-600"
          >
            <BsLinkedin size={24} />
          </a>
        </div>
      </div>
    </header>
  )
}
