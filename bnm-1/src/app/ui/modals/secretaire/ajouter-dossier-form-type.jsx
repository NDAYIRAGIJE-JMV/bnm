'use client'
import { React, useEffect, useState } from 'react'
import CreerDossier from './ajouter-dossier-form'

function TypeDossier({ toggleModal, tribunals,item=null,dossierType }) {
  console.log('item:',item)
  const [partie,setPartie] = useState()
  const [type, setType] = useState()
  const [consort, setConsort] = useState("0")
  const [partieConsort, setPartieConsort] = useState("0")
  const [showPartieConsort, setShowPartieConsort] = useState(false)
  const [formData, setFormData] = useState([])
  const [showClientType, setShowClientType] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showTypeForm, setShowTypeForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { useRouter } = require('next/navigation')
  const router = useRouter()
  
  const handleNext= async()=>{
    // TODO:::la condition de selection
    const data=[
      type,
      partie,
      consort,
      partieConsort
    ];
    setFormData(data)
  if(type && partie){
    setShowCreate(true);
    setShowTypeForm(false)
    }
    else{
      setError("commplété tous les champs")
    }  
};
useEffect(() => {
  console.log("consort", consort)
  if (consort == '1')
    setShowPartieConsort(true)
  else
    setShowPartieConsort(false)
}, [consort])
  return (
    <>
    {showTypeForm && 
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-[98%] md:h-[90%] lg:h-[98%] overflow-y-scroll relative flex flex-col space-y-4 bg-white rounded-md rounded-tr-2xl">
        <button
          onClick={()=>toggleModal(0)}
          className="absolute w-6 h-6 hover:bg-red-600 right-3 mt-2"
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
        <span className="flex justify-center text-lg font-bold text-black">
          Creez un nouveau dossier
        </span>
        <div className="w-[90%] lg:w-[95%] flex flex-col space-y-4 xl:space-y-1  mx-auto">
        <span className="text-red-600"> {error ? error : " "} </span>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className=" text-md md:text-xl font-medium text-slate-700"
            >
            Selectionner la partie du client
            </label>
            <select
              value={partie}
              onChange={(e) => setPartie(e.target.value)}
              id="partie"
              className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
              
            >
              <option value='0'>
                -- Cliquez pour la partie --
              </option>
              <option value="1">
                Demandeur
              </option>
              <option value="2">
                Defendeur
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className=" text-md md:text-xl font-medium text-slate-700"
            >
            Selectionner le type du dossier
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="partie"
              className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
            >
              <option value='0'>
                -- Cliquez pour le type --
              </option>
             <option value="1">
                Dossier ordinaire
              </option>
              <option value="2">
                Dossier Pénal
              </option>
            </select>
          </div>
          <div className="w-full h-full flex flex-col space-y-2 md:flex-row justify-between">
            <div className="w-[100%] md:w-[45%]  xl:w-[60%] flex flex-col space-y-1">
              <div className="">
                <span className="text-xl font-medium text-slate-700">
                  Consort
                </span>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center w-[50%]">
                  <label className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="Oui">
                    <input
                      type="radio"
                      name="consorts"
                      id="oui" value="1" checked={consort === '1'}
                      onChange={(e) => setConsort(e.target.value)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-700 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    />
                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px text-xl font-medium text-slate-700 cursor-pointer select-none"
                    htmlFor="Oui"
                  >
                    Oui
                  </label>
                </div>
                <div className="flex items-center  w-[50%]">
                  <label
                    className="relative flex items-center p-3 rounded-full cursor-pointer"
                    htmlFor="Non"
                  >
                    <input
                      type="radio"
                      name="consort"
                      id="non" value="0" checked={consort === '0'}
                      onChange={(e) => setConsort(e.target.value)}
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-700 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    />
                    <span className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <circle
                          data-name="ellipse"
                          cx="8"
                          cy="8"
                          r="8"
                        ></circle>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px text-xl font-medium text-slate-700 cursor-pointer select-none"
                    htmlFor="Non"
                  >
                    Non
                  </label>
                </div>
              </div>
            </div>
          </div>
          { 
          showPartieConsort &&
          <div>
            <label
              htmlFor="first_name"
              className=" text-md md:text-xl font-medium text-slate-700"
            >
            Quelle partie du consort?
            </label>
            <select
              value={partieConsort}
              onChange={(e) => setPartieConsort(e.target.value)}
              id="partie"
              className="border border-slate-700 text-slate-700 text-lg rounded-lg block w-full  h-9 md:h-10 lg:h-12 xl:h-12  p-1.5 md:p-2.5 xl:p-3 dark:placeholder-slate-700 focus:outline-none placeholder:text-sm"
            >
              <option value='0'>
                -- Cliquez sur la partie du consort --
              </option>
             <option value="1">
                La partie client
              </option>
              <option value="2">
                La contre partie
              </option>
              <option value="3">
                Les deux parties
              </option>
            </select>
          </div>
        }  
        </div>  
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleNext} disabled={loading}
            className="w-[8rem] h-8 rounded-md bg-green-700 hover:bg-green-800 text-white font-bold mb-2"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  }
  <div className="w-[100%] h-[100%]">
    {showCreate && 
      <CreerDossier 
        tribunals={tribunals}
        toggleModal={toggleModal}
        formData={formData}
        dossierType={dossierType} />
    }
  </div>
  </>
  );
}

export default TypeDossier
