'use client'
import React,{ useState,useEffect } from 'react'
const TousDossiers = ({ closeModalTousDossiers, id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    if (id) {
      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        };
        const res = await fetch(
          "/secretaire/api/clients-structures/tousdossiers",
          requestOptions
        );
        const datas = await res.json();
        console.log(datas);
        if (!datas.error) {
          setData(datas.results);
        }
      } catch (error) {
        console.log("error");
      }
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] md:w-[95%] lg:w-[93%] xl:w-[95%] h-[95%] md:h-[97%] xl:h-[98%]  relative flex flex-col space-y-3 md:space-y-2 bg-white rounded-md mx-auto rounded-md">
        <div className="w-[98%] h-[5%] flex justify-end items-center mx-auto mt-2">
          <button
            onClick={closeModalTousDossiers}
            className="w-6 h-6 hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-lg text-black hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-[100%] h-[90%]">
          <div className="w-full h-full">
            <div className="w-[100%] h-[100%] mx-auto py-2 overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 bg-slate-100 p-2">
                      Numero dossier
                    </th>
                    <th className="py-2 text-start border bg-slate-100 p-2">
                      Demandeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Defendeur
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Juridiction
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Date d&#39;audience
                    </th>
                    <th className="text-start py-2 border bg-slate-100 p-2">
                      Commentaire
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data &&
                      data.map((data) => (
                        <tr>
                          <td className="border text-start py-2 p-2">
                            {data.numero}
                          </td>
                          <td className="border text-start py-2 p-2">
                            {data.demandeur}
                          </td>
                          <td className="border text-start py-2 p-2">
                            {data.nom}
                          </td>
                          <td className="border text-start py-2 p-2">
                            {data.nomtribunal}
                          </td>
                          <td className="border text-start py-2 p-2">
                            {" "}
                            {new Date(data.date_audience).toDateString()}
                          </td>
                          <td className="border text-start py-2">
                            {data.comment}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TousDossiers
