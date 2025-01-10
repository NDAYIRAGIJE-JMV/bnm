import React, { useState, useEffect, useRef } from "react";
import ActionsPopup from "../modals/secretaire/actions-popup1";

const TableDossier = ({
  handleEditClick,
  handleCreateConsole,
  handleViewConsole,
  handleCreateMerge,
  handleCreatePayement,
  handleCreateEmergence,
  handleCreatePenality,
  handleCreateAdvanced,
  handleCreateReturnBack,
  handleShowBalance,
  handleDetailToutLeDossier,
  id_grand,
  index,
  numero,
  defendeur,
  demandeur,
  tribunalNom,
  date_audience,
  montant,
  uuid,
  id,
  caisse,
  console,
  penalite,
  retour,
  urgence,
  fusion,
  type,
  unique
}) => {
  let flag
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);
  if (retour == 0 && console == 0 && penalite == 0 && urgence == 0 && fusion != 0){
    flag = 'F'
  }
  if (retour == 0 && console == 0 && penalite == 0 && urgence != 0 && fusion == 0){
    flag = 'U'
  }
  if (retour == 0 && console == 0 && penalite != 0 && urgence == 0 && fusion == 0){
    flag = 'P'
  }
  if (retour == 0 && console != 0 && penalite == 0 && urgence == 0 && fusion == 0){
    flag = 'C'
  }
  if (retour == 0 && console == 0 && penalite == 0 && urgence == 0 && fusion == 0){
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
      <td className="px-4 py-2 text-sm font-medium relative  z-10">
        {displayMoDetail ? (
          <div ref={detailsRef} className="ml-8 absolute z-20">
            <ActionsPopup
              console={console}
              penalite={penalite}
              urgence={urgence}
              uuid={uuid}
              id={id}
              caisse={caisse}
              type={type}
              montant= {montant}
              unique={unique}
              handleEditClick={handleEditClick}
              handleCreateConsole={handleCreateConsole}
              handleViewConsole={handleViewConsole}
              handleCreateMerge={handleCreateMerge}
              handleCreatePayement={handleCreatePayement}
              handleCreateEmergence={handleCreateEmergence}
              handleCreatePenality={handleCreatePenality}
              handleCreateAdvanced={handleCreateAdvanced}
              handleCreateReturnBack={handleCreateReturnBack}
              handleShowBalance={handleShowBalance}
              handleDetailToutLeDossier={handleDetailToutLeDossier}
              setDisplayMoDetail={setDisplayMoDetail}
            />
          </div>
        ) : (
          ""
        )}
        <button
          onClick={AfficherModalDossier}
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
      <td className="border text-start py-2 px-2">{index + 1}</td>
      <td className="relative border text-start py-2 px-2">{numero}
          <span className="absolute text-xs right-2 -mt-3 text-blue-600">{flag}</span>
      </td>
      <td className="border text-start py-2 px-2">{demandeur}</td>
      <td className="border text-start py-2 px-2">{defendeur}</td>
      <td className="border text-start py-2 px-2">{tribunalNom}</td>
      <td className="border text-start py-2 px-2">{new Date(date_audience).toLocaleDateString('fr-FR')}</td>
    </>
  );
};

export default TableDossier
