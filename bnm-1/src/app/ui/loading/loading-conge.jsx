import React from 'react'

const LoadingConge = () => {
  return (
    <div className="mx-auto w-[100%] h-[27rem] md:h-[36rem] flex items-center bg-blue-100 justify-center rounded-md">
      <div className="relative w-[95%] lg:w-[85%] xl:w-[60%] h-[98%] md:h-[95%] lg:h-[95%] xl:h-[98%] flex flex-col space-y-0 md:space-y-1 mb-2 mt-2 bg-white rounded-md">
          <div className="w-[85%] h-[95%] animate-pulse flex flex-col items-center justify-between mx-auto my-auto">
                <div className="w-[100%] h-[10%] flex flex-row justify-between">
                    <div className="w-[40%] h-[60%] bg-slate-300 rounded-md"></div>
                    <div className="w-[40%] h-[60%] bg-slate-300 rounded-md"></div>
                </div>
                <div className="w-[100%] h-[5%] bg-slate-300 rounded-md col-span-2"></div>
                <div className="w-[100%] h-[70%] bg-slate-300 rounded-md mx-auto"></div>
                <div className="w-[40%] h-[5%] bg-slate-300 rounded-md mx-auto"></div>
            </div>
      </div>
     </div>
  )
}

export default LoadingConge
