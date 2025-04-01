"use client";
import { FiUser, FiMessageSquare, FiMapPin } from "react-icons/fi";

export default function ContactTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "contact", icon: <FiUser size={12} />, label: "Contato" },
    { id: "form", icon: <FiMessageSquare size={12} />, label: "Mensagem" },
    { id: "location", icon: <FiMapPin size={16} />, label: "Localização" }
  ];

  return (
    <div className="flex mb-6 rounded-lg bg-white/10 p-1 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 min-w-[95px] py-2 px-1 rounded-md text-sm font-light flex items-center justify-center gap-1 whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}