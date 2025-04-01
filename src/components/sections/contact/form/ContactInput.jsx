"use client";

export default function ContactInput({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required 
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''} // Garante que não será undefined
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}