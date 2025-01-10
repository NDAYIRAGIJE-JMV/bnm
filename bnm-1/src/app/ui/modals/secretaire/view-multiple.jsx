import React from 'react'
import { useState,useEffect } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'

export default function ViewMultiple({toggleModal, item}){
const [multples,setMultples] = useState([]);

useEffect(() => {
    const fetchConsole = async () => {
        await axios.get(`/secretaire/api/dossiers/multiple`,{
            headers:{
                dossier: item.id
            }
        })
        .then(results=>setMultples(results.data))
        .catch(error=>console.error(error))
    };
    fetchConsole();
    }, [item]);
  return (
        <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
        <div className="w-[98%] h-[80%] md:w-[90%] lg:w-[85%]   mt-2 md:mt-0 mb-2 md:mb-0 relative flex flex-col space-y-4 bg-white rounded-md mx-auto">
          <div className='flex justify-between w-[95%] h-[5%] mx-auto mt-2'>           
            <button onClick={()=>toggleModal(2,item)} className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
            </button>
            <div>
               <span className='text-md font-bold underline'>voir console</span>
            </div>
             <button
            onClick={toggleModal}
            className="w-6 h-6 hover:bg-red-600 right-3"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-lg text-black hover:text-white"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
                />
            </svg>
            </button>
          </div>
            <div className="w-[100%] h-[95%] overflow-scroll md:overflow-x-hidden">
            <div className="w-full">
                <div className="container mx-auto py-2">
                <table id="example" className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="py-2 text-start border bg-slate-100"></th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        No
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Demandeur
                        </th>
                        <th className="text-start py-2 border bg-slate-100 p-2">
                        Commentaire
                        </th>
                    </tr>
                    </thead>
                    {multples&&(
                        <tbody>
                        {multples.length>0 && multples?.map((value,index)=>{
                            return (
                                <tr  key={index}>
                                    <td className="border text-start py-2 p-2">{value.id}</td>
                                    <td className="border text-start py-2 p-2">{value.numero}</td>
                                    <td className="border text-start py-2 p-2">{value.demandeur}</td>
                                    <td className="border text-start py-2 p-2">{value.comment}</td>
                                </tr>
                            ) 
                        })}
                        </tbody>
                    )}
                </table>
                </div>
            </div>
            </div>
        </div>
        </div>
  )
}
