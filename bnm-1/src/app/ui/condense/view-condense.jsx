"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { formatDate } from '@/app/_libs/date-formata';
import { useSession } from 'next-auth/react';

const ViewCondense = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [datas, setDatas] = useState([]);
    const [avocats, setAvocats] = useState([]);
    const {data:session} =  useSession();
    const {push} = useRouter();
    useEffect(() => {
      async function getCondense() {
          await axios.get(`/api/condense`)
              .then(result => {
                  setDatas(result.data.rows)
                  setAvocats(result.data.avocats)
              })
              .catch(error => console.log(error))
      }
      getCondense()
  }, []);
  // Calculate starting and ending index for current page
  const startIndex = (currentPage) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, datas.length);

  const paginatedData = datas.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  };

    return (
      <div className="relative w-[100%] h-full rounded-md">
        <div className="w-[100%] h-[100%]">
          <div className="w-full">
            <div className="w-full flex flex-col space-y-1 mx-auto">
              <div className="w-full h-[2rem] flex items-center justify-center  mt-2 mb-1">
              {session && session?.user?.role === 3 && (
                  <button
                    onClick={() => push("/associe/condense/edit")}
                    className="w-12 h-full  bg-slate-300 hover:bg-slate-400 rounded-md"
                  >
                    Edit
                  </button>
                  )}
              </div>
              <div className="h-[26rem] md:h-[36rem]  xl:h-[31rem] overflow-y-scroll lg:overflow-y-scroll">
               <table id="example" className="table-auto w-full">
              <thead className="relative">
              <tr>
                  <th className="py-2 text-start border bg-slate-100 px-2">
                    Date d&#39;audience
                  </th>
                  <th className="text-start py-2 bg-slate-100 px-2">
                    Numéro du dossier
                  </th>
                  <th className="py-2 text-start border bg-slate-100 px-2">
                    Parties
                  </th>
                  <th className="text-start py-2 border bg-slate-100 px-2">
                    Juridiction 
                  </th>
                  <th className="text-start py-2 border bg-slate-100 px-2">
                    Rapport
                  </th>
                  <th className="text-start py-2 border bg-slate-100 px-2">
                    Avocat précédent
                  </th>
                  <th className="text-start py-2 border bg-slate-100 px-2">
                    Avocat actuel
                  </th>
                </tr>
              </thead>
                <tbody>
                {paginatedData?.map((data,index)=>(
                      <tr
                      className={`${
                        index%2===0 ? "bg-white" : "bg-gray-200"
                      } border-b border-blue-500`}
                    >
                      <td className="border text-start py-2 p-2">{data.numero}</td>
                      <td className="border text-start py-2 p-2">
                      {data.demandeur} vs {data.defendeur}
                      </td>
                      <td className="border text-start py-2 p-2">
                      {data.tribunal}
                      </td>
                      <td className="border text-start py-2 p-2">
                      {data.date_audience.split("T")[0]}{" "}
                      </td>
                      <td className="border text-start py-2 p-2">{data.rapport?data.rapport:"----"}</td>
                        {data.prec && data.prec != 0 ? (
                        <td className="border text-start py-2 p-2">
                          {`${
                            avocats.find((avocat) => avocat.id === data.prec).name
                          } ${
                            avocats.find((avocat) => avocat.id === data.prec).lastname
                          }`}
                        </td>
                      ) : (
                        <td className="border text-start py-2 p-2">Inconnu</td>
                      )}
                      {data.suiv && data.suiv != 0 ? (
                        <td className="border text-start py-2">
                          {`${
                            avocats.find((avocat) => avocat.id === data.suiv)?.name
                          } ${
                            avocats.find((avocat) => avocat.id === data.suiv)?.lastname
                          }`}
                        </td>
                      ) : (
                        <td className="border text-start py-2 p-2">Inconnu</td>
                      )}
                    </tr>
                    ))}
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
                    { length: Math.ceil(datas.length / itemsPerPage) },
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
                    currentPage === Math.ceil(datas.length / itemsPerPage) - 1
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
}

export default ViewCondense;
