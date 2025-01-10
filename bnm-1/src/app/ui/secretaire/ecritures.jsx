'use client'
import React from 'react'
import { useState,useEffect} from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { FaPlusCircle } from 'react-icons/fa';
import { apiLinks, routeLinks } from '@/app/_libs/links'
import AjouterEcriture from './ajouter-ecriture';

const Ecritures = () => {
const {push} = useRouter()
const searchParams = useSearchParams()
const pathname = usePathname()
const [nom, setNom] = useState("")
const [showAjouterEcriture,setShowAjouterEcriture] = useState(false)
const [currentPage, setCurrentPage] = useState(0);
const [itemsPerPage, setItemsPerPage] = useState(8);
const [data, setData] = useState([])

const ViewAjouterEcriture = ()=>{
  setShowAjouterEcriture(true)
}

const handleSearch = (key, value)=>{
  const params = new URLSearchParams(searchParams)
  params.set(key, value)
  push(`${pathname}?${params.toString()}`)
}

const closeModal = ()=>{
  setShowAjouterEcriture(false)
}
useEffect(() => {
  const fetchData = async () => {
    const destinataire = searchParams.get('destinataire') || " "
    const res = await fetch(apiLinks.ecrituresAssocie,
      {
      headers:{
        nom: destinataire,
      }
    }
    );
    const data = await res.json();
    if (data.message == "Success") {
      setData(data.data);
    } else {
      setData([]);
    }
  };

  fetchData();
}, [searchParams]);

const startIndex = (currentPage) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    return (
    <div className="relative w-[100%] h-full rounded-md">
      {showAjouterEcriture && (
        <div className="w-[100%] h-[100%]">
          <AjouterEcriture closeModal={closeModal}/>
        </div>
      )}
      <div className="w-[100%] h-[100%]">
        <div className="w-full h-full">
          <div className='w-[98%] flex justify-between items-center mb-2 mx-auto'>
            <div className="w-[10rem] md:w-[14rem] lg:w-[17rem] h-[2rem] flex justify-between mt-2">
              <input
                type="search"
                value={nom}
                className="w-full border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
                placeholder="Chercher ici..."
                onChange={(e)=>setNom(e.target.value)}
                required
              />
              <button
                onClick={() => handleSearch("destinataire", nom)}
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
            <div className=''>
            <span className='text-md font-bold underline'>les ecritures</span>
            </div>
            <button onClick={ViewAjouterEcriture} className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
            </button>
          </div>
          <div className="container flex flex-col space-y-1 mx-auto">
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
            <table id="example" className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        #
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Numero de reference
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Destinataire
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Objet
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                      data.length > 0 ? (
                      paginatedData && paginatedData.map((ecriture, index)=>(
                        <tr key={index}>
                            <td className="border text-start py-2 p-2">{(index + currentPage * 8) + 1} </td>
                            <td className="border text-start py-2 p-2">{ecriture.reference} </td>
                            <td className="border text-start py-2 p-2">{ecriture.destinataire} </td>
                            <td className="border text-start py-2 p-2">{ecriture.object} </td>
                            <td className="border text-start py-2 p-2">{new Date(ecriture.create_at).toLocaleDateString()} </td>
                        </tr>
                        ))
                        ):(
                          <tr><td>Pas d&apos;écriture</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="h-auto md:h-[2.5rem] pagination flex justify-between">
              {/* Button for previous page (disabled on first page) */}
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
                disabled={currentPage === Math.ceil(data.length / itemsPerPage) - 1}
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

export default Ecritures
