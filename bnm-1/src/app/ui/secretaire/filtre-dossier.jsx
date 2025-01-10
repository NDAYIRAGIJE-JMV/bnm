'use client'
import React from 'react'
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import TypeDossier from '../modals/secretaire/ajouter-dossier-form-type';
import { Tooltip } from '@nextui-org/react';
import { FaFolderPlus } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

export default  function FiltreDossier({ tribunals }) {
    const {data:user} = useSession();
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const pathname = usePathname()
    const [searchValue, setSearchValue] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showFilter, setShowFilter] = useState(false);
    const [dossierType, setDossierType] = useState(1)
    const [showSelect, setShowSelect] = useState(false)
    

    const filterRef = useRef(null);
    const typeDossierRef = useRef(null);
    const afficherElementsFiltre = () => {
        setShowFilter(true)
    }

    const toggleModal = ()=>{
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
    

    const handleFiltrate = (key, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)
        push(`${pathname}?${params.toString()}`)
    }

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

    const handleSelectChange = (value) => {
        setDossierType(value);
        setShowSelect(false);
        setShowModal(1);
    }

    return (
      <div className="w-[100%] h-auto flex flex-col md:flex-row justify-between mx-auto space-y-1">
        {showModal ? (
          <div className="absolute w-[100%] h-[100%]">
            <TypeDossier
              toggleModal={toggleModal}
              tribunals={tribunals}
              dossierType={dossierType}
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-[2rem] w-[76.5%] md:w-[45%] lg:w-[65%] ml-1">
          <div className="w-[16rem] md:w-[14rem] lg:w-[15rem] h-[2rem] flex justify-between mt-2">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="w-[85%] lg:w-[80%] xl:w-[85%] border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
              placeholder="Chercher ici..."
              required
            />
            <button
              onClick={() => handleFiltrate("numero", searchValue)}
              className="w-[15%] lg:w-[20%] xl:w-[15%] flex items-center justify-center bg-slate-600 hover:bg-slate-800 rounded-r-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="text-white size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <form className="w-[10rem] md:w-[12.5rem] lg:w-[11rem] h-[1.5rem] md:h-[2rem] border border-slate-800 rounded-md">
            <select
              onChange={(e) => handleFiltrate("tribunal", e.target.value)}
              defaultValue={
                searchParams.get("tribunal")
                  ? parseInt(searchParams.get("tribunal"))
                  : 0
              }
              className="flex items-center w-full h-full bg-white rounded-md cursor-pointer md:p-1 text-slate-800"
            >
              <option value={0}>Juridictions</option>
              {tribunals?.map((tribunal) => (
                <option key={tribunal.id} value={tribunal.id}>
                  {tribunal.nom}
                </option>
              ))}
            </select>
          </form>
          <form className="w-[8rem] outline-none md:w-[10rem] lg:w-[8.5rem] h-[1.5rem] md:h-[2rem] border border-slate-800 rounded-md">
            <select
              onChange={(e) => handleFiltrate("type", e.target.value)}
              defaultValue={
                searchParams.get("type")
                  ? parseInt(searchParams.get("type"))
                  : 0
              }
              className="flex items-center w-full h-full bg-white rounded-md cursor-pointer md:p-1 text-slate-800"
            >
              <option value={0}> --Type dossiers-- </option>
              <option value={1}> Standards </option>
              <option value={2}> Structurés </option>
            </select>
          </form>
        </div>
        <div className="flex justify-between  w-[100%] h-[2.5rem] md:h-auto md:w-[45%] lg:w-[30%] xl:w-[35%]">
          <div className='w-full'>
            <div className="flex items-center w-full p-1 md:justify-center md:p-2">
              <button
                onClick={afficherElementsFiltre}
                className="bg-white w-[11rem] md:w-[13rem] h-[1.5rem] md:h-[2rem] p-1 flex text-slate-800 rounded-md max-w  border border-slate-800 items-center justify-between"
              >
                <span className='p-1'>Filtre par catégorie</span>
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
                className="w-[12rem] h-auto border border-slate-800 absolute bg-white ml-1 md:ml-[4rem] lg:md:ml-[2rem] xl:md:ml-[4rem] rounded-md z-30"
              >
                <ul className="mx-2 mt-1 mb-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <input
                      id="sony"
                      type="checkbox"
                      checked={searchParams.get("console") == 2}
                      onChange={() =>
                        handleFiltrate(
                          "console",
                          searchParams.get("console") == 2 ? 0 : 2
                        )
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 dark:ring-offset-gray-700 dark:bg-gray-600"
                    />

                    <label
                      for="sony"
                      className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                    >
                      Consorts
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="sony"
                      type="checkbox"
                      checked={searchParams.get("penalite") == 1}
                      onChange={() =>
                        handleFiltrate(
                          "penalite",
                          searchParams.get("penalite") == 1 ? 0 : 1
                        )
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 dark:ring-offset-gray-700 dark:bg-gray-600"
                    />

                    <label
                      for="sony"
                      className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                    >
                      Dossiers Pénaux
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="sony"
                      type="checkbox"
                      checked={searchParams.get("urgence") == 1}
                      onChange={() =>
                        handleFiltrate(
                          "urgence",
                          searchParams.get("urgence") == 1 ? 0 : 1
                        )
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 dark:ring-offset-gray-700 dark:bg-gray-600"
                    />

                    <label
                      for="sony"
                      className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                    >
                      Cas urgent
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      id="sony"
                      type="checkbox"
                      checked={searchParams.get("prononce") == 1}
                      onChange={() =>
                        handleFiltrate(
                          "prononce",
                          searchParams.get("prononce") == 1 ? 0 : 1
                        )
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 dark:ring-offset-gray-700 dark:bg-gray-600"
                    />

                    <label
                      for="sony"
                      className="ml-2 text-sm font-medium text-slate-800 dark:text-gray-100"
                    >
                      Prononce
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative z-10 p-1 md:p-2">
            {user?.session?.role != 2 && (
              <Tooltip
                showArrow={true}
                content="nouveau dossier"
                className="h-6 mx-1 text-sm text-white rounded-md bg-slate-800 md:h-7 max-w"
              >
                <button
                  onClick={handleNewDossierClick}
                  className="max-w bg-white h-[1.5rem] md:h-[2rem] hover:bg-slate-200 rounded-md"
                >
                  <span className="flex items-center mx-3 md:mx-3 text-md md:text-xl">
                    <FaFolderPlus className="h-6 text-slate-800" />
                  </span>
                </button>
              </Tooltip>
             )}
            {showSelect && (
              <div
                ref={typeDossierRef}
                className="w-[11rem] absolute z-20 right-2"
              >
                <div className="w-full  p-2.5  bg-white text-slate-800 rounded-md">
                  <div
                    onClick={() => handleSelectChange(1)}
                    className="p-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                  >
                    Dossier standard
                  </div>
                  <div
                    onClick={() => handleSelectChange(2)}
                    className="p-1 mt-1 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                  >
                    Dossier structuré
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}


