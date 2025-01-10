import React from 'react'
import Image from 'next/image'

const SearchAndProfile = () => {
  return (
    <div className="h-[3.5rem]  md:h-[4.5rem] xl:h-[3.5rem] w-full">
      <div className="h-full w-[100%] md:w-[95%] flex justify-between mt-2 md:mt-1 md:items-center mx-auto">
        <div className="relative h-full w-[14rem] w-[20.5rem] lg:w-[24.5rem] mt-0 md:mt-3 z-0">
          <div className="relative w-[15rem] md:w-[16rem] lg:w-[13.5rem] xl:w-[16rem]">
            <input
              type="search"
              id="default-search"
              className="block h-8 w-[15rem] xl:w-[16rem] md:w-full p-4 ps-10 text-md text-slate-700 text-md border  rounded-lg focus:outline-none  dark:border-slate-700 dark:placeholder-gray-400"
              placeholder="Chercher ici verf..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2 bottom-[0.3rem] h-6 bg-slate-700 hover:bg-slate-800 focus:ring-4 ring-blue-100 font-medium rounded-lg text-sm px-2 md:px-6 lg:px-4"
            >
              chercher
            </button>
          </div>
        </div>
        <div className="h-[3rem] w-[3rem] sm:h-[3.5rem] sm:w-[3.5rem] md:h-[4.2rem] md:w-[4.2rem] xl:h-[2.8rem] xl:w-[2.8rem] rounded-full">
          <Image
            src="/Images/marteau.jpg"
            width={500}
            height={500}
            alt="profile picture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchAndProfile
