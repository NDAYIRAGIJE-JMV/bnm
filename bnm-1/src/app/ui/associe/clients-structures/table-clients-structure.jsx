"use client";
import React, { useState, useEffect, useRef } from "react";
import ActionClient from "./actions-clients";
import { apiLinks } from "@/app/_libs/links";

const TableClientsStructures = ({
  id,
  handleGenereRapport,
  handleToutLesDossiers,
  name,
  email,
  phone,
  index,
  nombre_dossiers,
  montant,
  create_at,
}) => {

  const [data, setData] = useState([]);
  const [displayMoDetail, setDisplayMoDetail] = useState(false);
  const detailsRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiLinks.clientsStructures);
      const data = await res.json();
      if (data.message == "Success") {
        setData(data.data);
      } else {
        setData([]);
      }
    };

    fetchData();
  }, []);
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
  const AfficherModalClient = (action) => {
    setDisplayMoDetail(true);
  };


  return (
    <>
      <td className="px-4 py-2 text-sm font-medium relative">
        {displayMoDetail ? (
          <div ref={detailsRef} className="ml-8 absolute">
            <ActionClient
              id={id}
              name={name}
              handleGenereRapportAssocie={handleGenereRapport}
              handleToutLesDossiersAssocie={handleToutLesDossiers}
            />
          </div>
        ) : (
          ""
        )}

        <button
          onClick={AfficherModalClient}
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
      <td className="border text-start py-2">{index + 1}</td>
      <td className="border text-start py-2">{name}</td>
      <td className="border text-start py-2">{email}</td>
      <td className="border text-start py-2">{phone}</td>
      <td className="border text-center py-2">{nombre_dossiers}</td>
      <td className="border text-start py-2">{montant}</td>
      <td className="border text-start py-2">{create_at}</td>
    </>
  );
};

export default TableClientsStructures;
