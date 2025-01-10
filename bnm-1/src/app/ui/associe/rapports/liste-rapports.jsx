"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaPlusCircle } from "react-icons/fa";
import RapportJour from "./rapport-journalier";
import { apiLinks } from "@/app/_libs/links";

const RapportsListe = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showRapport, setShowRapport] = useState(false);
  const [date, setDate] = useState("");
  const [nom, setNom] = useState("");
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const handleRapport = () => {
    setShowRapport(true);
  };

  const closeModal = () => {
    setShowRapport(false);
  };

  const handleSearch = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    push(`${pathname}?${params.toString()}`);
  };
  const handleDate = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    push(`${pathname}?${params.toString()}`);
  };

  const fetchData = async () => {
    const name = searchParams.get("nom") || " ";
    const date = searchParams.get("date") || " ";
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
      }),
    };
    const res = await fetch(apiLinks.rapportAssocie, requestData);
    const data = await res.json();
    if (data.message == "Success") {
      console.log("data report", data.data);
      setData(data.data);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchParams]);
  // Calculate starting and ending index for current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginatedData = data.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative w-[100%] h-full rounded-md">
      {showRapport ? (
        <div className="w-[100%] h-[100%]">
          <RapportJour closeModal={closeModal} />
        </div>
      ) : (
        ""
      )}
      <div className="w-[100%] h-[100%]">
        <div className="w-full">
          <div className="w-full flex flex-col space-y-1 mx-auto">
            <span className="text-md font-semibold underline flex justify-center mb-0 md:mb-3">
              Liste des rapports
            </span>
            <div className="w-[98%] h-auto flex items-center justify-end mx-auto mt-2 mb-1 py-2">
              <div className="w-[95%]  h-auto flex flex-col md:flex-row space-y-1 md:space-y-0 md:justify-between items-center  mx-auto mt-1 mb-1">
                <div className="w-[100%] md:w-[30%]  h-[2rem] flex justify-between md:mt-0">
                  <input
                    type="search"
                    value={nom}
                    className="w-full border border-slate-800 rounded-l-md p-2 placeholder:text-sm placeholder:text-slate-600 focus:outline-none"
                    placeholder="Chercher ici..."
                    onChange={(e) => setNom(e.target.value)}
                    required
                  />
                  <button
                    onClick={() => handleSearch("nom", nom)}
                    className="bg-slate-600 hover:bg-slate-800 rounded-r-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="w-[100%] md:w-[60%] flex flex-col md:flex-row space-y-3 md:space-y-0 md:justify-between">
                  <div className="w-[70%] md:w-[40%] h-[2rem] border border-slate-800 rounded-md">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        handleDate("date", e.target.value),
                          setDate(e.target.value);
                      }}
                      className="w-full h-full p-2 rounded-md focus:outline-none cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => push(pathname)}
                    className="bg-gray-500 hover:bg-gray-600 px-4 rounded text-white"
                  >
                    Actualiser
                  </button>
                </div>
              </div>
              <button onClick={handleRapport} className="">
                <FaPlusCircle className="font-bold text-xl md:text-2xl text-slate-700 hover:text-slate-800" />
              </button>
            </div>
            <hr />
            <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead className="relative shadow" >
                  <tr>
                    <th className="text-start border bg-slate-100 px-2">No</th>
                    <th className="text-start border bg-slate-100 px-2">
                      Date
                    </th>
                    <th className="text-start border bg-slate-100 px-2">
                      Utilisateur
                    </th>
                    <th className="text-start border bg-slate-100 px-2">
                      Activite
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    paginatedData &&
                    paginatedData.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 1 && "bg-blue-50"
                        } hover:shadow`}
                      >
                        <td className="border text-start py-2 px-2">
                          {index + currentPage * 8 + 1}
                        </td>
                        <td className="border text-start py-2 px-2">
                          {new Date(item.create_at).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="border text-start py-2 px-2">
                          {item.name} {item.lastname}
                        </td>
                        <td className="border text-start py-2 px-2">
                          {item.body}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Pas de rapport</td>
                    </tr>
                  )}
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
                    {number + 1}
                  </button>
                ))}
              </div>
              <button
                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={
                  currentPage === Math.ceil(data.length / itemsPerPage) - 1
                }
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
};

export default RapportsListe;
