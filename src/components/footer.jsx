export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        © {new Date().getFullYear()} Gustavo Lincoln Souza Ribeiro. Todos os direitos reservados.
      </div>
    </footer>
  )
}
