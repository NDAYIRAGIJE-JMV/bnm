"use client";
import React, { useEffect, useState } from "react";
import { FaRoad } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DetailDossier({ toggleModal, data }){
  const { data: session } = useSession();
  const { push } = useRouter();
  const [audiences, setAudiences] = useState([]);
  const [caisse, setCaisse] = useState({});
  const handleTracer = () => {
    if (session?.user?.role === 3) {
      push(`/associe/tracage/${data.numero}`);
    } else if (session?.user?.role === 1) {
      push(`/secretaire/tracage/${data.numero}`);
    }
  };
  const handleCloture = async ()=>{
    await axios.put('/secretaire/api/dossiers/cloture', JSON.stringify({
      id_grand: data.id_grand
    }))
    .then(results=>console.log(results))
    .catch(error=>console.error(error))
  }
  useEffect(() => {
    async function getDetailsDossiers() {
      await axios
        .get(`/secretaire/api/dossiers/details`, {
          headers: {
            caisse: data.caisse,
            dossier: data.id,
          },
        })
        .then((results) => {
          setAudiences(results.data.audiences);
          setCaisse(results.data.caisse);
        })
        .catch((error) => console.error(error));
    }
    getDetailsDossiers();
  }, [data]);
  return (
    <div className="absolute flex items-center justify-center w-full h-full bg-opacity-25 bg-slate-700 z-25">
      <div className="relative w-[95%] lg:w-[98%] xl:w-[70%] max-h-[95%] flex flex-col space-y-2 bg-white rounded-md">
        <div className="flex justify-between w-full p-3 shadow md:w-full">
          <Tooltip
            showArrow={true}
            content="tracabilite du dossier"
            className="mx-1 text-sm text-white rounded-md bg-slate-700 h-7 max-w"
          >
            <button
              onClick={handleTracer}
              className="w-[2.5rem] h-[2rem] bg-slate-200 rounded-sm hover:bg-slate-300 md:mt-0 right-[50%] md:right-[10%] lg:right-[8%]"
            >
              <FaRoad className="w-full h-full" />
            </button>
          </Tooltip>
          <div>
            <span className="font-bold text-md">
              Detail du dossier numero <span>{data.numero}</span>{" "}
            </span>
          </div>
          <button
            onClick={() => toggleModal(0)}
            className="w-6 h-6 hover:bg-red-600 right-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-lg text-black size-6 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-[100%] h-full space-y-4 overflow-y-scroll">
          <div className="w-full h-full">
            <div className="w-[90%] h-full flex space-x-3 mx-auto break relative">
              <div className="flex flex-col">
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                  Numéro Dossier
                </div>
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                  Demandeur
                </div>
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                  Défendeur
                </div>
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                  Tribunal
                </div>
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                  Date d'audience
                </div>
                <div className="w-[9rem] md:w-[10rem] text-start font-bold py-2 p-2">
                  Commentaire
                </div>
              </div>
              {data && (
                <>
                  <div className="flex flex-col">
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {data.numero}
                    </div>
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {data.demandeur}
                    </div>
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {data.defendeur}
                    </div>
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {data.tribunalName}
                    </div>
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {" "}
                      {new Date(data.date_audience).toLocaleDateString()}
                    </div>
                    <div className="w-full h-auto p-2 py-2 border-b text-start">
                      {data.comment}
                    </div>
                  </div>
                </>
              )}
              <div className="absolute right-0">
                <h1 className="font-semibold">Actions: </h1>
                <ul className="flex py-4 space-x-3">
                  <li onClick={()=>handleCloture()} className="p-1 bg-gray-300 border rounded shadow cursor-pointer hover:bg-gray-400">
                    Cloturer
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {data.type === 1 && (
            <div className="w-full h-auto space-y-2">
              <div className="flex items-center justify-center w-full">
                <span className="font-bold underline text-md">
                  Informations de paiement
                </span>
              </div>
              <div className="w-full h-full">
                <div className="w-[90%] h-full flex space-x-3 mx-auto break">
                  <div className="flex flex-col">
                    <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                      Montant
                    </div>
                    <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                      Paiement complet
                    </div>
                    <div className="w-[9rem] md:w-[10rem] text-start font-bold py-2 p-2">
                      Commentaire
                    </div>
                  </div>
                  {data && caisse && (
                    <div className="flex flex-col">
                      <div className="w-full h-auto p-2 py-2 border-b text-start">
                        {data.payement_unique > 0
                          ? data.payement_unique
                          : caisse.montant
                        }
                      </div>
                      <div className="w-full h-auto p-2 py-2 border-b text-start">
                        {data.payement_unique > 0 ? "OUI" : "NON"}
                      </div>
                      <div className="w-full h-auto p-2 py-2 border-b text-start">
                        {caisse.comment}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="w-full h-auto space-y-2">
            <div className="flex items-center justify-center w-full">
              <span className="font-bold underline text-md">
                Rapports d&apos;Audiences
              </span>
            </div>
            <div className="h-full overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-2 py-2 border text-start bg-slate-100">
                      Date d&apos;audience
                    </th>
                    <th className="px-2 py-2 border text-start bg-slate-100">
                      Decision
                    </th>
                    <th className="px-2 py-2 border text-start bg-slate-100">
                      Commentaire
                    </th>
                  </tr>
                </thead>
                {audiences && audiences.length > 0 && (
                  <tbody>
                    {audiences?.map((audience, index) => (
                      <tr key={index}>
                        <td className="px-2 py-2 border">
                          {audience.date_audience && audience.date_audience.split("T")[0]}
                        </td>
                        <td className="px-2 py-2 border">
                          {audience.decision && audience.decision.split("T")[0]}
                        </td>
                        <td className="px-2 py-2 border">
                          {audience.comment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
