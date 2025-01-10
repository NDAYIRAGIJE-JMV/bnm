import React from 'react'

const LoadingEcritureCaisseCondense = () => {
  return (
    <div className="relative w-[100%] h-full rounded-md">
    <div className="w-[100%] h-[100%]">
      <div className="w-full h-full">
        <div className="container flex flex-col space-y-1 mx-auto">
          <div className="w-full h-[26rem] md:h-[36rem]  xl:h-[31rem] rounded-md bg-white">
          <div className=" w-full h-full border border-blue-300 shadow rounded-md p-4">
            <div className="w-[100%] h-[100%] animate-pulse flex space-x-4">
                <div className="w-[100%] h-[100%] flex flex-col space-y-3">
                    <div className="w-[40%] h-[5%] bg-slate-300 rounded-md"></div>
                    <div className="w-[100%] h-[92%] bg-slate-300 rounded-md col-span-2"></div>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoadingEcritureCaisseCondense
