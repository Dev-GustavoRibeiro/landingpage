// app/layout.js
import "./globals.css"

export const metadata = {
  title: "Gustavo Ribeiro",
  description: "Portfólio de Gustavo Ribeiro",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
