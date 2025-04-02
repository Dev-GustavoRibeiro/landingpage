export default function LanguageCard({ languages }) {
  return (
    <div className="bg-white/10 p-4 rounded-2xl shadow-md backdrop-blur-md ring-1 ring-white/10 hover:shadow-indigo-500/20 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-bold text-indigo-300 mb-2 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.20l-.31 1.242c-.412 1.65-1.813 2.758-3.49 2.758H5v1a1 1 0 11-2 0v-1H2a1 1 0 110-2h1.5a1.5 1.5 0 001.493-1.342L5.2 6H3a1 1 0 110-2h2V3a1 1 0 011-1zm6 11a1 1 0 01-1 1H2a1 1 0 110-2h10a1 1 0 011 1z" clipRule="evenodd" />
        </svg>
        Idiomas
      </h3>
      <div className="flex flex-col space-y-2">
        {languages.map((lang, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-indigo-100/90 text-sm md:text-base">{lang.name}</span>
            <span className="bg-indigo-900/40 px-2 py-1 rounded-full text-indigo-200 text-xs">
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}