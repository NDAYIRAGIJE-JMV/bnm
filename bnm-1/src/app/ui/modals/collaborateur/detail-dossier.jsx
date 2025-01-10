
import React from 'react'


const DetailDossier = ({closeModal,closeModalDetail,data}) => {
console.log(data)
    closeModal = ()=> {
        setShowTracabliteDossier(false);
    }


  return (
<div className="w-full h-full flex justify-center items-center absolute bg-slate-700 bg-opacity-25 z-25">
      <div className="relative w-[95%] lg:w-[98%] xl:w-[70%] max-h-[95%] flex flex-col space-y-2 bg-white rounded-md">
        <div className="w-[97%] md:w-[98%] flex justify-end  mx-auto mt-2">
          <div className='w-[70%] md:w-[60%] flex justify-between'>
            <div>
              <span className='text-md font-bold underline'>detail du dossier</span>
            </div>
            <button
              onClick={closeModalDetail}
              className="w-6 h-6 hover:bg-red-600 right-3"
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
        <div className="w-[100%] h-full space-y-4 overflow-y-scroll">
          <div className="w-full h-full">
            <div className="w-[90%] h-full flex space-x-3 mx-auto break">
       
            <div className="flex flex-col">
                <div className="w-[9rem] md:w-[10rem] border-b font-bold text-start py-2 p-2">
                   Numero
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
              {data &&
                <>
              <div className="flex flex-col">
                <div className="w-full h-auto text-start py-2 border-b p-2">
                 {data.numero}
                </div>
                <div className="w-full h-auto text-start py-2 border-b p-2">
                  {data.demandeur}
                </div>
                <div className="w-full h-auto text-start py-2 border-b p-2">
                 {data.defendeur}
                </div>
                <div className="w-full h-auto text-start py-2 border-b p-2">
                  {data.tribunalName}
                </div>
                <div className="w-full h-auto text-start py-2 border-b p-2">
                  {" "}
                  {new Date(data.date_audience).toLocaleDateString()}
                </div>
                <div className="w-full h-auto text-start py-2 border-b p-2">          
                 {data.comment}
                </div>
              </div>
              </>
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDossier
