"use client";
import { React, useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import TousDossiers from "./tous-dossier";
import GenererRapport from "./generer-rapport";
import { apiLinks } from "@/app/_libs/links";
import TableClientsStructures from "./table-clients-structure";
import AjouterClient from "./AjouterClient";
import { FaPlusCircle } from 'react-icons/fa'
const ClientsStructures = () => {
  const {push} = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [nom, setNom] = useState('')
  const [data, setData] = useState([]);
  const [id,setId]= useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const [showTousDossiers, setShowTousDossiers] = useState(false);
  const [showGenererRapport, setShowGenererRapport] = useState(false);
  const [showAjouterClient, setShowAjouterClient] = useState(false);

  const detailsRef = useRef(null);

  const handleSearch = (key, value)=>{
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const fetchData = async () => {
       const client = searchParams.get('destinataire') || " "
      const res = await fetch(apiLinks.clientsStructures,
        {
          headers:{
            nom: client,
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
  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setDisplayMoDetail(false);
    }
  };
  useEffect(() => {
    if (displayMoDetail) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayMoDetail]);

// Calculate starting and ending index for current page
const startIndex = (currentPage) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, data.length);

const paginatedData = data.slice(startIndex, endIndex);
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  const handleToutLesDossiers= (id)=>{
    setId(id)
    setShowTousDossiers(true);
  }

  const handleGenereRapport = (id) => {
    setId(id)
    setShowGenererRapport(true);
  };

  const closeModalTousDossiers = ()=>{
    setShowTousDossiers(false);
  }

  const closeModalRapport = () => {
    setShowGenererRapport(false);
  };
const handleAjouterClient=()=>{
   setShowAjouterClient(true)
}

const closeModal= () => {
  setShowGenererRapport(false);
  setShowAjouterClient(false)
  setShowTousDossiers(false);
};
  return (
    <div className="relative w-[100%] h-full rounded-md">
      <div className="w-[100%] h-[100%]">
        {showTousDossiers && (
          <TousDossiers
            closeModalTousDossiers={closeModal}
            id={id}
          />
        )}
      </div>
      <div className="w-[100%] h-[100%]">
        {showGenererRapport && (
          <GenererRapport closeModalRapport={closeModal}  id={id} />
        )}

      </div>
      <div className="w-[100%] h-[100%]">
        {showAjouterClient && (
          <AjouterClient closeModal={closeModal} />
        )}

      </div>        
      <div className="w-[100%] h-[100%]">
        <div className="w-full">
          <div className="container flex flex-col space-y-1 mx-auto">
          <div className="w-[98%] h-auto flex items-center justify-end mx-auto mt-2 mb-1">
          <div className="w-[95%]  h-auto flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between items-center  mx-auto mt-1 mb-1">
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
              </div>
              <button  className="" onClick={handleAjouterClient}>
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
              </button>
            </div>
            <div className="h-[27rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 bg-slate-100">#</th>
                    <th className="text-start py-2 bg-slate-100 p-2">No</th>
                    <th className="py-2 text-start border bg-slate-100 p-2">Nom</th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Mail
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Téléphone
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Nombre de dossiers
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Montant mensuel
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Date de création
                    </th>
                  </tr>
                </thead>
                <tbody>
                {paginatedData &&
                    paginatedData.map((item, index) => (
                      <tr key={index}>
                        <TableClientsStructures
                          id={item.id}
                          handleToutLesDossiers={() =>
                            handleToutLesDossiers(item.id)
                          }
                          handleGenereRapport={() =>
                            handleGenereRapport(item.id)
                          }
                          
                          name={item.name}
                          email={item.email}
                          phone={item.phone}
                          nombre_dossiers={item.nombre_dossiers}
                          montant={item.montant}
                          index={index + currentPage * 8}
                          create_at={new Date(
                            item.create_at
                          ).toLocaleDateString()}

                          //handleEditClick={() => handleEditClick(item)}
                        />
                      </tr>
                    ))}
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
                disabled={currentPage === Math.ceil(data.length / itemsPerPage)-1}
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
};

export default ClientsStructures;
