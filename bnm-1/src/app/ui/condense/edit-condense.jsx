"use client"
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { SessionContext } from '../context/auth';
import { formatDate } from '@/app/_libs/date-formata';
import { useSession } from 'next-auth/react';

const EditCondense = () => {
const [currentPage, setCurrentPage] = useState(0);
const [prononce, setPrononce] = useState(false);
const [itemsPerPage, setItemsPerPage] = useState(8);
const [datas, setDatas] = useState([]);
const [avocats, setAvocats] = useState([]);
const [selectedValue, setSelectedValue] = useState("");
const { push } = useRouter();
const {data:session} =  useSession();

useEffect(() => {
  async function getCondense() {
      await axios.get(`/api/condense`,{headers:{prononce}})
          .then(result => {
              setDatas(result.data.rows)
              setAvocats(result.data.avocats)
          })
          .catch(error => console.log(error))
  }
  getCondense()
}, [prononce]);
const handleBlur = async (avocat, id,audience) => {
  await axios
    .patch(`/api/condense`, { avocat: avocat, id: id, audience })
    .then((result) => setAlert("update"))
    .catch((error) => console.log(error));
};

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
            <div className="w-full h-[2rem] flex items-center justify-between px-4  mt-2 mb-1">
              <div className='gap-3'>
                <input className='w-7' onChange={()=>setPrononce(!prononce)} checked={prononce} id='prononce' type="checkbox"/>  
                <label className='' htmlFor="prononce">Prononcer</label>
              </div>
            {session && session?.user?.role === 3 && (
              <button
                onClick={() => push("/associe/condense")}
                className="w-12 h-full  bg-slate-300 hover:bg-slate-400 rounded-md"
              >
                View
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
                        <tr key={index}
                        className={`${
                          true ? "bg-white" : "bg-gray-200"
                        } border-b border-blue-500`}
                      >
                      <td className="border text-start py-2 p-2">
                      {data.date_audience.split("T")[0]}{" "}
                      </td>
                        <td className="border text-start py-2 p-2">{data.numero}</td>
                        <td className="border text-start py-2 p-2">
                          {data.demandeur} vs {data.defendeur}
                        </td>
                        <td className="border text-start py-2 p-2">
                        {data.tribunal}
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
                        <td className="border text-start py-2 p-2">
                            <select
                              className="mt-1 "
                              defaultValue={data.suiv}
                              onBlur={() => handleBlur(selectedValue, data.id, data.audience)}
                              onChange={(event) =>
                                setSelectedValue(event.target.value)
                              }
                            >
                              {!data.suiv && data.suiv === 0 && (
                                <option disabled value={0}>
                                  Inconue
                                </option>
                              )}
                              {avocats.map((avocat, i) => (
                                <>
                                  <option
                                    key={i}
                                    value={avocat.id}
                                  >{`${avocat.name} ${avocat.lastname}`}</option>
                                </>
                              ))}
                            </select>
                          </td>
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
                    {number+1}
                  </button>
                ))}
              </div>
              <button
                className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={currentPage === Math.ceil(datas.length / itemsPerPage)-1}
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

export default EditCondense;
