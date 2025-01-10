'use client'

import Image from "next/image"
import { FaBars } from "react-icons/fa"

export default function MiniNavbar(){
    return (
        <>
        <div className="relative block lg:hidden h-[3.5rem]">
                  <div className="absolute w-[3rem] h-[3rem] rounded-full right-2">
                    <Image
                      src="/Logo/Logo.png"
                      width={500}
                      height={500}
                      alt="notre signe"
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <button
                    className="sb-button"
                    /* onClick={() => setToggled(!toggled)} */
                  >
                    <FaBars className="text-2xl" /> 
                  </button>
                </div>
        </>
    )
}