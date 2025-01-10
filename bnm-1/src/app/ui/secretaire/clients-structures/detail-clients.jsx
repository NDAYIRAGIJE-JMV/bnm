import React from 'react'

const DetailsClient  = () => {
  return (
        <div className='bg-slate-700 w-[10rem] h-[18rem] rounded-sm'>
        <div className='w-full h-full flex flex-col'>
        <button className='w-full text-white hover:bg-slate-600 p-1'>
            tous les dossiers
        </button>
        <button className='w-full text-white hover:bg-slate-600 p-1'>
            generer un rapport
        </button>
        </div>
        </div> 
  )
}

export default DetailsClient 
