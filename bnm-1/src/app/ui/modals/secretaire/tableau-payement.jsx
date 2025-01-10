import React from 'react'

const TableauPayement = ({closeModalTableauPayement}) => {

  return (
<div className="w-full h-full flex items-center bg-slate-700 bg-opacity-25">
      <div className="w-[95%] md:w-[45%] xl:w-[30%] h-[95%] md:h-[95%] xl:h-[95%] flex flex-col bg-white rounded-md border border-slate-700 mx-auto">
        <div className="w-[95%] flex justify-end mx-auto">
          <button
            onClick={()=>closeModalTableauPayement(false)}
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
        <div className="w-full h-[95%] flex flex-col overflow-x-scroll md:overflow-hidden">
          <span className="text-slate-700 text-md md:text-lg  font-semibold md:font-bold mx-auto underline mt-2 mb-2">
            historique de paiement
          </span>
          <div className="h-full space-y-2 overflow-y-scroll lg:overflow-y-scroll">
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          <div className='flex flex-col space-y-1 border-t'>
            <span className='mx-auto text-md font-semibold'>12.04.2021</span>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>Paye:</div>
                <div>800 000 000 fbu</div>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2 mx-2'>
                <div className='text-sm font-bold'>restant:</div>
                <div>1 200 000 fbu</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableauPayement
