'use client'
import React, { useState,useEffect } from 'react'
import DemandeConge from './demande-conge';
import { FaPlusCircle } from 'react-icons/fa';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import TabledDemandeConge from './table-demande-conge';
import AjouterCongeAssocies from '../associe/personnel/AjouterCongeAssocie/AjouterCongeAssocies';

const ListCongeAssocie = () => {
  const {push} = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [nom, setNom] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showDemandeConge,setShowDemandeConge] = useState(false)
  const [data, setData] = useState([])
  const [showajouteconge, setShowAjouteconge] = useState(false);
  const [id,setId]=useState('')
  const [user_id,setUser_Id]=useState('')
 

  const handleSearch = (key, value)=>{
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    push(`${pathname}?${params.toString()}`)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const afficherModalDemandeConge = ()=>{
   setShowDemandeConge(true)
  }

  const closeModal = ()=>{
    setShowDemandeConge(false)
    setShowAjouteconge(false)
  }
  const handleAjouteConge=(id,user_id)=>{
     setId(id)
     setUser_Id(user_id)
    setShowAjouteconge(true)

  }

  const FetchData = async () => {
        try {
            const user = searchParams.get('nom') || " "
            const res = await fetch('/associe/api/conges',{
              headers:{
                nom: user,
              }
            });
         
            const datas = await res.json()
            if (datas.message=="success") {
                setData(datas.result)
               console.log('Conge',datas.result)
            }
  
        }
        catch (error) {
            console.log('error');
        }
  
    
  }
  useEffect(()=>{
    FetchData()
  },[searchParams])

  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="relative w-[100%] h-full rounded-md">
      {showDemandeConge && (
        <div className="w-[100%] h-[100%]">
          <DemandeConge closeModal={closeModal} />
        </div>
         
      )}
            
      {showajouteconge && 
         <div className="w-[100%] h-[100%]">  
      <AjouterCongeAssocies closeModalAjouterCongeAssocie={closeModal} userId={user_id} id={id}/>
      </div> 
      }
      <div className="w-[100%] h-[100%]">
        <div className="w-full h-full">
          <div className="h-auto w-[98%] flex items-center justify-between mb-2 mx-auto border">
              <div className="w-[16rem] md:w-[14rem] lg:w-[17rem] h-[2rem] flex justify-between mt-2">
                <input
                  type="search"
                  value={nom}
                  className="w-full border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
                  placeholder="Chercher ici..."
                  onChange={(e)=>setNom(e.target.value)}
                  required
                />
                <button
                  onClick={() => handleSearch("nom", nom)}
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
          
              <button onClick={afficherModalDemandeConge}  className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
              </button>
          </div>        
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">

              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 border bg-slate-100">
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Nom
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Date de sortie
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Date de retour
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Jours 
                    </th>
                    <th className="text-start py-2 border bg-slate-100">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
              
                {data &&
                    paginatedData.map((item, index) => (
                      <tr key={index}>
                    <TabledDemandeConge 
                     name={item.name}
                     lastname={item.lastname}
                     sortie={item.sortie}
                     retour={item.retour}
                     jours={item.jours}
                     status={item.status}
                     id={item.id}
                     user_id={item.user_id}
                     handleAjouteConge={()=>handleAjouteConge(item.id,item.user_id)}
                     

                    />
                    </tr>
                ))}
              
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
                    {number+1}
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

  );
}

export default ListCongeAssocie
