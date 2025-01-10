'use client'
import React from 'react'
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CreerDossier from '../modals/secretaire/ajouter-dossier-form';
import { SessionContext } from '../context/auth';
import { Tooltip } from '@nextui-org/react';
import { FaFolderPlus } from 'react-icons/fa';

const FiltreDossier = ({ tribunals }) => {
  const user = useContext(SessionContext)
  const searchParams = useSearchParams()
  const { push } = useRouter()
  const pathname = usePathname()
  const [searchValue, setSearchValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showFilter, setShowFilter] = useState(false);
  const [dossierType, setDossierType] = useState('') 
  const [showSelect, setShowSelect] = useState(false) 
  const [standard, setStandard] = useState(0)

  const filterRef = useRef(null);
  const typeDossierRef = useRef(null);
  const afficherElementsFiltre = () => {
    setShowFilter(true)
  }
  const closeModal = () => {
    setShowModal(false);
    setShowSelect(false); 
  }
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };

const handleClickOutsideTypeDossier = (event) => {
  if (typeDossierRef.current && !typeDossierRef.current.contains(event.target)) {
    setShowSelect(false);
  }
};

  const handleSearch = async (key, value) => {
    if (value == "") {
      push(pathname)
    } else {
      const params = new URLSearchParams(searchParams)
      params.set(key, value)
      push(`${pathname}?${params.toString()}`)
    }
  };
  const handleSearchTribunal = async (key, value) => {
    if (value == 0) {
      push(pathname)
    } else {
      const params = new URLSearchParams(searchParams)
      params.set(key, value)
      push(`${pathname}?${params.toString()}`)
    }
  };
  const handleSearchType = async (key, value) => {
    if (value == 0) {
      push(pathname)
    } else {
      const params = new URLSearchParams(searchParams)
      params.set(key, value)
      push(`${pathname}?${params.toString()}`)
    }
  };

  useEffect(() => {
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else if (showSelect) {
      document.addEventListener("mousedown", handleClickOutsideTypeDossier);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideTypeDossier);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideTypeDossier);
    };
  }, [showFilter, showSelect]);

  const handleNewDossierClick = () => {
    setShowSelect(!showSelect); 
  }

  const handleSelectChange = (e) => {
    setDossierType(e.target.value);
    setShowSelect(false);
    setShowModal(true); 
  }

  return (
    <div className="w-[100%] h-auto flex flex-col md:flex-row justify-between mx-auto space-y-1">
      {showModal ? (
        <div className="absolute w-[100%] h-[100%]">
          <CreerDossier
            closeModal={closeModal}
            tribunals={tribunals}
            dossierType={dossierType}
          />
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-[2rem] w-[76.5%] md:w-[45%] lg:w-[60%] ml-1">
        <div className="w-[16rem] md:w-[14rem] lg:w-[17rem] h-[2rem] flex justify-between mt-2">
          <input
            type="search"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="w-full border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
            placeholder="Chercher ici..."
            required
          />
          <button
            onClick={() => handleSearch("numero", searchValue)}
            className="bg-slate-600 hover:bg-slate-800 rounded-r-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <form className="w-[10rem] md:w-[12rem] lg:w-[7.5rem] h-[1.5rem] md:h-[2rem] border border-slate-800 rounded-md">
          <select className="rounded-md flex items-center  w-full h-full  bg-white text-slate-800">
            <option>Cliquer pour le tribunal</option>
            <option>
              Tous Dossiers
            </option>
            {tribunals.map((tribunal) => (
              <option
                key={tribunal.id}
                onClick={() => handleSearchTribunal("tribunal", tribunal.id)}
                value={tribunal.id}
              >
                {tribunal.nom}
              </option>
            ))}
          </select>
        </form>
        <form className="w-[8rem] md:w-[10rem] lg:w-[7.5rem] h-[1.5rem] md:h-[2rem] border border-slate-800 rounded-md">
          <select className="rounded-md flex items-center w-full h-full  bg-white text-slate-800">
            <option>type dossier</option>
            <option onClick={() => handleSearchType("type", 1)} value={1}>
              {" "}
              Standard
            </option>
            <option onClick={() => handleSearchType("type", 2)} value={2}>
              {" "}
              Structurés
            </option>
          </select>
        </form>
      </div>
      <div className="flex justify-between  w-[100%] h-[2.5rem] md:h-auto md:w-[45%] lg:w-[35%]">
        <div>
          <div className="flex items-center justify-center p-1 md:p-2">
            <button
              onClick={afficherElementsFiltre}
              className="flex text-slate-800 rounded-lg text-sm max-w p-1  border border-slate-800 items-center justify-content-between"
            >
              Filtre par catégorie
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </button>
          </div>
          {showFilter && (
            <div
              ref={filterRef}
              className="w-[10rem] h-auto border border-slate-800 absolute bg-white ml-1 md:ml-5 rounded-md z-30"
            >
              <ul className="space-y-2 text-sm mx-2 mb-2 mt-1">
                <li className="flex items-center">
                  <input
                    id="sony"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600   dark:ring-offset-gray-700 dark:bg-gray-600"
                  />

                  <label
                    for="sony"
                    className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                  >
                    Console
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="sony"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600   dark:ring-offset-gray-700 dark:bg-gray-600"
                  />

                  <label
                    for="sony"
                    className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                  >
                    Pénalite
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="sony"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600   dark:ring-offset-gray-700 dark:bg-gray-600"
                  />

                  <label
                    for="sony"
                    className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                  >
                    Urgence
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="sony"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600   dark:ring-offset-gray-700 dark:bg-gray-600"
                  />

                  <label
                    for="sony"
                    className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                  >
                    Structuré
                  </label>
                </li>
                <li className="flex items-center">
                  <input
                    id="sony"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600   dark:ring-offset-gray-700 dark:bg-gray-600"
                  />

                  <label
                    for="sony"
                    className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                  >
                    Standard
                  </label>
                </li>
              </ul>
              <div className="w-[95%] flex justify-between mx-auto mb-2">
                <buton
                  role="button"
                  className="bg-green-700 hover:bg-green-800 h-6 rounded-md"
                >
                  <span className="text-white mx-2"> oui</span>
                </buton>
                <buton
                  role="button"
                  className="bg-red-700 hover:bg-red-800 h-6 rounded-md"
                >
                  <span className="text-white mx-2">annuler</span>
                </buton>
              </div>
            </div>
          )}
        </div>
        <div className="p-1 relative md:p-2 z-10">
          {user?.session?.role != 2 && (
            <Tooltip
              showArrow={true}
              content="nouveau dossier"
              className="bg-slate-800 text-white text-sm h-6 md:h-7 rounded-md max-w mx-1"
            >
              <button
                onClick={handleNewDossierClick}
                className="max-w bg-white h-[1.5rem] md:h-[2rem] hover:bg-slate-200 rounded-md"
              >
                <span className="flex  items-center mx-3 md:mx-3 text-md md:text-xl">
                  <FaFolderPlus className="text-slate-800 h-6" />
                </span>
              </button>
            </Tooltip>
          )}
          {showSelect && (
            <div
              ref={typeDossierRef}
              className="w-[11rem] absolute z-20 right-2"
            >
              <select
                className="w-full p-2.5  bg-white text-slate-800 rounded-md"
                onChange={handleSelectChange}
              >
                <option value="">Type de dossier</option>
                <option value="Standard">Standard</option>
                <option value="Associé">Structuré</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FiltreDossier
