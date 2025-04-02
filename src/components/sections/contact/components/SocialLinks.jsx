"use client";
import ContactInfoItem from "./ContactInfoItem";
import { FiLinkedin, FiGithub } from "react-icons/fi";

const links = [
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/gustavo-ribeiro-48b18433b/",
    copyValue: "linkedin.com/in/GustavoRibeiro",
    isLink: true
  },
  {
    icon: <FiGithub size={20} />,
    label: "GitHub",
    value: "https://github.com/Dev-GustavoRibeiro",
    isLink: true
  }
];

export default function SocialLinks() {
  return (
    <>
      {links.map((link, i) => (
        <ContactInfoItem key={`social-${i}`} {...link} />
      ))}
    </>
  );
}