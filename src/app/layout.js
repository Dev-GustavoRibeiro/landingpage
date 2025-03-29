// app/layout.js
import "./globals.css"

export const metadata = {
  title: "Meu Portfólio",
  description: "Portfólio de Gustavo Ribeiro",
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
