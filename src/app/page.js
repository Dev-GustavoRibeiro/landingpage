// app/page.js
import LayoutWrapper from "../components/LayoutWrapper";
import Section from "../components/Section";
import Hero from "../components/Hero";
import About from "../components/About";
import Formation from "../components/Formation";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Carousel/ProjectsSection";
import Contact from "../components/Contacts/Contact";
import Avaliable from "../components/Contacts/Avalible";

export default async function Home() {
  return (
    <LayoutWrapper>
      <Section id="hero" label="Apresentação" full background="none" data-section="hero">
        <Hero />
      </Section>

      <Section id="perfil" label="Quem Sou Eu" background="none" data-section="about">
        <About />
      </Section>

      <Section
        id="formacao"
        label="Minha Formação"
        full background="none"
        showDivider={false}
        data-section="formation"
      >
        <Formation />
      </Section>

      <Section
        id="experiencia"
        label="Minha Jornada Profissional"
        background="none"
        data-section="experience"
      >
        <Experience />
      </Section>

      <Section
        id="skills"
        label="O Que Eu Domino"
        background="none"
        data-section="skills"
      >
        <Skills />
      </Section>

      <Section
        id="projects"
        label="Meus Trabalhos Incríveis"
        background="none"
        data-section="projects"
      >
        <Projects />
      </Section>

      <Section
        id="contact"
        label="Vamos Conversar?"
        background="blur"
        data-section="contact"
      >
        <Contact />
      </Section>

      <Section
        id="avaliable"
        label="Faça sua Avaliação"
        background="blur"
        data-section="avaliable"
      >
        <Avaliable />
      </Section>
    </LayoutWrapper>
  );
}