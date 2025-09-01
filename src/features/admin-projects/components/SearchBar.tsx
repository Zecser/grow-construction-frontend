import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [localValue, setLocalValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localValue); // call parent search
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center mb-6 max-w-[400px]"
    >
      <svg
        className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 
        0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 
        3.09-.59 4.23-1.57l.27.28v.79l5 
        4.99L20.49 19l-4.99-5zm-6 
        0C7.01 14 5 11.99 5 9.5S7.01 
        5 9.5 5 14 7.01 14 9.5 
        11.99 14 9.5 14z"/>
      </svg>
      <input
        type="text"
        placeholder="Search projects..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="flex-1 pl-10 md:pr-24 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
      />
      <button
        type="submit"
        className="absolute right-0 px-4 py-1.5 bg-teal-700 text-white text-sm rounded-lg hover:bg-teal-800"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
