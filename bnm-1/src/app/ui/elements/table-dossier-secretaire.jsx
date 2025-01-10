import React, { useState, useEffect, useRef } from "react";
import ActionsPopup from "../modals/secretaire/actions-popup";

export default function TableDossier({
  item, 
  toggleModal
}) {
  let flag
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);
  const {
    tribunalName, numero, defendeur, demandeur, date_audience,
    console:consort, penalite, urgence, fusion} = item
  if (consort == 0 && penalite == 0 && urgence == 0 && fusion != 0){
    flag = 'J'
  }
  if (consort == 0 && penalite == 0 && urgence != 0 && fusion == 0){
    flag = 'U'
  }
  if (consort == 0 && penalite != 0 && urgence == 0 && fusion == 0){
    flag = 'P'
  }
  if (consort != 0 && penalite == 0 && urgence == 0 && fusion == 0){
    flag = 'C'
  }
  if (consort == 0 && penalite == 0 && urgence == 0 && fusion == 0){
    flag = ''
  } 
  const AfficherModalDossier = (action) => {
    setDisplayMoDetail(true);
  };

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


  return (
    <>
      <td className="relative z-10 px-4 py-2 text-sm font-medium cursor-pointer">
        {displayMoDetail ? (
          <div ref={detailsRef} className="absolute z-20 ml-8">
            <ActionsPopup
              toggleModal={toggleModal}
              item={item}
            /> 
          </div>
        ) : (
          ""
        )}
        <button
          onClick={AfficherModalDossier}
          type="button"
          className="inline-flex items-center rounded-md text-slate-700 bg-slate-200"
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
      <td className="relative px-2 py-2 border text-start">{numero}
          <span className="absolute -mt-3 text-xs text-blue-600 right-2">{flag}</span>
      </td>
      <td className="px-2 py-2 border text-start">{demandeur}</td>
      <td className="px-2 py-2 border text-start">{defendeur}</td>
      <td className="px-2 py-2 border text-start">{tribunalName}</td>
      <td className="px-2 py-2 border text-start">{new Date(date_audience).toLocaleDateString('fr-FR')}</td>
    </>
  );
};
