'use client'
import React, { useState, useEffect } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { apiLinks, routeLinks } from '@/app/_libs/links'
import Ecritures from './ecritures'

const ListeEcriture = () => {
    const {push} = useRouter()
    const searchParams = useSearchParams()
    const destinataire = searchParams.get('reference') || " "
    const pathname = usePathname()
    const [showEcritureSecretaire, setShowEcritureSecretaire] = useState(false);
    const [nom, setNom] = useState(destinataire&&destinataire)
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const handleshowEcritureSecretaire = () => {
        setShowEcritureSecretaire(true);
    }

    const handleSearch = (key, value)=>{
      const params = new URLSearchParams(searchParams)
      value&&params.set(key, value)
      push(`${pathname}?${params.toString()}`)
    }

    const closeModal = () => {
        setShowEcritureSecretaire(false);
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(apiLinks.ecrituresAssocie,
              {
              headers:{
                nom: destinataire,
              }
            }
          );
            const data = await res.json()
            if (data.message == 'Success') {
                setData(data.data);
            }
            else {
                setData([])
            }

        };

        fetchData();

    }, [searchParams,destinataire]);
    // Calculate starting and ending index for current page
    const startIndex = (currentPage) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);

    const paginatedData = data.slice(startIndex, endIndex);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
      <div className="relative w-[100%] h-full rounded-md">
        {showEcritureSecretaire ? (
          <div className="w-[100%] h-[100%]">
            <Ecritures closeModal={closeModal} />
          </div>
        ) : (
          ""
        )}
        <div className="w-[100%] h-[100%]">
          <div className="w-full">
            <div className="w-full flex flex-col space-y-1 mx-auto">
            <span className='text-md font-semibold underline flex justify-center mb-0 md:mb-3'>Liste des écritures</span>
              <div className="w-[98%] h-auto flex items-center justify-end mx-auto mt-2 mb-1">
              <div className="w-[95%]  h-auto flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between items-center  mx-auto mt-1 mb-1">
              <div className='w-full flex gap-4'>
                <div className="w-[100%] md:w-[30%]  h-[2rem] flex justify-between mt-2 md:mt-0">
                
                <input
                  type="search"
                  value={nom}
                  className="w-full border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
                  placeholder="Chercher ici..."
                  onChange={(e)=>setNom(e.target.value)}
                  required
                />
                <button
                  onClick={() => handleSearch("reference", nom)}
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
                <button onClick={()=>push(pathname)} className='bg-gray-500 hover:bg-gray-600 px-4 rounded'>Actualiser</button>
                </div>
              </div>
              <button onClick={handleshowEcritureSecretaire} className="">
                  <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
                </button>
              </div>
              <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
                <table id="example" className="table-auto w-full">
                  <thead className="relative">
                    <tr>
                    <th className="text-start py-2 bg-slate-100 px-2">
                        #
                      </th>
                      <th className="text-start border bg-slate-100 px-2">
                        Date
                      </th>
                      <th className="text-start py-2 bg-slate-100 px-2">
                        Numéro de référence
                      </th>
                      <th className="text-start border bg-slate-100 px-2">
                        Destinataire
                      </th>
                      <th className="text-start border bg-slate-100 px-2">
                        Objet
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                  {data.length > 0 ? (
                      paginatedData &&
                      paginatedData.map((item, index) => (
                        <tr>
                          <td className="border text-start py-2 px-2">
                            {(index + currentPage * 8) + 1}
                          </td>
                          <td className="border text-start py-2 px-2">
                            {new Date(item.create_at).toLocaleDateString()}
                          </td>
                          <td className="border text-start py-2 px-2">
                            {item.reference}
                          </td>
                          <td className="border text-start py-2 px-2">
                            {item.destinataire}
                          </td>
                          <td className="border text-start py-2 px-2">
                            {item.object}
                          </td>

                        </tr>
                      ))
                    ):
                  (
                    <tr><td>Pas d&apos;écriture</td></tr>
                  )}
                  </tbody>
                </table>
              </div>
              <div className="h-auto md:h-[2.5rem] pagination flex justify-between">
                <button
                  className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Précédent
                </button>
                <div>
                  {Array.from(
                    { length: Math.ceil(data.length / itemsPerPage) },
                    (_, i) => i
                  ).map((number) => (
                    <button
                      key={number}
                      className={`px-2 py-1 mx-1 rounded-md ${
                        number === currentPage
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => handlePageChange(number)}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>    
                <button
                  className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                  disabled={
                    currentPage === Math.ceil(data.length / itemsPerPage) - 1
                  }
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Suivant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ListeEcriture