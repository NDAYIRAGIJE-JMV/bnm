import React, { useState, useEffect, useRef } from "react";
import DetailsUtilisateurAssocies from "../DetailsUtilisateur/DetailsUtilisateurAssocies";

export default function TableModalAssocies ({
  handleEdit,
  handleViewReport,
  handlePause,
  username,
  email,
  phone,
  roleNom,
  userid,
  name,
  lastname,
}){
  const [displayAssocieDetail, setDisplayAssocieDetail] = useState(false);
  const detailRef = useRef(null);

  const AfficherModalAssocie = (action) => {
    setDisplayAssocieDetail(true);
  };

  const handleClickOutside = (event) => {
    if (detailRef.current && !detailRef.current.contains(event.target)) {
      setDisplayAssocieDetail(false);
    }
  };

  useEffect(() => {
    if (displayAssocieDetail) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayAssocieDetail]);
  return (
    <>
      <td className="border px-4 py-2 text-sm font-medium">
        {displayAssocieDetail ? (
          <div ref={detailRef} className="absolute -mt-5 xl:-mt-3 xl:ml-8">
            <DetailsUtilisateurAssocies
              userid={userid}
              name={name}
              lastname={lastname}
              handleEdit={handleEdit}
              handleViewReport={handleViewReport}
              handlePause={handlePause}
              setDisplayAssocieDetail={setDisplayAssocieDetail}
            />
          </div>
        ) : (
          ""
        )}
        <button
          onClick={AfficherModalAssocie}
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
      <td className="border text-start py-2 px-2">
        {name} {lastname}
      </td>
      <td className="border text-start py-2 px-2">{username}</td>
      <td className="border text-start py-2 px-2">{email}</td>
      <td className="border text-start py-2 px-2">{phone}</td>
      <td className="border text-start py-2 px-2">{roleNom}</td>
    </>
  );
};
