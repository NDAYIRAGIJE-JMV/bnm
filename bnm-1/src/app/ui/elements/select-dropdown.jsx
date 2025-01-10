// components/Dropdown.js
import { useState } from 'react';

const SelectDropdown = ({selectedOption, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState('séléctionner le dossier');

  const toggleDropdown = (item,id) => {
    setSelectedItem(item)
    if(id!==-1){selectedOption({id:id,item:item})}
    setIsOpen(prev => !prev);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <div className="flex items-center justify-start w-full">
      <div className="relative group w-full ">
        <button
          id="dropdown-button"
          onClick={() => toggleDropdown("séléctionner le dossier", -1)}
          className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full flex justify-between  p-0.3 md:p-0.5 "
        >
          <span className='text-full'>{selectedItem} </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpen && (
          <div
            id="dropdown-menu"
            className="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
          >
            <input
              id="search-input"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              type="text"
              placeholder="Search items"
              autoComplete="off"
            />
            {items
              .filter((item) =>
                item.numero.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <h1
                  key={index}
                  onClick={() => toggleDropdown(item.numero, item.id)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  {item.numero}
                </h1>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
