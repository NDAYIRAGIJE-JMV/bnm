"use client"
import React, { useContext, useEffect, useState } from 'react'
import { SideContext } from '../context/sidebar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SessionContext } from '../context/auth';
import { useSession } from 'next-auth/react';

function Notification() {
    const {push} = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [data,setData] = useState([])
    const {data:session} = useSession();
    const {noticationOpened, setNoticationOpened} = useContext(SideContext);
    
    useEffect(()=>{
        console.log(session)
        async function fetchData() {
            try {
                const res = await fetch('/api/notifications',{
                headers:{
                    userId: session.role===1?0:session.user?.id,

                }
                });
            
                const datas = await res.json()
                if (datas.message=="success") {
                    setData(datas.result)
                console.log('Conge',)
                }
    
            }
            catch (error) {
                console.log('error');
            }
    
    
        }
        fetchData()
    },[session])

    // Grouping and rendering directly in JSX
    const groupedData = data.reduce((acc, item) => {
        const date = new Date(item.create_at).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});


    return (
            noticationOpened && (
                <div className={`w-full h-full z-50 bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed`} id="chec-div">
                    <div className="w-full absolute z-10 right-0 lg:right-64 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="notification">
                        <div className="2xl:w-4/12 bg-gray-50 h-screen overflow-y-auto p-8 absolute right-0">
                            <div className="flex items-center justify-between">
                                <p className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                                <button onClick={() => setNoticationOpened(!noticationOpened)} role="button" aria-label="close modal" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 6L6 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 6L18 18" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* In-line grouping of notifications */}
                            {Object.entries(groupedData).map(([date, group]) => (
                                <div key={date}>
                                    <h2 className="focus:outline-none text-sm leading-normal pt-8 border-b pb-2 border-gray-300 text-gray-600">{date}</h2>
                                    {group.map(item => (
                                        <div key={item.id} className="w-full p-3 mt-6 bg-white rounded flex">
                                            <div className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                                {/* Icon can be added here */}
                                            </div>
                                            <div onClick={()=>push(`/associe/demande-conge#${item.id}`)} className="pl-3">
                                                <p className="focus:outline-none text-sm leading-none">
                                                    <span className="text-blue-700">{item.name} {item.lastname}</span> - Motif: <span className="text-blue-700">{item.motif}</span>
                                                </p>
                                                <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">{new Date(item.create_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <div className="flex items-center justify-between">
                                <hr className="w-full" />
                                <p className="focus:outline-none text-sm flex flex-shrink-0 leading-normal px-3 py-16 text-gray-500">That's it for now :)</p>
                                <hr className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            )
    );
};

export default Notification;