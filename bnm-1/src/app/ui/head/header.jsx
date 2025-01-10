'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import NotificationAndProfile from './NotificationAndProfile';
import ViewNotification from './view-notification';

const HeaderSecret = () => {
  const [showNotification,setShowNotification]=useState(false)
  const [notificationCount, setNotificationCount] = useState(0);
  const [standard, setStandard] = useState(0)
  const [report, setReport] = useState(0)
  const [dossier, setDossier] = useState(0)
  const [client, setClient] = useState(0)
  const [error, setError] = useState('')

  const showNotificationInfos = ()=> {
    setShowNotification(true)
  }

  const closeModal = ()=>{
    setShowNotification(false)
    setNotificationCount(0)
  }

const get_number_user = async () => {
  const response = await fetch(`/secretaire/api/header/clients`)
  const res = await response.json();
  if (res.message == "Success") {
    console.log('Header data : ', res.data)
    setClient(res.data.clientsCount.count)
    setDossier(res.data.dossiersCount.count)
    setStandard(res.data.standardsCount.count)
    setReport(res.data.reportsCount.count)
  }
  else {
    setError('Error Found')
  }
  }
  useEffect(() => {
    get_number_user()
  }, [])

  return (
    <div className="relative h-full md:h-[30%] lg:h-[40%]  w-[100%] flex flex-col space-y-[0.5rem] md:space-y-[0.2rem] lg:space-y-[0.5rem] bg-blue-800 rounded-md">
      {
         showNotification && (
         <ViewNotification closeModal={closeModal}/>
        )
      }
      <div className="w-full h-full flex flex-col space-y-1 xl:space-y-0">
        <NotificationAndProfile showNotificationInfos={showNotificationInfos} notificationCount={notificationCount} setNotificationCount={setNotificationCount} />
        <span className="text-white font-semibold text-xl ml-6">
          Historique
        </span>
        <div className="w-[100%] h-auto sm:h-[28rem] lg:h-[9.5rem] xl:h-[6.5rem] grid grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 place-items-center">
          <div className="w-full h-[5.4rem] sm:w-[15rem] md:w-[18rem] bg-white lg:w-[10.5rem] xl:w-[14.5rem] md:h-[5.5rem] shadow-sm shadow-slate-700   rounded-md flex flex-col justify-center gap-y-1 md:gap-y-2 overflow-hidden text-ellipsis">
            <span className="w-full md:h-[18.5%] flex justify-center text-slate-700 text-md md:text-lg font-bold">
              Clients structurés
            </span>
            <div className="w-[98%] max-h-[75%] md:max-h-[65%] text-justify  mx-auto">
              <span className="text-center h-full w-full line-clamp-2 overflow-hidden text-ellipsis font-bold">
                {client}
              </span>
            </div>
          </div>
          <div className="w-full h-[5.4rem] sm:w-[15rem] md:w-[18rem] bg-white lg:w-[10.5rem] xl:w-[14.5rem] md:h-[5.5rem] shadow-sm shadow-slate-700   rounded-md flex flex-col justify-center gap-y-1 md:gap-y-2 overflow-hidden text-ellipsis">
            <span className="w-full md:h-[18.5%] flex justify-center text-slate-700 text-md md:text-lg font-bold">
              Tous les dossiers
            </span>
            <div className="w-[98%] max-h-[75%] md:max-h-[65%] text-justify  mx-auto">
              <span className="text-center h-full w-full line-clamp-2 overflow-hidden text-ellipsis font-bold">
                {dossier}
              </span>
            </div>
          </div>
          <div className="w-full h-[5.4rem] sm:w-[15rem] md:w-[18rem] bg-white lg:w-[10.5rem] xl:w-[14.5rem] md:h-[5.5rem] shadow-sm shadow-slate-700   rounded-md flex flex-col justify-center gap-y-1 md:gap-y-2 overflow-hidden text-ellipsis">
            <span className="w-full md:h-[18.5%] flex justify-center text-slate-700 text-md md:text-lg font-bold">
              Dossiers standards
            </span>
            <div className="w-[98%] max-h-[75%] md:max-h-[65%] text-justify  mx-auto">
              <span className="text-center h-full w-full line-clamp-2 overflow-hidden text-ellipsis font-bold">
                {standard}
              </span>
            </div>
          </div>
          <div className="w-full h-[5.4rem] sm:w-[15rem] md:w-[18rem] bg-white lg:w-[10.5rem] xl:w-[14.5rem] md:h-[5.5rem] shadow-sm shadow-slate-700   rounded-md flex flex-col justify-center gap-y-1 md:gap-y-2 overflow-hidden text-ellipsis">
            <span className="w-full md:h-[18.5%] flex justify-center text-slate-700 text-md md:text-lg font-bold">
              Rapports
            </span>
            <div className="w-[98%] max-h-[75%] md:max-h-[65%] text-justify  mx-auto">
              <span className="text-center h-full w-full line-clamp-2 overflow-hidden text-ellipsis font-bold">
                {report}
              </span>
            </div>
          </div>
        </div>
      </div>
      <span></span>
    </div>
  );
}
export default HeaderSecret


