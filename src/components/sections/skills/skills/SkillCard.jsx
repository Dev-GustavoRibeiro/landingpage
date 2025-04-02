export default function SkillCard({ title, skills }) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10 hover:shadow-indigo-500/20 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-bold text-indigo-300 mb-3 flex items-center">
        {title === "Habilidades Técnicas" ? (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        )}
        {title}
      </h3>
      <ul className="list-disc list-inside text-indigo-100/90 space-y-2 text-base">
        {skills.map((skill, index) => (
          <li key={index} className="hover:text-indigo-200 transition-colors duration-200">{skill}</li>
        ))}
      </ul>
    </div>
  )
}