"use client"

import Header from '../components/header'
import Footer from '../components/footer'
import ProjectsCarousel from '../components/ProjectsCarousel'

export default function Home() {
  return (
    <>
      {/* Cabeçalho */}
      <Header />

      {/* SEÇÃO: PERFIL PROFISSIONAL */}
      <section 
        id="perfil" 
        className="container mx-auto px-4 py-8"
      >
        <h2 className="text-3xl font-bold mb-4">Perfil Profissional</h2>
        <p className="text-lg leading-relaxed">
          Graduando em Engenharia da Computação pela UNIFAN e Técnico em Informática pelo Grupo IETAAM. 
          Possuo experiência consolidada em programação, gestão técnica, projetos voltados para provedores de internet e suporte ao cliente. 
          Destaco-me por habilidades interpessoais como comunicação eficaz, liderança, resolução criativa de problemas e facilidade em aprendizado contínuo.
        </p>
      </section>

      {/* SEÇÃO: FORMAÇÃO ACADÊMICA */}
      <section 
        id="formacao" 
        className="container mx-auto px-4 py-8 bg-gray-100"
      >
        <h2 className="text-3xl font-bold mb-4">Formação Acadêmica</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Engenharia da Computação</h3>
            <p className="text-sm text-gray-600">UNIFAN – Universidade Nobre • Conclusão prevista para Junho de 2026</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Técnico em Informática</h3>
            <p className="text-sm text-gray-600">Grupo IETAAM • Concluído em 2023</p>
          </div>
        </div>
      </section>

      {/* SEÇÃO: EXPERIÊNCIA PROFISSIONAL */}
      <section 
        id="experiencia" 
        className="container mx-auto px-4 py-8"
      >
        <h2 className="text-3xl font-bold mb-4">Experiência Profissional</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Projetista para Provedor – TECHNET FIBRA (2021 - 2024)</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Desenvolvimento de projetos de redes e infraestrutura tecnológica, enfatizando desempenho e segurança.</li>
            <li>Otimização contínua de sistemas para aprimorar serviços prestados aos clientes.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Diretor / Gerente Técnico – TECHNET FIBRA (2021 - 2024)</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Liderança e gerenciamento de equipes técnicas e administrativas.</li>
            <li>Coordenação estratégica de projetos, alinhando soluções tecnológicas aos objetivos organizacionais.</li>
            <li>Implantação de processos que aumentaram significativamente a produtividade e eficiência.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Suporte Técnico e Atendimento – TECHNET FIBRA (2020 - 2021)</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Atendimento e suporte técnico especializado, garantindo alta satisfação dos clientes.</li>
            <li>Resolução eficiente de problemas técnicos, tanto presencial quanto remotamente.</li>
            <li>Gestão eficaz da comunicação entre equipe e clientes.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Programador – LOADING (2024 - Atual)</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Desenvolvimento e manutenção de sistemas web e software personalizado.</li>
            <li>Implementação de processos automatizados, otimizando fluxos internos.</li>
            <li>Participação ativa em equipes multidisciplinares utilizando metodologias ágeis.</li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO: HABILIDADES */}
      <section 
        id="habilidades" 
        className="container mx-auto px-4 py-8 bg-gray-100"
      >
        <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
        
        {/* Habilidades Técnicas */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Habilidades Técnicas</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Linguagens de programação: JavaScript, Python, PHP</li>
            <li>Frameworks e tecnologias: React, Node.js, Prisma ORM, Next.js, Tailwind CSS</li>
            <li>Banco de Dados: MySQL</li>
            <li>Ferramentas e Infraestrutura: Git, Docker, Redes e Infraestrutura GPON</li>
          </ul>
        </div>

        {/* Habilidades Comportamentais */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Habilidades Comportamentais</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Comunicação assertiva</li>
            <li>Liderança e gestão de equipes</li>
            <li>Proatividade e iniciativa</li>
            <li>Facilidade de aprendizado</li>
            <li>Gestão de conflitos e negociação</li>
            <li>Adaptabilidade</li>
            <li>Conhecimento em Marketing Digital</li>
          </ul>
        </div>

        {/* Idiomas */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Idiomas</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Português: Nativo</li>
            <li>Inglês: Intermediário</li>
          </ul>
        </div>

        {/* Certificações e Cursos */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Certificações e Cursos</h3>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            <li>Treinamento BNG, PBR e ACL em Huawei – T11 Network Education (2022)</li>
            <li>Técnico em Informática – Grupo IETAAM (2023)</li>
            <li>Treinamento GPON – Intelbras (2022)</li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO: PROJETOS (COM CARROSSEL) */}
      <section 
        id="projetos" 
        className="container mx-auto px-4 py-8"
      >
        <h2 className="text-3xl font-bold mb-6">Projetos</h2>
        <ProjectsCarousel />
      </section>

      {/* SEÇÃO: CONTATO */}
      <section 
        id="contato" 
        className="container mx-auto px-4 py-8 bg-gray-100"
      >
        <h2 className="text-3xl font-bold mb-4">Contato</h2>
        <div className="space-y-2 text-lg">
          <p><strong>Telefone:</strong> (75) 99219-1260</p>
          <p><strong>E-mail:</strong> <a href="mailto:contatogustavoribeirohm@gmail.com" className="text-blue-500">contatogustavoribeirohm@gmail.com</a></p>
          <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/gustavo-ribeiro-48b18433b/" className="text-blue-500">linkedin.com/in/gustavo-ribeiro-48b18433b/</a></p>
          <p><strong>GitHub:</strong> <a href="https://github.com/Dev-GustavoRibeiro" className="text-blue-500">github.com/Dev-GustavoRibeiro</a></p>
        </div>
      </section>

      {/* Rodapé */}
      <Footer />
    </>
  )
}
