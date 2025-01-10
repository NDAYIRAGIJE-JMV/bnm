'use client'

import Image from "next/image"
import { useContext } from "react";
import { FaBars } from "react-icons/fa"
import { SideContext } from "../context/sidebar";

export default function MiniNavbar(){
  const { isOpen, setOpen} = useContext(SideContext);
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
                    onClick={() => setOpen(!isOpen)}  
                  >                  
                    <FaBars className="text-2xl" /> 
                  </button>
                </div>
        </>
    )
}