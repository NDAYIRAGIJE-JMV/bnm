'use client'
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { SideContext } from '../context/sidebar';

const NotificationAndProfile = () => {
  const {data:session} = useSession();
  const [notificationCount, setNotificationCount] = useState(0);
  const {noticationOpened, setNoticationOpened} = useContext(SideContext);

  const fetchUnreadCount = async () => {
    const response = await fetch(`/associe/api/unreadcount`);
    const res = await response.json();
    if (res.message === "Success") {
      setNotificationCount(res.unreadCount);
    }
  };
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <div className="h-[3.5rem]  md:h-[4.5rem] xl:h-[3.5rem]  w-full flex justify-end  ">
      <div className="h-full w-[35%] md:w-[20%] lg:w-[25%] xl:w-[10%] flex justify-between  md:items-center mx-2 ">
        <div className="relative h-full mt-0 md:mt-3 z-0  mt-1">
          {notificationCount > 0 && (
            <div className="absolute w-[1.3rem] h-[1.3rem] text-xs text-white bg-red-600 rounded-full flex items-center justify-center -right-2 z-10">
              {notificationCount}
            </div>
          )}
          <button onClick={()=>setNoticationOpened(!noticationOpened)} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white mt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>
        </div>
        <div className="h-[3rem] w-[3rem] sm:h-[3.5rem] sm:w-[3.5rem] md:h-[4.2rem] md:w-[4.2rem] xl:h-[2.8rem] xl:w-[2.8rem] rounded-full mt-1">
          <Image
            src="/Images/marteau.jpg"
            width={500}
            height={500}
            alt="profile picture"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {session && session != 'unlogged' && (<span className='hidden absolute right-8 top-16 text-white'>{session.name}</span>)}
      </div>
    </div>
  );
}

export default NotificationAndProfile
