import axios from "axios";
import React, { useEffect, useState } from "react";

const Balance = ({ toggleModal, item }) => {
  const [data,setData]=useState([]);
  console.log(item)
  useEffect(() => {
    async function getBalance() {
      await axios.get(`/secretaire/api/balance`, { headers: {
        caisse: item.caisse
      } })
      .then(results=>setData(results.data.results))
      .catch(error=>console.error(error))
    }
    getBalance()
  }, []);

  const handleVisualierFacture = async (id) => {
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
          "/secretaire/api/facture/visualiser",
          requestOptions
        );
        const datas = await res.json();
        if (datas.message == "success") {
          const pdfFileName = datas.results[0].facture;
          const pdfUrl = `/factures/${pdfFileName}`;
          window.location.href = pdfUrl;
        }
      } catch (error) {
        console.log("error");
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[65%] h-full  overflow-y-scroll md:overflow-hidden relative flex flex-col bg-white rounded-md mx-auto">
        <div className="w-full flex justify-end mt-1">
          <div className=" w-full flex justify-center relative items-center py-3 shadow bg-gray-100">
              <span className="text-xl  font-bold">
               Le montant de {item.numero} total: {item.montant} Fbu
              </span>
            <button
              onClick={() => toggleModal(0)}
              className="w-6 h-6 hover:bg-red-600 absolute right-2 "
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
        </div>
        <div className="w-[100%]">
          <div className="w-full">
            <div className="container mx-auto py-2">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 p-2 border bg-slate-100">
                      Date de payement
                    </th>
                    <th className="text-start py-2 p-2 border bg-slate-100">
                      Montant paye
                    </th>
                    <th className="text-start py-2 p-2 border bg-slate-100">
                      Montant restant
                    </th>

                    <th className="text-start py-2 p-2 border bg-slate-100">
                      Facture
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((data) => (
                      <tr>
                        <td className="border text-start py-2 p-2">
                          {new Date(data.create_at).toLocaleDateString()}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {data.montant_paye}
                        </td>
                        <td className="border text-start py-2 p-2">
                          {data.montant_restant}
                        </td>

                        <td className="border text-start py-2 p-2">
                          <button
                            onClick={() => handleVisualierFacture(data.id)}
                            className="disabled:opacity-50 cursor-pointer px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          >
                            Visualiser
                          </button>
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
export default Balance;
