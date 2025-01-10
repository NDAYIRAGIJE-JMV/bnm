'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import AjouterCongeAssocies from '../AjouterCongeAssocie/AjouterCongeAssocies'

const CongeUtilisateurAssocies = ({closeModal, data, userId,name,lastname}) => {
    // const [user,setUser]=useState([])
  const [showAjouterCongeAssocies,setShowAjouterCongeAssocies]= useState(false)

  const afficherAjouterCongeAssocies = ()=>{
     setShowAjouterCongeAssocies(true)
  }

  const closeModalAjouterCongeAssocie = ()=> {
    setUser("")
   setShowAjouterCongeAssocies(false)
  }
  const [jourrestant, setJour]=useState([])
  useEffect(() => {
    if (data) {
        const currentDate = new Date();
       // setUser(data[0])
        // Calculer les jours restants pour chaque date
        const joursCalculés = data.map((datas) => {
            const retour = new Date(datas.retour);
            const differenceInTime = retour - currentDate;
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
            return differenceInDays; // Retourne le nombre de jours restants
        });

        setJour(joursCalculés); // Met à jour l'état avec le tableau de jours
    }
}, [data]); // Dépend uniquement de 'data'
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      {showAjouterCongeAssocies ? (
        <div className="absolute w-[100%] h-[100%] z-10">
          <AjouterCongeAssocies
            closeModalAjouterCongeAssocie={closeModalAjouterCongeAssocie}
            userId={userId}
          />
        </div>
      ) : (
        ""
      )}
      <div className="w-[98%] md:w-[90%] lg:w-[85%] xl:w-[60%] h-auto relative flex flex-col space-y-2 bg-white rounded-md">
        <div className="w-[98%] flex justify-end items-center mx-auto">
          <button
            onClick={closeModal}
            className=" w-6 h-6 hover:bg-red-600 mt-1"
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
        <div className="flex justify-between w-[90%] mx-auto mb-2">
          <span className="text-lg font-bold text-slate-800">
             {name} {lastname}
          </span>
          <button onClick={afficherAjouterCongeAssocies} className="">
            <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
          </button>
        </div>
        <div className="container h-full overflow-scroll md:overflow-hidden mx-auto py-2">
          <table id="example" className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  utilisateur
                </th>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Date Sortie
                </th>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Date Retour
                </th>
                <th className="text-start py-2 border bg-slate-100 px-2">
                  Jours restants
                </th>
              </tr>
            </thead>
            <tbody>
            {data &&
                data.map((conge, index) => (
                  <>
                    <tr key={index}>
                      <td className="border text-start py-2 px-2">
                        {conge.name} {conge.lastname}{" "}
                      </td>
                      <td className="border text-start py-2 px-2">
                        {new Date(conge.sortie).toLocaleDateString()}
                      </td>
                      <td className="border text-start py-2 px-2">
                        {new Date(conge.retour).toLocaleDateString()}
                      </td>
                      <td className="border text-start py-2 px-2">
                        {jourrestant[index] >= 0 ? (<span>{jourrestant[index]}</span>):(<span>terminé</span>)}
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CongeUtilisateurAssocies
