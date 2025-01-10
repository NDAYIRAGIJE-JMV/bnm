'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { FaPlusCircle } from 'react-icons/fa'
import RetirerCaisse from '../modals/secretaire/retire-petite-caisse-form'
import { apiLinks } from '@/app/_libs/links'

const PetiteCaisse = () => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showRetirerCaisse, setShowRetirerCaisse] = useState(false);
  const [date, setDate] = useState('')
  const [data, setData] = useState([]);
  const [action, setAction] = useState(-1);
  const dateParams = searchParams.get('date') || " "


  const handleRetirerCaisse = () => {
    setShowRetirerCaisse(true);
  };

  const closeModal = ()=> {
    setShowRetirerCaisse(false)
  }

  const handleDate = (key, value)=>{
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    push(`${pathname}?${params.toString()}`)
  }

  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(apiLinks.petiteCaisse, {
        headers:{
          da: dateParams,
          action: action
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
  }, [dateParams,action]);

  // Calculate starting and ending index for current page
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-[100%] h-full rounded-md">
      {showRetirerCaisse && (
        <div className="w-[100%] h-[100%]">
          <RetirerCaisse closeModal={closeModal} />
        </div>
      )}
      <div className="w-[100%] h-[100%]">
        <div className="w-full">
          <div className="w-full flex flex-col space-y-1 mx-auto">
          <span className='text-md font-semibold underline flex justify-center mb-0 md:mb-3'>Petite caisse</span>
            <div className="w-[98%] h-auto flex items-center justify-end mx-auto mt-2 mb-1">
            <div className="w-[95%]  h-auto flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between items-center  mx-auto mt-1 mb-1">
                
                <div className='w-[100%] md:w-[60%] items-center flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between'>
                  
                  <div className='w-[70%] md:w-[40%] h-[2.2rem] border border-slate-800 rounded-md'>
                    <input type='date' 
                    value={date} 
                    onChange={(e) => {handleDate('date', e.target.value), setDate(e.target.value)}} className='w-full h-full p-2 rounded-md focus:outline-none cursor-pointer' />
                  </div>
                  <div className='w-[70%] md:w-[40%] h-[2.2rem] border border-slate-800 rounded-md'>
                    <select value={action} onChange={(e)=>setAction(e.target.value)} className='w-full h-full rounded-md focus:outline-none cursor-pointer'>
                      <option value={-1}>Tous</option>
                      <option value={0}>Entrée</option>
                      <option value={1}>Sortie</option>
                    </select>
                  </div>
                  <button onClick={()=>{setAction(-1),push(pathname)}} className='bg-gray-500 text-white hover:bg-gray-600 py-1 px-2 rounded'>Actualiser</button>
                </div>
              </div>
              <button onClick={handleRetirerCaisse} className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
              </button>
            </div>
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full z-10">
                <thead className="relative">
                  <tr>
                    <th className="text-start py-2 border bg-slate-100 px-2">
                      #
                    </th>
                    <th className="text-start py-2 bg-slate-100 px-2">Date</th>
                    <th className="text-start py-2 border bg-slate-100 px-2">
                      Entrée
                    </th>
                    <th className="text-start py-2 border bg-slate-100 px-2">
                     Sortie
                    </th>
                    <th className="text-start py-2 border bg-slate-100 px-2">
                      Caisse
                    </th>
                    <th className="py-2 text-start border bg-slate-100 px-2">
                      Motif
                    </th>
                  
                  </tr>
                </thead>
                <tbody>
                 { data.length > 0?
                 paginatedData &&
                    paginatedData.map((item, index) => (
                      <tr key={index} className={`${index%2===1&&"bg-blue-50"} hover:shadow`}>
                        <td className="border text-start py-2 px-2">
                         {(index + currentPage * 8) + 1}
                        </td><td className="border text-start py-2 px-2">
                         {new Date(item.create_at).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="border text-start py-2 px-2">
                          {item.decaisser === 0 ? item.solde : "---"}
                        </td>
                        <td className="border text-start py-2 px-2">
                        {item.decaisser === 1 ? item.solde : "---"}
                        </td>
                        <td className="border text-start py-2 px-2">
                         {item.caisse}
                        </td>
                        <td className="border text-start py-2 px-2">{item.Motif}</td>
                        
                      </tr>
                    )) :
                    (<tr><td>Pas d&apos;opération</td></tr>)
                    }
                      
                    
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
    </div>
  );
}

export default PetiteCaisse