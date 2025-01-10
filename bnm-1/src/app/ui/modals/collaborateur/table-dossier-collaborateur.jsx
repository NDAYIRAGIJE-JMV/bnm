import React, { useState, useEffect, useRef } from "react";
import ActionsPopup from "./actions-popup";

const TableDossier = ({
  id,
 uuid,
  handleDetailToutLeDossier,
  handleGenererRapport,
  index,
  numero,
  defendeur,
  demandeur,
  tribunalNom,
  date_audience
}) => {
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);

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
      <td className="border px-4 py-2 text-sm font-medium">
        {displayMoDetail ? (
          <div ref={detailsRef} className="absolute -mt-5 xl:-mt-3 xl:ml-8">
            <ActionsPopup
              handleDetailToutLeDossier={handleDetailToutLeDossier}
              handleGenererRapport={handleGenererRapport}
              uuid={uuid}
              id={id}
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
      <td className="border text-start py-2 px-2">{numero}</td>
      <td className="border text-start py-2 px-2">{demandeur}</td>
      <td className="border text-start py-2 px-2">{defendeur}</td>
      <td className="border text-start py-2 px-2">{tribunalNom}</td>
      <td className="border text-start py-2 px-2">  {new Date(date_audience).toLocaleDateString()}</td>
    </>
  );
};

export default TableDossier
