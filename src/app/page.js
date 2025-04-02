// app/page.js
import LayoutWrapper from "@/components/core/layout/LayoutWrapper";
import Section from "@/components/core/layout/Section";
import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Formation from "@/components/sections/formation/Formation";
import Experience from "@/components/sections/experience/Experience";
import Skills from "@/components/sections/sectionskills/Skills";
import Projects from "@/components/sections/projects/Carousel/ProjectsSection";
import Contact from "@/components/sections/contact/Contact";
import Feedbacks from "@/components/sections/contact/Feedbacks";

export default async function Home() {
  return (
    <LayoutWrapper>

        <Hero 
        id="hero"
        label="Apresentação" 
        full background="none"
        data-section="hero"
        />

        <About id="perfil"
        label="Quem Sou Eu"
        background="none"
        data-section="about"
        />

        <Formation
        id="formacao"
        label="Minha Formação"
        full background="none"
        showDivider={false}
        data-section="formation"
        />

        <Experience         
        id="experiencia"
        label="Minha Jornada Profissional"
        background="none"
        data-section="experience"
        />

        <Skills
        id="skills"
        label="O Que Eu Domino"
        background="none"
        data-section="skills"
        />

        <Projects        
        id="projects"
        label="Meus Trabalhos Incríveis"
        background="none"
        data-section="projects"
        />

        <Section>
        <Contact
        id="contact"
        label="Vamos Conversar?"
        background="blur"
        data-section="contact" 
        />
        </Section>

        <Feedbacks
        id="avaliable"
        label="Faça sua Avaliação"
        background="blur"
        data-section="avaliable"
          />

    </LayoutWrapper>
  );
}