'use client'
import React from 'react'

const TracabiliteDossier = ({closeModal, dossiers}) => {
  return (
    <div className="w-full h-full flex items-center bg-slate-700 bg-opacity-25">
      <div className="w-[95%] md:w-[98%] xl:w-[98%] h-[95%] md:h-[95%] xl:h-[95%] flex flex-col bg-white rounded-md border border-slate-700 mx-auto">
        <div className="w-[95%] flex justify-end mx-auto">
          <button
            onClick={closeModal}
            className="w-6 h-6 hover:bg-red-600 mt-1"
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
        <div className="w-full flex flex-col overflow-x-scroll md:overflow-hidden">
          <span className="text-slate-700 text-lg font-bold mx-auto underline mt-2 mb-2">
            Tracabilite Du Dossier
          </span>
          <div className="h-full overflow-y-scroll lg:overflow-y-scroll">
              <table id="example" className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-start py-2 px-2 border bg-slate-100">
                      Numero du dossier
                    </th>
                    <th className="text-start py-2 px-2 border bg-slate-100">
                      Demandeur
                    </th>
                    <th className="text-start py-2 px-2 border bg-slate-100">
                      Defendeur
                    </th>
                    <th className="text-start py-2 px-2 border bg-slate-100">
                      Tribunal
                    </th>
                    <th className="text-start py-2 px-2 border bg-slate-100">
                      Date d&#39;audience
                    </th>
                  </tr>
                </thead>
                <tbody>
                {dossiers && dossiers.map((data)=>(
                <tr>
                  <td className='border py-2 px-2'>{data.numero}</td>
                  <td className='border py-2 px-2'>{data.demandeur}</td>
                  <td className='border py-2 px-2'>{data.defendeur}</td>
                  <td className='border py-2 px-2'>{data.tribunalName}</td>
                  <td className='border py-2 px-2'>{new Date(data.date_audience).toLocaleDateString()}</td>
                </tr>
                  )) }
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TracabiliteDossier
