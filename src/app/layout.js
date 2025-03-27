import './globals.css'

// Metadados do site
export const metadata = {
  title: 'Portfólio Gustavo Ribeiro',
  description: 'Desenvolvedor Full Cycle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
