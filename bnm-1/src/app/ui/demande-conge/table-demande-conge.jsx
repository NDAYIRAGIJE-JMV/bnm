import React, { useEffect, useRef, useState } from 'react'
import PopUpConge from './pop-up-conge'

const TabledDemandeConge = ({
  name,lastname,sortie,retour,
  status,jours,handleAjouteConge,
  id,user_id}) => {
 
    const [displayPopUpConge, setDisplayPopUpConge] = useState(false);
  const popUpCongeRef = useRef(null);


  const AfficherPopUpConge = (action) => {
    setDisplayPopUpConge(true);
  };

  const handleClickOutside = (event) => {
    if (popUpCongeRef.current && !popUpCongeRef.current.contains(event.target)) {
      setDisplayPopUpConge(false);
    }
  };

  useEffect(() => {
    if (displayPopUpConge) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayPopUpConge]);
 

  return (

        <>
       <td className="px-4 py-2 text-sm font-medium relative">
        {displayPopUpConge ? (
          <div ref={popUpCongeRef} className="ml-8 absolute">
            <PopUpConge 
              id={id}
              user_id={user_id}
              handleAjouteConge={handleAjouteConge}
              status={status}
            />
          </div>
        ) : (
          ""
        )}
        <button
          onClick={AfficherPopUpConge}
          type="button"
          className="inline-flex items-center text-slate-700 bg-slate-200 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
      </td>
      <td className="border text-start py-2 px-2">{name} {lastname} </td>
      <td className="border text-start py-2 px-2">{new Date(sortie).toLocaleDateString()}</td>
      <td className="border text-start py-2 px-2">{new Date(retour).toLocaleDateString()}</td>
      <td className="border text-start py-2 px-2">{jours}</td>

      <td className="border text-start py-2 px-2">
  {status === 0 ? 'En Attente' : status === 1 ? 'Accepté':"Refusé"}
</td>


    </>
  )
}

export default TabledDemandeConge
