// app/page.js

import LayoutWrapper from "../components/LayoutWrapper"
import Section from "../components/Section"

import Hero from "../components/Hero"
import About from "../components/About"
import Formation from "../components/Formation"
import Experience from "../components/Experience"
import Skills from "../components/Skills"
import Projects from "../components/Carousel/ProjectsSection"
import Contact from "../components/Contact"

export default async function Home() {
  return (
    <LayoutWrapper>
      <Section id="hero" label="Apresentação" full background="none" data-section="hero">
        <Hero />
      </Section>

      <Section id="perfil" label="Sobre mim" background="glass" highlight data-section="about">
        <About />
      </Section>

      <Section
        id="formacao"
        label="Formação acadêmica"
        background="gradient"
        highlight
        showDivider={false}
        data-section="formation"
      >
        <Formation />
      </Section>

      <Section
        id="experiencia"
        label="Experiência profissional"
        background="blur"
        highlight
        data-section="experience"
      >
        <Experience />
      </Section>

      <Section
        id="skills"
        label="Habilidades técnicas"
        background="gradient"
        highlight
        data-section="skills"
      >
        <Skills />
      </Section>

      <Section
        id="projects"
        label="Projetos desenvolvidos"
        background="glass"
        highlight
        data-section="projects"
      >
        <Projects />
      </Section>

      <Section
        id="contact"
        label="Contato e redes sociais"
        background="blur"
        highlight
        data-section="contact"
      >
        <Contact />
      </Section>
    </LayoutWrapper>
  )
}