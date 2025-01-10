import React from 'react'

const LoadingRapport = () => {
  return (
    <div className="mx-auto w-[100%] h-[27rem] md:h-[36rem] flex items-center bg-blue-100 justify-center rounded-md">
      <div className="w-[95%] lg:w-[65%] xl:w-[60%] h-[92%] md:h-[80%] lg:h-[70%] xl:h-[80%] mb-2 mt-2 flex flex-col space-y-4 bg-white rounded-md">
        <div className="w-[75%] h-full flex flex-col justify-between mx-auto mt-2 mb-2 ">
            <div className="rounded-md  w-full h-full flex items-center">
                <div className="w-full h-[95%] animate-pulse">
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="h-[4%] w-[35%] bg-slate-300 rounded"></div>
                        <div className="h-[80%] bg-slate-300 rounded col-span-2"></div>
                        <div className="h-[9%] w-[25%] bg-slate-300 rounded col-span-2 mx-auto"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingRapport
